import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    error: false,
    message: null,
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        successNotify(state, action) {
            state = {
                error: false,
                message: action.payload,
            }
            return state
        },
        errorNotify(state, action) {
            state = {
                error: true,
                message: action.payload,
            }
            return state
        },
        nullNotify({ error }) {
            return {
                error,
                message: null,
            }
        }
    }
})

export const { successNotify, errorNotify, nullNotify } = notificationSlice.actions

export const setNotify = (message, seconds, error = false) => {
    return async (dispatch) => {
        if (error) {
            dispatch(errorNotify(message))
        } else {
            dispatch(successNotify(message))
        }
        setTimeout(() => {
            dispatch(nullNotify())
        }, (seconds * 1000))
    }
}

export default notificationSlice.reducer