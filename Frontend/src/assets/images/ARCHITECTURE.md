# Arquitectura técnica y plan de implementación

Estado: propuesta inicial + Fase 1 implementada. Fecha de redacción: 2026-10-11.
Convención: lo marcado **[verificado]** se comprobó con fuentes consultadas al redactar o con tests ejecutados;
**[estimado]** es heurística; **[no probado]** significa que no se ejecutó en una máquina real.

## 1. Modelo de amenazas (qué estamos protegiendo y de quién)

| Amenaza | Cómo se materializa en este proyecto | Control principal |
|---|---|---|
| Ollama expuesto a la red | El API de Ollama no tiene autenticación. CVE-2026-7482 ("Bleeding Llama"): fuga de memoria del proceso (prompts, variables de entorno, tokens) con 3 llamadas sin autenticar; corregido en 0.17.1 **[verificado en fuentes de terceros]** | Bind a 127.0.0.1; cliente que solo habla con loopback y con lista corta de endpoints; `secagent verify` comprueba bind y versión mínima |
| Telemetría / nube del proveedor | Ollama tiene funciones cloud (modelos `-cloud`, búsqueda web). Se desactivan con `OLLAMA_NO_CLOUD=1` o `disable_ollama_cloud` en `server.json` **[verificado en la documentación oficial]** | Variable en el servicio; check que falla si hay modelos `*cloud*` instalados |
| Prompt injection indirecta | Un repositorio auditado, un README o una página web pueden contener instrucciones dirigidas al modelo ("ignora lo anterior y ejecuta…") | La decisión de ejecutar/aprobar NUNCA la toma el modelo (ver §4) |
| Cadena de suministro | Marzo 2026: se publicaron versiones maliciosas de Trivy (0.69.4–0.69.6) y se reescribieron tags de `trivy-action`; seguras: 0.69.2/0.69.3 **[verificado en avisos de terceros]** | Herramientas de auditoría = código no confiable: contenedor sin red, fijadas por digest/checksum, sin secretos montados |
| Navegador malicioso → localhost | Una web visitada puede intentar hablar con `localhost:11434` o con la UI del agente (CSRF / DNS rebinding) | Fase 2: token de sesión, validación de `Host`/`Origin`, sin CORS abierto |
| Alucinación | El modelo inventa CVE, rutas o resultados | Hallazgos solo con evidencia reproducible adjunta; `system_prompt` exige distinguir hecho/hipótesis |
| Manipulación de registros | Alguien edita el log para ocultar acciones | Log con cadena de hashes (implementado); anclaje externo del último hash (Fase 3) |
| Error del usuario | Escanear un activo ajeno, borrar algo | Lista de alcance (scope) obligatoria para Nmap/ZAP; confirmación humana para acciones destructivas |

Fuera de alcance explícito: adversario con root local, malware con acceso a la memoria del usuario, ataques físicos.
Contra eso solo ayudan el cifrado de disco y la higiene del SO, no este software.

## 2. Componentes: imprescindibles, opcionales y alternativas

