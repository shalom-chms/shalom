import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  HomeIcon,
  UsersIcon,
  UserGroupIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  Cog8ToothIcon,
  XMarkIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'People', href: '/people', icon: UsersIcon },
  { name: 'Households', href: '/households', icon: UserGroupIcon },
  { name: 'Groups', href: '/groups', icon: UserGroupIcon },
  { name: 'Events', href: '/events', icon: CalendarIcon },
  { name: 'Donations', href: '/donations', icon: CurrencyDollarIcon },
  { name: 'Settings', href: '/settings', icon: Cog8ToothIcon },
]

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  return (
    <div className="h-screen bg-gray-50">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <div className="flex grow flex-col overflow-y-auto bg-primary border-r border-gray-200 shadow-lg">
                  <div className="flex h-32 shrink-0 items-center justify-center bg-white px-3">
                    <Image
                      className="h-24 w-auto"
                      src="/logo.png"
                      alt="Shalom"
                      width={960}
                      height={160}
                      priority
                    />
                  </div>
                  <nav className="flex flex-1 flex-col px-6 pt-2 pb-4">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item) => (
                            <li key={item.name}>
                              <Link
                                href={item.href}
                                className={`
                                  group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold
                                  ${router.pathname === item.href
                                    ? 'bg-primary-light text-white'
                                    : 'text-gray-200 hover:text-white hover:bg-primary-light'
                                  }
                                `}
                              >
                                <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col overflow-y-auto bg-primary border-r border-gray-200 shadow-lg">
          <div className="flex h-32 shrink-0 items-center justify-center bg-white px-3">
            <Image
              className="h-24 w-auto"
              src="/logo.png"
              alt="Shalom"
              width={960}
              height={160}
              priority
            />
          </div>
          <nav className="flex flex-1 flex-col px-6 pt-2 pb-4">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`
                          group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold
                          ${router.pathname === item.href
                            ? 'bg-primary-light text-white'
                            : 'text-gray-200 hover:text-white hover:bg-primary-light'
                          }
                        `}
                      >
                        <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center border-b border-gray-200 bg-white/95 backdrop-blur px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Separator */}
          <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1 items-center">
              <h1 className="text-xl font-semibold text-primary">Dashboard</h1>
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {/* Profile dropdown */}
              <div className="relative">
                <button
                  type="button"
                  className="-m-1.5 flex items-center p-1.5"
                  id="user-menu-button"
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="flex items-center">
                    <img
                      className="h-8 w-8 rounded-full bg-gray-50 ring-2 ring-primary/10"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <span className="ml-3 text-sm font-medium text-gray-700">John Smith</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
