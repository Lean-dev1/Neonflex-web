import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useLocation } from 'react-router-dom'

// Definimos tus rutas aquí
const navigation = [
  { name: 'Inicio', href: '/', current: true },
  { name: 'Productos', href: '/productos', current: false },
  { name: 'Presupuesto', href: '/presupuesto', current: false },
  { name: 'Nosotros', href: '/nosotros', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const location = useLocation(); // Hook para saber en qué página estamos

  return (
    <Disclosure as="nav" className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Abrir menú</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            {/* LOGO */}
            <div className="flex shrink-0 items-center">
             <Link to="/" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
                NonFlexPremium
             </Link>
            </div>

            {/* MENÚ DE ESCRITORIO */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => {
                   // Verificamos si es la ruta actual
                   const isCurrent = location.pathname === item.href;
                   return (
                    <Link
                      key={item.name}
                      to={item.href}
                      aria-current={isCurrent ? 'page' : undefined}
                      className={classNames(
                        isCurrent ? 'bg-slate-800 text-white shadow-[0_0_10px_rgba(0,243,255,0.2)]' : 'text-gray-300 hover:bg-slate-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium transition-all'
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Botón de Notificaciones (Podemos dejarlo o quitarlo) */}
            <button
              type="button"
              className="relative rounded-full bg-slate-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Notificaciones</span>
              <BellIcon aria-hidden="true" className="size-6" />
            </button>

            {/* Profile dropdown (Menú de Usuario) */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Abrir menú usuario</span>
                  {/* Avatar genérico o foto de perfil */}
                  <img
                    alt=""
                    src=""
                    className="size-8 rounded-full border border-slate-600"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-slate-800 py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  <Link to="/admin" className="block px-4 py-2 text-sm text-gray-300 data-[focus]:bg-slate-700 data-[focus]:outline-none">
                    Panel Admin
                  </Link>
                </MenuItem>
                <MenuItem>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-300 data-[focus]:bg-slate-700 data-[focus]:outline-none">
                    Cerrar Sesión
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      {/* MENÚ MÓVIL (Al hacer clic en las rayitas) */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => {
            const isCurrent = location.pathname === item.href;
            return (
              <DisclosureButton
                key={item.name}
                as={Link}
                to={item.href}
                aria-current={isCurrent ? 'page' : undefined}
                className={classNames(
                  isCurrent ? 'bg-slate-900 text-white' : 'text-gray-300 hover:bg-slate-700 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium'
                )}
              >
                {item.name}
              </DisclosureButton>
            );
          })}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}