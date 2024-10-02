import FilterProducts from '../components/products/FilterProducts'
import ProductsTable from '../components/products/ProductsTable'
import useGetCategories from '../hooks/useGetCategories'
import useGetProducts from '../hooks/useGetProducts'

const Products = () => {
    const { loading, products } = useGetProducts()
    const { categories, loading: categoriesLoading } = useGetCategories()

    if (loading || categoriesLoading) {
        return <h1 className='text-center pt-12'>Loading...</h1>
    }

    return (
        <section className='pt-12'>
            <h1 className='text-center'>Products</h1>
            <FilterProducts categories={categories} />

            <ProductsTable
                categories={categories}
                products={products}
            ></ProductsTable>
        </section>
    )
}

export default Products
