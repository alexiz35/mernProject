import {createContext} from 'react'

function noop() {}

export const AuthContext = createContext({
    token: null,
    user: null,
    userId: null,
    login: noop(),
    logout: noop(),
    isAuthenticated: false,
    getId: null,
    setGetId: noop(),
    page: null,
    setPage: noop(),
    admin: false,
    setAdmin: noop()

})