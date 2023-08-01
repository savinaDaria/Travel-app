import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'
import { CurrentUser } from '../models'


const initialState: CurrentUser = {
    id: null,
    fullName: null,
    email: null,
    createdAt: null,
    token: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{
                id: string|null
                fullName: string|null
                email: string|null
                createdAt: string|null
                token: string|null
            }>
        ) => {
            localStorage.setItem('currentUser', JSON.stringify({ token: action.payload.token }));
            state.id = action.payload.id;
            state.fullName = action.payload.fullName;
            state.email = action.payload.email;
            state.createdAt = action.payload.createdAt;
            state.token = action.payload.token;
        },
        signOut: (state) => {
            localStorage.removeItem('currentUser');
            state.id = null
            state.fullName = null
            state.email = null
            state.createdAt = null
            state.token = null
        },
    },
})

//export const selectAuth = (state: RootState) => state.auth
export const { setUser, signOut } = authSlice.actions
export default authSlice.reducer
