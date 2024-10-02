import { createContext, ReactNode, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'

type authUser = {
    isVerified: boolean
    user: {
        username: string
    }
}
interface AuthInterface {
    auth: authUser
    setAuth: (value: authUser) => void
}

export const AuthContext = createContext<AuthInterface>({
    auth: {
        isVerified: false,
        user: { username: '' },
    },
    setAuth: () => {},
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [auth, setAuth] = useState<authUser>({
        isVerified: false,
        user: {
            username: '',
        },
    })

    useEffect(() => {
        const actualToken = Cookies.get('auth')

        axios
            .post(
                'http://localhost:3000/auth/authorize',
                {},
                {
                    headers: {
                        authorization: 'Bearer ' + actualToken,
                    },
                }
            )
            .then((res) => {
                setAuth({
                    isVerified: true,
                    user: {
                        username: res.data.username,
                    },
                })
            })
            .catch((err) => {
                if (err.status === 401) {
                    const refreshToken = Cookies.get('refreshToken')

                    if (!refreshToken) return

                    axios
                        .post('http://localhost:3000/auth/refresh', {
                            refreshToken: refreshToken,
                        })
                        .then((res) => {
                            const newToken = res.data.newToken

                            Cookies.set('auth', newToken, {
                                expires: 1,
                                secure: true,
                            })

                            setAuth({
                                isVerified: true,
                                user: {
                                    username: res.data.username,
                                },
                            })
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                } else {
                    console.log('Došlo k chybě:', err)
                }
            })
    }, [])

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
