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
  MdClose,
  MdLogout,
} from 'react-icons/md'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import PeopleSubmenu from './PeopleSubmenu'
import { useAuth } from '../../contexts/AuthContext'
import { auth } from '../../services/firebase'

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
  const { userData } = useAuth()

  const handleLogout = async () => {
    try {
      await auth.signOut()
      router.push('/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const renderNavItem = (item: typeof navigation[0]) => {
    const Icon = item.icon
    const isActive = router.pathname === item.href || 
                    (item.submenu && router.pathname.startsWith(item.href))
    
    return (
      <li key={item.name}>
        <Link
          href={item.href}
          className={classNames(
            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
            isActive
              ? 'bg-primary-light text-white'
              : 'text-gray-200 hover:text-white hover:bg-primary-light'
          )}
        >
          <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />
          <span>{item.name}</span>
        </Link>
        {item.submenu && isActive && (
          <div className="mt-1 ml-8">
            <PeopleSubmenu items={item.submenu} parentPath={item.href} />
          </div>
        )}
      </li>
    )
  }

  const getInitials = (email: string | null) => {
    if (!email) return '?'
    const name = userData?.firstName && userData?.lastName 
      ? `${userData.firstName} ${userData.lastName}`
      : email.split('@')[0]
    const parts = name.split(/[-._\s]/)
    return parts.map(part => part[0]?.toUpperCase() || '').join('').slice(0, 2)
  }

  const renderUserProfile = () => (
    <div className="flex items-center text-sm font-semibold text-white">
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between space-x-2">
          <Link href="/profile" className="flex items-center space-x-2 min-w-0 hover:opacity-80">
            <div className="h-8 w-8 flex-shrink-0 rounded-full bg-primary-light flex items-center justify-center text-sm font-medium">
              {getInitials(userData?.email)}
            </div>
            <div className="truncate">
              {userData?.firstName && userData?.lastName ? (
                <div className="truncate">{`${userData.firstName} ${userData.lastName}`}</div>
              ) : (
                <div className="truncate">{userData?.email}</div>
              )}
            </div>
          </Link>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleLogout();
            }}
            className="p-1 text-gray-200 hover:text-white transition-colors"
            title="Sign Out"
          >
            <MdLogout className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <>
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
                  <div className="flex h-full flex-col overflow-y-auto bg-primary border-r border-gray-200 shadow-lg">
                    <div className="flex h-16 shrink-0 items-center justify-center bg-white px-2">
                      <Image
                        className="h-14 w-auto"
                        src="/logo.png"
                        alt="Shalom CHMS"
                        width={480}
                        height={80}
                        priority
                      />
                    </div>
                    <div className="flex min-h-0 flex-1 flex-col">
                      <nav className="flex-1 px-6 pt-2 pb-2.5">
                        <ul className="flex h-full flex-col">
                          <li>
                            <ul role="list" className="-mx-2 space-y-1">
                              {navigation.map(renderNavItem)}
                            </ul>
                          </li>
                          <li className="mt-auto">
                            {renderUserProfile()}
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <div className="flex h-full flex-col overflow-y-auto bg-primary border-r border-gray-200 shadow-lg">
            <div className="flex h-16 shrink-0 items-center justify-center bg-white px-2">
              <Image
                className="h-14 w-auto"
                src="/logo.png"
                alt="Shalom CHMS"
                width={480}
                height={80}
                priority
              />
            </div>
            <div className="flex min-h-0 flex-1 flex-col">
              <nav className="flex-1 px-6 pt-2 pb-2.5">
                <ul className="flex h-full flex-col">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {navigation.map(renderNavItem)}
                    </ul>
                  </li>
                  <li className="mt-auto">
                    {renderUserProfile()}
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MdMenu className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                {title && (
                  <h1 className="text-2xl font-semibold leading-6 text-primary">
                    {title}
                  </h1>
                )}
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
    </>
  )
}
