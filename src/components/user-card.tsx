import React from 'react'

export interface UserCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  email: string
  avatar: string
}

export const UserCard: React.FC<UserCardProps> = (props) => {
  // need to use twMerge to merge the className prop with the default className
  // it was omitted due to unnecessary in this home task
  const { className, name, email, avatar } = props

  return (
    <div className={`flex w-full p-4 border rounded-sm border-slate-300 ${className}`}>
      <img
        className="w-12 h-12 rounded-full mr-4"
        src={avatar}
        alt={name}
      />

      <div className="flex-grow">
        <h2 className="text-lg font-bold">{name}</h2>
        <p className="text-sm text-gray-700">{email}</p>
      </div>
    </div>
  )
}
