// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

// ** UseJWT import to get config
// import useJwt from '@src/auth/jwt/useJwt'

// const config = useJwt.jwtConfig


export const usersSlice = createSlice({
  name: 'usersList',
  initialState: {
    users: []
  },
  reducers: {
    handleUsers: (state, action) => {
      state.users = action.payload
    }
    
  }
})

export const { handleUsers } = usersSlice.actions

export default usersSlice.reducer
