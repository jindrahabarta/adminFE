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

    useEffect(() => {
        axios
            .get('http://localhost:3000/products')
            .then((res) => {
                setProducts(res.data)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return { products, loading }
}

export default useGetProducts