| Componente | Estado | Elección | Alternativas evaluadas | Justificación y riesgos |
|---|---|---|---|---|
| Inferencia local | Imprescindible | **Ollama** (detrás de una interfaz propia) | `llama.cpp` (`llama-server`): menos superficie y más control, más trabajo manual. vLLM: orientado a servidores GPU. LM Studio: interfaz cerrada. | Ollama simplifica descarga/gestión. Riesgos: sin autenticación, historial de CVE, funciones cloud, actualizador en apps de escritorio. Mitigación: cliente endurecido y reemplazable (`ollama_client.py`). |
| Núcleo del agente | Imprescindible | **Python ≥3.10, Fase 1 solo con biblioteca estándar** | Go/Rust (binario único, mejor aislamiento) | Python por velocidad de desarrollo y ecosistema. Cero dependencias en Fase 1 = cero superficie de cadena de suministro por ahora. |
| Memoria y metadatos | Imprescindible | **SQLite** (modo WAL) + **FTS5** | PostgreSQL (excesivo para uso personal) | Un archivo, inspeccionable, exportable, sin servidor. |
| Búsqueda semántica | Opcional (Fase 2) | FTS5 (BM25) primero; luego vectores con **sqlite-vec** | LanceDB, Chroma, FAISS | Empezar con BM25 ya cubre mucha documentación técnica. Verificar madurez de `sqlite-vec` antes de adoptarlo. Embeddings locales vía Ollama (`bge-m3`, `nomic-embed-text`). |
| Interfaz web | Imprescindible (Fase 2) | **FastAPI + uvicorn**, HTML/JS mínimo con assets locales (sin CDN) | Flask; `http.server` de la stdlib (sin auth/CSRF, desaconsejado) | Solo `127.0.0.1`, token de sesión, validación de Origin/Host. Dependencias fijadas con hashes. |
| Aislamiento de herramientas | Imprescindible (Fase 3-4) | **Podman/Docker rootless**: `--network none`, FS de solo lectura, `--cap-drop ALL`, `no-new-privileges`, límites de CPU/RAM/tiempo | gVisor, bubblewrap, VM | Pertenecer al grupo `docker` equivale a root: usar modo rootless. |
| Cifrado | Recomendado | Cifrado de disco (LUKS/FileVault/BitLocker) **primero**; copias con `age` | SQLCipher (requiere dependencia/compilación) | El cifrado de disco protege todo con el menor esfuerzo; `age` para backups sin nube. |
| Control de versiones | Imprescindible | **Git** | — | Trazabilidad del desarrollo del agente. |
| Docker en general | Opcional | Solo para herramientas de auditoría | Ejecutar Ollama en contenedor | Ollama en contenedor añade capa de red (puertos publicados) que es fácil exponer por error. |

Herramientas de auditoría (Fase 4): Semgrep (`--metrics=off`, reglas locales), Gitleaks, Trivy (base de datos de vulnerabilidades descargada de antemano y ejecución sin red; versión fijada por digest tras revisar el incidente de marzo 2026), OSV-Scanner como alternativa para dependencias, OWASP ZAP y Nmap (solo contra activos de la lista de alcance).

## 3. Estados de red del sistema

```
OFFLINE (por defecto)   El servicio de inferencia no tiene salida IP salvo loopback (bloqueo a nivel SO).
PROVISION               Ventana manual y breve para `ollama pull`; se registra en el log y se revierte a OFFLINE.
RESEARCH (Fase 6)       Búsqueda web habilitada por el usuario: proceso separado, consulta mínima y redactada,
                        confirmación antes de enviar, el historial NUNCA forma parte de la consulta.
```

Honestidad sobre "offline": configuración de la aplicación ≠ garantía. La garantía real es el bloqueo a nivel SO
(drop-in de systemd `IPAddressDeny=any` / `IPAddressAllow=localhost`, **[no probado]** en una máquina real) o el
firewall de salida. `secagent verify` distingue ambos casos.

## 4. Autonomía controlada (diseño de Fases 3-5)

Niveles de permiso por herramienta:

| Nivel | Capacidad | Aprobación |
|---|---|---|
| R0 | Leer archivos dentro de rutas autorizadas | Automática |
| R1 | Analizar (Semgrep/Gitleaks/Trivy en contenedor sin red) | Automática dentro del alcance |
| R2 | Preparar un parche (diff, sin aplicar) | Automática; el diff se muestra |
| R3 | Aplicar cambios aprobados / ejecutar pruebas | Aprobación humana explícita |
| R4 | Comandos privilegiados, destructivos, acceso a producción, transmisión de datos privados | Aprobación humana + registro; no hay "aprobar siempre" |

Reglas de diseño derivadas de las amenazas:

1. **La aprobación ocurre fuera del canal del modelo.** El motor de políticas (código determinista) decide si algo requiere
   confirmación; el texto generado por el modelo no puede conceder permisos.
2. **Todo contenido externo es dato, no instrucción**: salidas de herramientas, archivos de repositorios y páginas web se
   pasan al modelo marcados como no confiables, y el motor de políticas no los interpreta.
3. **Alcance obligatorio**: Nmap/ZAP rechazan cualquier objetivo que no esté en la lista de activos autorizados
   (por IP/CIDR/host) definida por el usuario.
