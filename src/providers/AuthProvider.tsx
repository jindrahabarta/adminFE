import { createContext, ReactNode, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'

type authUser = {
    isVerified: boolean
    user: {
        username: string
        role: string
    }
}
interface AuthInterface {
    auth: authUser
    setAuth: (value: authUser) => void
}

export const AuthContext = createContext<AuthInterface>({
    auth: {
        isVerified: false,
        user: { username: '', role: '' },
    },
    setAuth: () => {},
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [auth, setAuth] = useState<authUser>({
        isVerified: false,
        user: {
            username: '',
            role: '',
        },
    })

    useEffect(() => {
        const actualToken = Cookies.get('auth')

        axios
            .post(
                'https://adminbe.onrender.com/auth/authorize',
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
                        role: res.data.role,
                    },
                })
            })
            .catch((err) => {
                if (err.status === 401) {
                    const refreshToken = Cookies.get('refreshToken')

                    if (!refreshToken) return

                    axios
                        .post('https://adminbe.onrender.com/auth/refresh', {
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
                                    role: res.data.role,
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
