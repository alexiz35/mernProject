import {useState, useCallback} from 'react'
import {useNavigate} from "react-router";

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }

            const response = await fetch(url, {method, body, headers})
            const data = await response.json()

            if (!response.ok) {
               /* if (response.status===401) {
                    alert(data.message)
                   // navigate('/')
                   // throw new Error(data.message || 'Error useHttp')

                }*/
                throw new Error(data.message || 'Error useHttp')
            }
            setLoading(false)
            return data

        } catch (e) {

            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    const clearError = useCallback(() => setError(null),[])

    return {loading, request, error,clearError}
}