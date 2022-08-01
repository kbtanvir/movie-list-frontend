import { Auth } from '../../models/types/Auth'

export const reducers = {
  setUser: (state: Auth.State, { payload }: { payload: Auth.User | null }) => {
    state.user = payload
  },

  setAvatarURL: (state: Auth.State, { payload }: { payload: string }) => {
    if (!state.user) return
    state.user.avatarURL = payload
  },
  setPassResetStatus: (state: Auth.State, { payload }: { payload: boolean }) => {
    if (!state.user) return
    state.user.isPasswordChangeRequired = payload
  },
}
