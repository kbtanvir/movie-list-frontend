export interface StateResponse {
  status?: 'loading' | 'loaded' | 'error'
  message?: string
}


export namespace Auth {
  export interface CurrentUser {
    id: string
    name: string
    email: string
    accessToken: string
    refreshToken: string
  }

  export interface Selector {
   user: CurrentUser | null   
   response: NetworkResponse
  }

}



export type NetworkResponse<T> = {
  data?: T[] | T
  status: "initial"| 'success' | 'error' | 'loading'
  message?: string
}
