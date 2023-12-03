import React, { useEffect } from 'react'
import { InfiniteScroll } from '@/components/infinite-scroll'
import { UserCard } from '@/components/user-card'
import { fetchUsers } from '@/api'

import type { User } from '@/types'

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState<number>(1)
  const [users, setUsers] = React.useState<User[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    fetchUsers(currentPage)
      .then((response) => {
        setUsers((users) => ([...users, ...response.results]))
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [currentPage])

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
