// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

// ** UseJWT import to get config
// import useJwt from '@src/auth/jwt/useJwt'

// const config = useJwt.jwtConfig


export const chatSlice = createSlice({
  name: 'chatList',
  initialState: {
    chats: [],
    contacts: [],
    userProfile: {},
    selectedUser: {},
    chatData: []
  },
  reducers: {
    handleUserProfile: (state, action) => {
      state.userProfile = action.payload
    },
    handleContacts: (state, action) => {
      state.contacts = action.payload
    },
    handleChats: (state, action) => {
        state.chats = action.payload
    },
    selectChat: (state, action) => {
      state.selectedUser = action.payload
    },
    handleChatData: (state ,action) => {
        state.chatData = action.payload
    }

    
  }
})

export const { selectChat, handleContacts, handleUserProfile, handleChats, handleChatData  } = chatSlice.actions

export default chatSlice.reducer

