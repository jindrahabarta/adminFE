import axios from 'axios'
import { useEffect, useState } from 'react'

type Product = {
    _id: string
    productName: string
    desc: string
    categoryId: string
    count: number
    price: number
    imageUrl: string
}

const useGetProducts = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()

    useEffect(() => {
        axios
            .get('https://adminbe.onrender.com/products')
            .then((res) => {
                setProducts(res.data)
            })
            .catch((err) => {
                setError(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return { products, loading, error }
}

export default useGetProducts
