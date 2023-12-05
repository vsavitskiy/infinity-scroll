import React, { useEffect } from 'react'
import { InfiniteScroll } from '@/components/infinite-scroll'
import { UserCard } from '@/components/user-card'
import { fetchUsers } from '@/api'

import type { User } from '@/types'

/**
 * @description App component. Fetches users from API and passes them in infinite scroll
 * @returns {React.FC}
 * @constructor
 */
export const App: React.FC = () => {
  /**
   * @type {number}
   * @description State for current page, used for fetching users
   */
  const [currentPage, setCurrentPage] = React.useState<number>(1)

  /**
   * @type {User[]}
   * @description State for users array fetched from API
   */
  const [users, setUsers] = React.useState<User[]>([])

  /**
   * @type {boolean}
   * @description State for loading state, used for showing loading indicator
   */
  const [loading, setLoading] = React.useState<boolean>(false)

  /**
   * @description Fetch users on mount and when currentPage changes.
   * When users are fetched, add them to the users array
   */
  useEffect(() => {
    setLoading(true)
    fetchUsers(currentPage)
      .then((response) => {
        setUsers((users) => users.concat(response.results))
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [currentPage])

  /**
   * @type {() => void}
   * @description Callback for loading next page
   */
  const handleNextPageLoading = (): void => {
    setCurrentPage((page) => page + 1)
  }

  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className="grow-0 text-2xl text-center my-4">Infinite Scroll</h1>

      <div className="grow overflow-scroll">
        <InfiniteScroll loading={loading} onNextPage={handleNextPageLoading}>
          {users.map(({ login, email, name, picture }) => (
            <UserCard
              key={login.uuid}
              className="mb-2"
              email={email} name={`${name.title} ${name.first} ${name.last}`}
              avatar={picture.thumbnail}
            />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  )
}
