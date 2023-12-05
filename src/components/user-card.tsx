import React from 'react'

/**
 * @typedef {UserCardProps}
 * @description Describes props for UserCard component
 * @property {string} className - Classname for the container
 * @property {string} name - User's name
 * @property {string} email - User's email
 * @property {string} avatar - User's avatar
 */
export interface UserCardProps {
  className?: string
  name: string
  email: string
  avatar: string
}

/**
 * @description UserCard component. Displays user information
 * @param {UserCardProps} props
 * @returns {React.FC}
 */
export const UserCard: React.FC<UserCardProps> = (props) => {
  const { className, name, email, avatar } = props

  return (
    /**
     * @todo Need to use twMerge to properly merge className prop with the default className.
     * */
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
