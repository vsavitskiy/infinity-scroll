import type { UsersResponse } from '@/types'

/**
 * Validate the response data against a predefined schema
 * @param data {object} - the response data
 * @returns {boolean} true if the data is users response, false otherwise
 */
const validateResponseData = (data: object): data is UsersResponse => {
  return ('info' in data && 'results' in data)
}

/**
 * Fetch users from the randomuser.me API
 * @param page {number} - the page number to fetch
 * @returns a promise that resolves to a UsersResponse
 */
export const fetchUsers = async (page: number): Promise<UsersResponse> => {
  /**
   * @description Validate the page number.
   * The API only supports positive integers
   */
  if (page < 1 || !Number.isInteger(page)) {
    throw new Error('Failed to fetch users: Invalid page number')
  }

  /**
   * @type {URL}
   * @description The base URL for the randomuser.me API.
   * Base URL must be an environment variable.
   * Omitted for simplicity
   * @see https://randomuser.me/documentation#howto
   */
  const baseUrl = new URL('https://randomuser.me/api/')

  /**
   * @description Set the query parameters
   */
  baseUrl.searchParams.set('page', String(page))
  baseUrl.searchParams.set('results', '20')
  baseUrl.searchParams.set('inc', 'login,email,name,picture')

  /**
   * @type {Response}
   * @description Raw data from the API
   */
  const response: Response = await fetch(baseUrl.toString())

  /**
   * @description Validate the response's status
   */
  if (!response.ok) {
    throw new Error('Failed to fetch users: Network error')
  }

  /**
   * @type {object} - parsed data from the API
   */
  const data = await response.json()

  /**
   * @description Validate the response data.
   * Whether it is a UsersResponse or not
   */
  if (!validateResponseData(data)) {
    throw new Error('Failed to fetch users: Invalid response')
  }

  return data
}
