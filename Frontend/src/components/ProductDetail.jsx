import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const DEFAULT_DESCRIPTION =
  'Una pieza de luz diseñada para transformar el espacio. Fabricada artesanalmente con neón LED de alta intensidad sobre base resistente, combina estética industrial, precisión técnica y una presencia inconfundible.';

const categoryNames = {
  carteleria: 'Cartelería',
  impresion3d: 'Impresión 3D',
  insumos: 'Insumos',
  frases: 'Textos y Frases',
  figuras: 'Figuras',
  negocios: 'Negocios',
  logos: 'Negocios',
};

function Icon({ name, size = 24 }) {
  const paths = {
    close: <path d="m6 6 12 12M18 6 6 18" />,
    check: <path d="m5 12 4 4L19 6" />,
    bolt: <path d="m13 2-8 12h7l-1 8 8-12h-7l1-8Z" />,
    install: <path d="M4 19h16M7 16V5h10v11M9 8h6" />,
    ruler: (
      <>
        <path d="M4 16 16 4l4 4L8 20l-4-4Z" />
        <path d="m13 7 2 2M10 10l2 2M7 13l2 2" />
      </>
    ),
    truck: (
      <>
        <path d="M3 6h11v11H3zM14 10h4l3 3v4h-7z" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
      </>
    ),
    shield: <path d="M12 3 5 6v5c0 4.6 2.9 8.2 7 10 4.1-1.8 7-5.4 7-10V6l-7-3Z" />,
    hand: (
      <path d="M7 11V7a2 2 0 0 1 4 0v3-5a2 2 0 0 1 4 0v5-3a2 2 0 0 1 4 0v7c0 4-3 7-7 7h-1c-2 0-3.3-1-4.5-2.5L3 14a2.1 2.1 0 0 1 3-3l1 1" />
    ),
    whatsapp: (
      <>
        <path d="M20 11.6a8 8 0 0 1-11.8 7L4 20l1.4-4A8 8 0 1 1 20 11.6Z" />
        <path d="M9 8.5c.4 3 2 4.6 5 5" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      className="shrink-0"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8">
        {paths[name]}
      </g>
    </svg>
  );
}

function ImagePlaceholder({ label = 'Imagen del producto', hideText = false }) {
  return (
    <div
      aria-label={label}
      className="flex aspect-square h-full w-full min-w-0 items-center justify-center rounded-none md:rounded-[6px] border-y md:border border-[#3b3b40] bg-[#27272b] text-[#b9b4bc]"
      role="img"
    >
      {!hideText && <span className="text-[14px] text-center px-4">Foto no disponible</span>}
    </div>
  );
}

function Gallery({ product }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(0);
  }, [product]);

  // Soporta un array de imágenes (product.images) o la imagen única de PostgreSQL (product.image_url)
  const rawImages =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : product.image_url
      ? [product.image_url]
      : [''];

  const multiple = rawImages.length > 1;
  const activeSrc = rawImages[active];

  return (
    <div
      className={`block md:grid content-start min-w-0 relative ${
        multiple ? 'md:gap-4 md:grid-cols-[72px_minmax(0,1fr)]' : ''
      }`}
    >
      {multiple && (
        <div aria-label="Imágenes del producto" className="hidden md:flex flex-col gap-3">
          {rawImages.map((imgUrl, index) => (
            <button
              aria-label={`Ver imagen ${index + 1}`}
              aria-pressed={active === index}
              className={`h-[72px] w-[72px] overflow-hidden rounded-[6px] bg-transparent p-0 cursor-pointer transition-all ${
                active === index ? 'border-2 border-[#f5f2ee]' : 'border border-[#2c2c30]'
              }`}
              key={index}
              onClick={() => setActive(index)}
              type="button"
            >
              {imgUrl ? (
                <img
                  src={imgUrl}
                  alt=""
                  className="h-full w-full object-cover rounded-[3px]"
                />
              ) : (
                <ImagePlaceholder label="" hideText />
              )}
            </button>
          ))}
        </div>
      )}

      <div className="aspect-square w-full min-w-0 overflow-hidden md:rounded-[6px] border-y md:border border-[#3b3b40] bg-[#27272b]">
        {activeSrc ? (
          <img
            src={activeSrc}
            alt={`Foto de ${product.title}`}
            className="h-full w-full object-cover"
          />
        ) : (
          <ImagePlaceholder label={`Foto de ${product.title}`} />
        )}
      </div>

      {multiple && (
        <div
          aria-label={`Imagen ${active + 1} de ${rawImages.length}`}
          className="flex md:hidden items-center justify-center gap-2 absolute bottom-[15px] left-0 right-0"
        >
          {rawImages.map((_, index) => (
            <button
              aria-label={`Ver imagen ${index + 1}`}
              aria-pressed={active === index}
              className={`h-2 w-2 rounded-full border-0 p-0 cursor-pointer ${
                active === index ? 'bg-[#f5f2ee] opacity-100' : 'bg-[#b9b4bc] opacity-55'
              }`}
              key={index}
              onClick={() => setActive(index)}
              type="button"
            />
          ))}
        </div>
      )}
    </div>
  );
}

