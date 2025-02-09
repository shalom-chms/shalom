import Link from 'next/link'
import { useRouter } from 'next/router'
import classNames from 'classnames'

export default function PeopleSubmenu() {
  const router = useRouter()

  return (
    <div className="flex flex-col pl-6 mt-1">
      <div className="space-y-1">
        <Link
          href="/people"
          className={classNames(
            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
            router.pathname === '/people'
              ? 'bg-primary-light text-white'
              : 'text-gray-200 hover:text-white hover:bg-primary-light'
          )}
        >
          All People
        </Link>
        <Link
          href="/households"
          className={classNames(
            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
            router.pathname === '/households'
              ? 'bg-primary-light text-white'
              : 'text-gray-200 hover:text-white hover:bg-primary-light'
          )}
        >
          Households
        </Link>
        <Link
          href="/people/add"
          className={classNames(
            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
            router.pathname === '/people/add'
              ? 'bg-primary-light text-white'
              : 'text-gray-200 hover:text-white hover:bg-primary-light'
          )}
        >
          Add Person
        </Link>
        <Link
          href="/people/import"
          className={classNames(
            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
            router.pathname === '/people/import'
              ? 'bg-primary-light text-white'
              : 'text-gray-200 hover:text-white hover:bg-primary-light'
          )}
        >
          Import People
        </Link>
      </div>
    </div>
  )
}
