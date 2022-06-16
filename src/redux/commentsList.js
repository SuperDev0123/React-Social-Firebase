// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

// ** UseJWT import to get config
// import useJwt from '@src/auth/jwt/useJwt'

// const config = useJwt.jwtConfig


export const commentsSlice = createSlice({
  name: 'commentsList',
  initialState: {
    comments: []
  },
  reducers: {
    handleComments: (state, action) => {
      state.comments = action.payload
    }
    
  }
})

export const { handleComments } = commentsSlice.actions

export default commentsSlice.reducer
