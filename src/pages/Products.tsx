import { useEffect, useState } from 'react'
import FilterProducts from '../components/products/FilterProducts'
import ProductsTable from '../components/products/ProductsTable'
import useGetCategories from '../hooks/useGetCategories'
import useGetProducts from '../hooks/useGetProducts'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useFilter } from '../components/contexts/FilterContext'

type Product = {
    _id: string
    productName: string
    desc: string
    categoryId: string
    count: number
    price: number
    imageUrl: string
}

const Products = () => {
    const { products, loading: productsLoading, error } = useGetProducts()
    const { categories, loading: categoriesLoading } = useGetCategories()
    const [loading, setLoading] = useState(true)

    const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

    const searchPhrase = useFilter((phrase) => phrase.phrase)
    const searchCategory = useFilter((id) => id.category)

    useEffect(() => {
        if (!productsLoading && !categoriesLoading) {
            setFilteredProducts(products)
            setLoading(false)
        }
    }, [productsLoading, categoriesLoading, products])

    useEffect(() => {
        const promise = axios
            .get(`https://adminbe.onrender.com/products/search`, {
                params: {
                    category:
                        searchCategory === 'all' ? undefined : searchCategory,
                    phrase: searchPhrase,
                },
            })
            .then((res) => {
                if (res.status === 204) {
                    toast('Nothing found', {
                        icon: '😔',
                    })
                    setFilteredProducts([])
                } else {
                    setFilteredProducts(res.data)
                }
            })

        toast.promise(promise, {
            loading: 'Searching',
            success: 'Found',
            error: 'Something went wrong',
        })
    }, [searchPhrase, searchCategory])

    return (
        <section>
            <h1 className='text-center'>Products</h1>

            {loading ? (
                <p className='text-center'>Loading...</p>
            ) : error ? (
                <p className='text-center'>Some error has occured</p>
            ) : (
                <div>
                    <FilterProducts categories={categories} />
                    <ProductsTable products={filteredProducts}></ProductsTable>
                </div>
            )}
        </section>
    )
}

export default Products