4. **Sin terminal libre ni root por defecto**: las herramientas son funciones con argumentos validados, no `bash` arbitrario.
5. **Límites**: tiempo, CPU, memoria, tamaño de salida y número de procesos por invocación.

## 5. Memoria (Fase 2)

Tres capas separadas en SQLite: **corto plazo** (ventana de contexto activa), **historial** (conversaciones completas,
borrables) y **largo plazo** (solo lo que el usuario confirma). Cada memoria de largo plazo tiene `kind`
(`confirmed_fact | hypothesis | preference | superseded`), `source`, `created_at`, `confidence` y `superseded_by`.
Nada se promueve a largo plazo automáticamente: el agente *propone*, el usuario *confirma*.

## 6. Hallazgos (Fase 5)

Tabla `findings` con los campos pedidos (id, descripción, evidencia reproducible, activo, severidad + justificación,
probabilidad, impacto, confianza, posibilidad de falso positivo, referencias CWE/CVE/CVSS/OWASP, mitigación y prueba de
verificación). Un hallazgo sin evidencia reproducible adjunta queda en estado `hipótesis`, nunca `confirmado`.

## 7. Plan por fases y criterios de salida

| Fase | Entrega | Criterio de salida | Estado |
|---|---|---|---|
| 1 | Inspección de hardware, selección de modelo, cliente local endurecido, verificación de privacidad, log de auditoría, chat en terminal | Tests automáticos pasan; en TU máquina: `verify` sin FAIL, `smoke` OK con modelo en VRAM, prueba con red desconectada | **Código y tests listos; falta validación en tu hardware** |
| 2 | Núcleo, interfaz web local, memoria persistente, base de conocimiento FTS5 | Chat sin conexión; memoria persiste entre sesiones; UI solo en localhost con token | Pendiente |
| 3 | Motor de permisos, aislamiento en contenedores, política de egreso, aprobaciones | Intentos de acceso fuera de alcance bloqueados y registrados; anclaje del hash del log | Pendiente |
| 4 | Integración Semgrep/Gitleaks/Trivy/ZAP/Nmap | Resultados reproducibles sobre un repo/laboratorio de prueba; versiones fijadas | Pendiente |
| 5 | Análisis, priorización, remediación y pruebas de regresión | Hallazgos con evidencia; parches mostrados antes de aplicar | Pendiente |
| 6 | Investigación web controlada | Prueba automatizada de que el historial no sale en consultas | Pendiente |
| 7 | Pruebas de seguridad, rendimiento, documentación | Todos los criterios del §12 del prompt maestro | Pendiente |

## 8. Cómo se verifica la privacidad (diseño completo)

1. **Por construcción** (tests): el cliente rechaza hosts no-loopback, ignora proxies, no sigue redirecciones y no puede
   llamar a `/api/pull|create|push|blobs`; el log de auditoría rechaza claves de contenido.
2. **Por inspección** (`secagent verify`): versión mínima, dirección de escucha, funciones cloud, modelos cloud,
   conexiones externas del proceso, política de red del SO.
3. **Por experimento**: desconectar la red físicamente y repetir `smoke`; con el drop-in de systemd activo, observar que
   un intento de salida del servicio falla.
4. **Por tráfico** (Fase 7): captura con `tcpdump`/Wireshark durante una sesión completa, comparando destinos con la lista permitida.

Ninguna de estas pruebas permite afirmar "privacidad total": ver `docs/PHASE1.md`, sección "Qué NO verifica".

## 9. Riesgos conocidos del plan

- Los tamaños de modelos y las estimaciones de memoria son heurísticas; el catálogo cita fuentes de terceros y memoria del autor.
- Los modelos locales de 7–30B razonan peor que los grandes alojados: habrá más falsos positivos/negativos; por eso la
  evidencia reproducible y la revisión humana son parte del diseño, no un adorno.
- Ollama es el componente de mayor superficie; conviene poder cambiarlo por `llama.cpp` sin tocar el resto.
- Soporte de red de `verify` completo solo en Linux; macOS parcial; Windows no soportado en Fase 1.
