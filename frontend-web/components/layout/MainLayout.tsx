import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  MdHome,
  MdPeople,
  MdGroups,
  MdChurch,
  MdEvent,
  MdAttachMoney,
  MdSettings,
  MdMenu,
  MdClose
} from 'react-icons/md'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import PeopleSubmenu from './PeopleSubmenu'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: MdHome },
  { name: 'People', href: '/people', icon: MdPeople, submenu: [
    { name: 'All People', href: '/people' },
    { name: 'Households', href: '/households' },
    { name: 'Add Person', href: '/people/add' },
    { name: 'Import People', href: '/people/import' }
  ] },
  { name: 'Groups', href: '/groups', icon: MdGroups },
  { name: 'Services', href: '/services', icon: MdChurch },
  { name: 'Events', href: '/events', icon: MdEvent },
  { name: 'Donations', href: '/donations', icon: MdAttachMoney },
  { name: 'Settings', href: '/settings', icon: MdSettings },
]

type MainLayoutProps = {
  children: React.ReactNode
  title?: string
}

export default function MainLayout({ children, title }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  const renderNavItem = (item: typeof navigation[0]) => {
    const Icon = item.icon
    return (
      <li key={item.name}>
        <Link
          href={item.href}
          className={classNames(
            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
            router.pathname === item.href
              ? 'bg-primary-light text-white'
              : 'text-gray-200 hover:text-white hover:bg-primary-light'
          )}
        >
          <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />
          <span>{item.name}</span>
        </Link>
        {item.submenu && router.pathname.startsWith(item.href) && (
          <div className="mt-1 ml-8">
            <PeopleSubmenu />
          </div>
        )}
      </li>
    )
  }

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
                  <div className="flex h-16 shrink-0 items-center justify-center bg-white px-2">
                    <Image
                      className="h-14 w-auto"
                      src="/logo.png"
                      alt="Shalom"
                      width={480}
                      height={80}
                      priority
                    />
                  </div>
                  <nav className="flex flex-1 flex-col px-6 pt-2 pb-4">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map(renderNavItem)}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
                <button
                  type="button"
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sr-only">Close panel</span>
                  <MdClose className="h-6 w-6" aria-hidden="true" />
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col overflow-y-auto bg-primary border-r border-gray-200 shadow-lg">
          <div className="flex h-16 shrink-0 items-center justify-center bg-white px-2">
            <Image
              className="h-14 w-auto"
              src="/logo.png"
              alt="Shalom"
              width={480}
              height={80}
              priority
            />
          </div>
          <nav className="flex flex-1 flex-col px-6 pt-2 pb-4">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map(renderNavItem)}
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
            <MdMenu className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Separator */}
          <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1 items-center">
              <h1 className="text-xl font-semibold text-primary">{title}</h1>
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
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
