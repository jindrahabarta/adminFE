import axios from 'axios'
import { useEffect, useState } from 'react'

type Category = {
    _id: string
    name: string
}

const useGetCategories = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [isError, setIsError] = useState()

    useEffect(() => {
        axios
            .get('https://adminbe.onrender.com/categories')
            .then((res) => {
                setCategories(res.data)
            })
            .catch((err) => {
                setIsError(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return { categories, loading, isError }
}

export default useGetCategories
