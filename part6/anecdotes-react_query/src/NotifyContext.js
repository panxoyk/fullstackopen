import { createContext, useContext, useReducer } from 'react'

const notifyReducer = (state, action) => {
    switch (action.type) {
        case 'SUCCESS':
            return {
                message: action.payload,
                error: false,
            }
        case 'ERROR':
            return {
                message: action.payload,
                error: true,
            }
        case 'CLEAR':
            return {
                message: null,
                error: false,
            }
        default:
            return state
    }
}

const NotifyContext = createContext()

export const NotifyContextProvider = (props) => {
    const [ notify, notifyDispatch ] = useReducer(notifyReducer, {
        message: null,
        error: false,
    })

    return (
        <NotifyContext.Provider value={[ notify, notifyDispatch ]}>
            {props.children}
        </NotifyContext.Provider>
    )
}

export const useNotifyValue = () => {
    const notifyAndDispatch = useContext(NotifyContext)
    return notifyAndDispatch[0]
}

export const useNotifyDispatch = () => {
    const notifyAndDispatch = useContext(NotifyContext)
    return notifyAndDispatch[1]
}

export default NotifyContext