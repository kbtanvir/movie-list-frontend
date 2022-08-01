
export namespace Auth {
  export interface User {
    id: string
    name: string
    email: string
    phoneNumber: string
    isVerified: boolean
    isPasswordChangeRequired: boolean
    avatarURL: string
    role: {
      id: string
      name: string
      isActive: boolean
      isUserRole: {}
    }
    accessToken: string
    refreshToken: string
    type: 'google' | 'facebook' | 'email' | 'phone'
  }

  export interface State {
    user: User | null
    // response: StateResponse;
  }
}

export interface StateResponse {
  status?: 'loading' | 'loaded' | 'error'
  message?: string
}
