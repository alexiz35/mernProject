import {useState,useCallback,useEffect} from 'react'

const storageName = 'userData'

export const useAuth = () => {
    const [token,setToken] = useState(null)
    const [ready,setReady] = useState(false)
    const [userId,setUserId] = useState(null)
    const [admin,setAdmin] = useState(false)

    const login = useCallback((jwtToken, id,admin) => {
        setToken(jwtToken)
        setUserId(id)
        setAdmin(admin)

        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken, admin: admin
        }))
    },[])

    const logout = useCallback(() => {
        console.log('logout')
        setToken(null)
        setUserId(null)
        setAdmin(null)
        localStorage.removeItem(storageName)
    },[])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.userId, data.admin)
        }
        setReady(true)
    },[login])

    return {login,logout,token,userId,ready,admin}
}