import MainLayout from '../components/layout/MainLayout'
import PageHeader from '../components/common/PageHeader'
import {
  UsersIcon,
  UserGroupIcon,
  CalendarIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline'

const stats = [
  { name: 'Total Members', value: '2,521', icon: UsersIcon },
  { name: 'Households', value: '854', icon: UserGroupIcon },
  { name: 'Upcoming Events', value: '12', icon: CalendarIcon },
  { name: 'Monthly Donations', value: '$35,250', icon: CurrencyDollarIcon },
]

export default function Dashboard() {
  return (
    <MainLayout>
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's an overview of your church."
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-secondary p-3">
                <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            </dd>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">Recent Activity</h3>
            <div className="mt-6 flow-root">
              <ul role="list" className="-my-5 divide-y divide-gray-200">
                <li className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">New member registration</p>
                      <p className="text-sm text-gray-500">John Smith joined the church</p>
                    </div>
                    <div className="text-sm text-gray-500">5m ago</div>
                  </div>
                </li>
                {/* Add more activity items here */}
              </ul>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">Upcoming Events</h3>
            <div className="mt-6 flow-root">
              <ul role="list" className="-my-5 divide-y divide-gray-200">
                <li className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">Sunday Service</p>
                      <p className="text-sm text-gray-500">February 11, 2024 - 10:00 AM</p>
                    </div>
                    <div>
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        Upcoming
                      </span>
                    </div>
                  </div>
                </li>
                {/* Add more events here */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