const assurances = [
  { icon: 'truck', text: 'Envíos a todo el país por Correo Argentino' },
  { icon: 'shield', text: 'Garantía de 6 meses' },
  { icon: 'hand', text: 'Hecho a mano en Argentina' },
];

export default function ProductDetailModal({
  product,
  onClose,
  whatsappNumber = '5491164477337',
}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!product) return;

    const previousFocus = document.activeElement;
    const dialog = dialogRef.current;
    const focusables = dialog?.querySelectorAll(
      'button, a[href], [tabindex]:not([tabindex="-1"])'
    );
    focusables?.[0]?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab' || !focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
      previousFocus?.focus?.();
    };
  }, [product, onClose]);

  if (!product) return null;

  const formattedPrice =
    typeof product.price === 'string' && product.price.startsWith('$')
      ? product.price
      : `$${Math.round(Number(product.price || 0)).toLocaleString('es-AR')}`;

  const displayCategory =
    categoryNames[product.category?.toLowerCase()] || product.category || 'Cartelería';

  const formattedCode = String(product.id).padStart(3, '0');

  const buyMessage = encodeURIComponent(
    `Hola NeonFlex Premium, quiero consultar por "${product.title}" (Cód. ${formattedCode} - ${formattedPrice}).`
  );
  const customMessage = encodeURIComponent(
    `Hola NeonFlex Premium, vi el modelo "${product.title}" (Cód. ${formattedCode}) y quiero cotizar una versión a medida en otro tamaño o color.`
  );

  const waBuyUrl = `https://wa.me/${whatsappNumber}?text=${buyMessage}`;
  const waCustomUrl = `https://wa.me/${whatsappNumber}?text=${customMessage}`;

  const features = [
    { icon: 'bolt', label: 'Tecnología', value: 'LED 12 V' },
    { icon: 'install', label: 'Instalación', value: 'Listo para colgar' },
    { icon: 'ruler', label: 'Medidas', value: product.medidas || 'A personalizar' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
        @keyframes nf-modal-fade { from { opacity: 0; } to { opacity: 1; } }
      `}</style>

      <div
        className="fixed inset-0 z-50 flex items-stretch md:items-center justify-center bg-black/70 p-0 md:px-6 md:py-[5vh] font-['Montserrat',sans-serif] text-[#f5f2ee] text-[16px] animate-[nf-modal-fade_150ms_ease-out]"
        onMouseDown={(event) => event.target === event.currentTarget && onClose()}
      >
        <div
          aria-labelledby="product-title"
          aria-modal="true"
          className="relative w-full max-w-none md:max-w-[1080px] max-h-[100dvh] md:max-h-[90vh] overflow-y-auto bg-[#1a1a1d] border-0 md:border md:border-[#2c2c30] rounded-none md:rounded-[8px] shadow-[0_16px_48px_rgba(0,0,0,0.35)] pt-[56px] pb-[88px] md:p-0"
          ref={dialogRef}
          role="dialog"
        >
          {/* Header fijo Mobile */}
          <header className="fixed top-0 left-0 right-0 z-10 flex md:hidden h-[56px] items-center justify-between bg-[#1a1a1d] border-b border-[#2c2c30] pl-4">
            <span className="text-[14px] font-semibold truncate pr-3">{product.title}</span>
            <button
              aria-label="Cerrar"
              className="flex h-[44px] w-[44px] items-center justify-center bg-transparent border-0 text-[#f5f2ee] hover:bg-[#2c2c30] cursor-pointer"
              onClick={onClose}
              type="button"
            >
              <Icon name="close" />
            </button>
          </header>

          {/* Botón Cerrar Desktop */}
          <button
            aria-label="Cerrar"
            className="hidden md:flex absolute top-3 right-3 z-10 h-[44px] w-[44px] items-center justify-center rounded-[5px] bg-transparent border-0 text-[#f5f2ee] hover:bg-[#2c2c30] cursor-pointer transition-colors"
            onClick={onClose}
            type="button"
          >
            <Icon name="close" />
          </button>

          {/* Contenido Principal */}
          <div className="flex flex-col md:grid md:grid-cols-[minmax(0,55fr)_minmax(0,45fr)] gap-0 md:gap-8 p-0 md:p-8">
            <Gallery product={product} />

            <div className="min-w-0 px-5 pt-6 pb-10 md:p-0 md:pt-1">
              <nav
                aria-label="Ruta de navegación"
                className="flex items-center gap-2 text-[14px] text-[#b9b4bc] md:pr-[52px]"
              >
                <button
                  type="button"
                  onClick={onClose}
                  className="text-[#4aa8ff] hover:underline bg-transparent border-0 p-0 cursor-pointer font-inherit"
                >
                  Catálogo
                </button>
                <span aria-hidden="true">/</span>
                <span>{displayCategory}</span>
              </nav>

              <div className="mt-[18px] md:mt-[22px]">
                <h1
                  id="product-title"
                  className="text-[28px] md:text-[30px] font-bold leading-[1.2] m-0 md:max-w-[18ch] text-[#f5f2ee]"
                >
                  {product.title}
                </h1>
                <p className="text-[14px] text-[#b9b4bc] mt-[9px] mb-0">
                  Cód. {formattedCode}
                </p>
              </div>

              <div className="mt-[22px] md:mt-[24px]">
                <p className="text-[30px] md:text-[32px] font-bold leading-[1.1] m-0 mb-[7px] text-[#f5f2ee]">
                  {formattedPrice}
                </p>
                <p className="text-[14px] text-[#b9b4bc] m-0">
                  Precio final. Efectivo o transferencia.
                </p>
              </div>

              <p className="mt-[20px] mb-0 flex items-center gap-[9px] font-semibold text-[#f5f2ee]">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#f5f2ee]">
                  <Icon name="check" size={18} />
                </span>
                Disponible a pedido
              </p>

              <div className="mt-[22px] md:mt-[24px] flex flex-col items-stretch gap-[14px] text-center">
                <a
                  className="hidden md:flex min-h-[56px] items-center justify-center gap-[10px] rounded-[6px] bg-[#d3142b] hover:bg-[#b80f24] px-[18px] text-[15px] font-bold text-white transition-colors"
                  href={waBuyUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon name="whatsapp" />
                  Consultar por WhatsApp
                </a>

                <a
                  className="text-[14px] leading-[1.5] text-[#4aa8ff] hover:underline"
                  href={waCustomUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  ¿Lo querés en otra medida o color? Pedí tu versión a medida
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="mt-[1px] text-[14px] text-[#b9b4bc] hover:underline bg-transparent border-0 p-0 cursor-pointer font-inherit"
                >
                  Volver al catálogo
                </button>
              </div>

              <section className="mt-[30px] md:mt-[32px]">
                <h2 className="text-[16px] font-semibold m-0 mb-3 text-[#f5f2ee]">Descripción</h2>
                <p className="text-[#b9b4bc] leading-[1.65] m-0 max-w-[60ch]">
                  {product.description || DEFAULT_DESCRIPTION}
                </p>
              </section>

              <section className="mt-[30px] md:mt-[32px]">
                <h2 className="text-[16px] font-semibold m-0 mb-3 text-[#f5f2ee]">Características</h2>
                <div className="border-t border-[#2c2c30]">
                  {features.map((feature) => (
                    <div
                      className="grid grid-cols-[24px_1fr] md:grid-cols-[24px_minmax(90px,1fr)_auto] items-center gap-3 border-b border-[#2c2c30] py-3 md:py-0 md:min-h-[61px]"
                      key={feature.label}
                    >
                      <Icon name={feature.icon} />
                      <span className="text-[14px] text-[#b9b4bc]">{feature.label}</span>
                      <strong className="col-start-2 md:col-auto text-[16px] font-semibold text-left md:text-right text-[#f5f2ee]">
                        {feature.value}
                      </strong>
                    </div>
                  ))}
                </div>
              </section>

              <div className="mt-[32px] border-t border-[#2c2c30] pt-5">
                {assurances.map((item) => (
                  <div
                    className="flex min-h-[44px] items-center gap-[14px] leading-[1.45]"
                    key={item.text}
                  >
                    <Icon name={item.icon} />
                    <span className="text-[14px] text-[#b9b4bc]">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Barra inferior fija de compra en Mobile */}
          <footer className="fixed bottom-0 left-0 right-0 z-10 flex md:hidden h-[72px] items-center justify-between gap-[14px] bg-[#1a1a1d] border-t border-[#2c2c30] py-2 pr-3 pl-4">
            <div className="flex flex-col shrink-0">
              <span className="text-[14px] text-[#b9b4bc]">Precio final</span>
              <strong className="text-[18px] text-[#f5f2ee]">{formattedPrice}</strong>
            </div>
            <a
              className="flex min-h-[52px] items-center justify-center gap-[10px] rounded-[6px] bg-[#d3142b] hover:bg-[#b80f24] px-3 text-[13px] font-bold text-white transition-colors"
              href={waBuyUrl}
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="whatsapp" size={20} />
              Consultar por WhatsApp
            </a>
          </footer>
        </div>
      </div>
    </>
  );
}