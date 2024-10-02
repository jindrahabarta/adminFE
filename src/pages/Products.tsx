import { useEffect, useState } from 'react'
import FilterProducts from '../components/products/FilterProducts'
import ProductsTable from '../components/products/ProductsTable'
import useGetCategories from '../hooks/useGetCategories'
import useGetProducts from '../hooks/useGetProducts'

const Products = () => {
    const { products, loading: productsLoading, error } = useGetProducts()
    const { categories, loading: categoriesLoading } = useGetCategories()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!productsLoading && !categoriesLoading) setLoading(false)
    }, [productsLoading, categoriesLoading])

    return (
        <section className='pt-12'>
            <h1 className='text-center'>Products</h1>

            {loading ? (
                <p className='text-center'>Loading...</p>
            ) : error ? (
                <p className='text-center'>Some error has occured</p>
            ) : (
                <div>
                    <FilterProducts categories={categories} />
                    <ProductsTable
                        categories={categories}
                        products={products}
                    ></ProductsTable>
                </div>
            )}
        </section>
    )
}

export default Products
