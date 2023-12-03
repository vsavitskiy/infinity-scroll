export interface UsersResponse {
  info: {
    page: number
    results: number
    seed: string
    version: string
  }
  results: User[]
}

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
