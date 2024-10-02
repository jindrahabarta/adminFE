import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { useLocation } from 'react-router-dom'

type Product = {
    _id: string
    productName: string
    desc: string
    categoryId: string
    count: number
    price: number
    imageUrl: string
}

interface Category {
    _id: string
    name: string
}

const ProductsTable = ({
    categories,
    products,
}: {
    categories: Category[]
    products: Product[]
}) => {
    const [filteredProducts, setFilteredProducts] =
        useState<Product[]>(products)

    const location = useLocation()

    useEffect(() => {
        console.log('searching')

        const searchParams = new URLSearchParams(location.search)
        const foundCategory = searchParams.get('category')

        const foundPhrase = searchParams.get('searchPhrase')

        if (foundPhrase) {
            const foundProducts = products.filter((product) => {
                if (
                    product.productName
                        .toLocaleLowerCase()
                        .includes(foundPhrase)
                ) {
                    return product
                }
            })

            setFilteredProducts(foundProducts)
        } else {
            if (!location.search || foundCategory === 'all') {
                return setFilteredProducts(products)
            }

            const selectedCategory = categories?.find((category) => {
                return category.name === foundCategory
            })?._id

            setFilteredProducts(
                products.filter((prod) => {
                    return prod.categoryId === selectedCategory
                })
            )
        }
    }, [location.search, categories, products])

    return (
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4'>
            {filteredProducts.length > 0 ? (
                filteredProducts?.map((product) => (
                    <React.Fragment key={product._id}>
                        <ProductCard {...product}></ProductCard>
                    </React.Fragment>
                ))
            ) : (
                <p>Nothin` here</p>
            )}
        </div>
    )
}

export default ProductsTable
