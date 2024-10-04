import React from 'react'
import ProductCard from './ProductCard'

type Product = {
    _id: string
    productName: string
    desc: string
    categoryId: string
    count: number
    price: number
    imageUrl: string
}

const ProductsTable = ({ products }: { products: Product[] }) => {
    if (products.length === 0) {
        return <p className='text-center'>Nothin` here</p>
    }

    return (
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4'>
            {products?.map((product) => (
                <React.Fragment key={product._id}>
                    <ProductCard {...product}></ProductCard>
                </React.Fragment>
            ))}
        </div>
    )
}

export default ProductsTable
