/**
 * @typedef {UsersResponse} UsersResponse
 * @description Describes the users response from the API
 * @property {Object} info - Information about the response
 * @property {number} info.page - Page number
 * @property {number} info.results - Number of results
 * @property {string} info.seed - Seed used to generate the results
 * @property {string} info.version - API version
 * @property {Object[]} results - Array of users
 */
export interface UsersResponse {
  info: {
    page: number
    results: number
    seed: string
    version: string
  }
  results: User[]
}

/**
 * @typedef {User} User
 * @description Describes a user from the API. It is a subset of the full user object.
 * @property {string} email - User email
 * @property {Object} login - User login information
 * @property {string} login.uuid - User UUID
 * @property {Object} name - User's name
 * @property {string} name.title - User's title
 * @property {string} name.first - User's first name
 * @property {string} name.last - User's last name
 * @property {Object} picture - User's picture object
 * @property {string} picture.large - User's large picture
 * @property {string} picture.medium - User's medium picture
 * @property {string} picture.thumbnail - User's thumbnail picture
 */
export interface User {
  email: string
  login: {
    uuid: string
  }
  name: {
    title: string
    first: string
    last: string
  }
  picture: {
    large: string
    medium: string
    thumbnail: string
  }
}
