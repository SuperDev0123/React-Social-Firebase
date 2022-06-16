// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

// ** UseJWT import to get config
// import useJwt from '@src/auth/jwt/useJwt'

// const config = useJwt.jwtConfig


export const postsSlice = createSlice({
  name: 'usersList',
  initialState: {
    posts: []
  },
  reducers: {
    handlePosts: (state, action) => {
      state.posts = action.payload
    }
    
  }
})

export const { handlePosts } = postsSlice.actions

export default postsSlice.reducer
