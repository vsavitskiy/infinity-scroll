import type { UsersResponse } from '@/types'

/**
 * Validate the response data against a predefined schema
 * @param data {object} - the response data
 * @returns {boolean} true if the data is valid, false otherwise
 */
const validateResponseData = (data: object): data is UsersResponse => {
  return ('info' in data && 'results' in data)
}

/**
 * Fetch users from the randomuser.me API
 * @param page: number
 * @returns a promise that resolves to a UsersResponse
 */
export const fetchUsers = async (page: number): Promise<UsersResponse> => {
  if (page < 1 || !Number.isInteger(page)) {
    throw new Error('Failed to fetch users: Invalid page number')
  }

  // Base URL must be an environment variable
  // Omitted for simplicity
  const baseUrl = new URL('https://randomuser.me/api/')
  baseUrl.searchParams.set('page', String(page))
  baseUrl.searchParams.set('results', '20')
  baseUrl.searchParams.set('inc', 'login,email,name,picture')

  const response: Response = await fetch(baseUrl.toString())

  if (!response.ok) {
    throw new Error('Failed to fetch users: Network error')
  }

  const data = await response.json()

  if (!validateResponseData(data)) {
    throw new Error('Failed to fetch users: Invalid response')
  }

  return data
}
