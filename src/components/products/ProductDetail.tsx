import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ArrowIco from '../icons/ArrowIco'

type Product = {
    _id: string
    productName: string
    desc: string
    categoryId: string
    count: number
    price: number
    imageUrl: string
}

const ProductDetail = () => {
    const [selectedProduct, setSelectedProduct] = useState<Product>()
    const params = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(`http://localhost:3000/products/${params.id}`).then((res) => {
            setSelectedProduct(res.data[0])
        })
    }, [])

    return (
        <section className='pt-12'>
            <div
                onClick={() => navigate(-1)}
                className='flex  items-center pl-1 mb-2 hover:pl-0 cursor-pointer duration-200 w-fit'
            >
                <ArrowIco className='rotate-180 w-6'></ArrowIco>
                <p className=' mb-1'>go back</p>
            </div>
            <div className='flex flex-col sm:flex-row  gap-4 '>
                <div className='w-full aspect-square overflow-hidden rounded-md'>
                    <img
                        className='w-full h-full object-cover'
                        src={selectedProduct?.imageUrl}
                        alt={selectedProduct?.productName}
                    />
                </div>
                <div className='w-full min-h-full flex flex-col justify-between'>
                    <div>
                        <h1>{selectedProduct?.productName}</h1>
                        <p>{selectedProduct?.desc}</p>
                    </div>
                    <div className='flex justify-between items-end'>
                        <div>
                            Count{' '}
                            <span className='font-bold'>
                                {selectedProduct?.count} ks
                            </span>
                        </div>
                        <div className='flex justify-end items-end gap-2'>
                            <p>
                                Price{' '}
                                <span className='font-bold'>
                                    {selectedProduct?.price} Kč
                                </span>
                            </p>
                            <button className='bg-blue-500 hover:bg-blue-600'>
                                Buy
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductDetail
