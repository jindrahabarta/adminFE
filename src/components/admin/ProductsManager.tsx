import { Link } from 'react-router-dom'
import ArrowIco from '../icons/ArrowIco'
import useGetProducts from '../../hooks/useGetProducts'
import useGetCategories from '../../hooks/useGetCategories'

const ProductsManager = () => {
    const { loading, products } = useGetProducts()
    const { categories } = useGetCategories()

    return (
        <section className='w-full'>
            <div className='flex flex-col gap-2 '>
                {loading ? (
                    <p>Loading...</p>
                ) : products.length > 0 ? (
                    products.map((product) => (
                        <Link
                            key={product._id}
                            to={product._id}
                            className='group/singleProduct hover:shadow-none hover:border-black duration-200 px-2 py-2 border border-gray-400 shadow-sm rounded-md flex justify-between'
                        >
                            <p className='w-full text-ellipsis overflow-hidden'>
                                {product.productName}{' '}
                                <span className='text-gray-500'>
                                    {`(${
                                        categories?.find((category) => {
                                            return (
                                                category._id ===
                                                product.categoryId
                                            )
                                        })?.name
                                    })`}
                                </span>
                            </p>

                            <ArrowIco className='w-6 mr-1 group-hover/singleProduct:mr-0 duration-200'></ArrowIco>
                        </Link>
                    ))
                ) : (
                    <p>Nothin` here :P</p>
                )}
            </div>
        </section>
    )
}

export default ProductsManager
