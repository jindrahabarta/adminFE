import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import EditHandlers from './ui/EditHandlers'
import ArrowIco from '../icons/ArrowIco'
import EditProductForm from './forms/EditProductForm'
import toast from 'react-hot-toast'
import useGetCategories from '../../hooks/useGetCategories'

type Product = {
    _id: string
    productName: string
    desc: string
    categoryId: string
    count: number
    price: number
    imageUrl: string
}

const ProductsManagerDetail = () => {
    const { categories } = useGetCategories()
    const [selectedProduct, setSelectedProduct] = useState<Product>()
    const [editFormOpened, seteditFormOpened] = useState(false)
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        axios.get(`http://localhost:3000/products/${params.id}`).then((res) => {
            setSelectedProduct(res.data[0])
        })
    }, [params.id])

    const deleteProduct = () => {
        const deletePromise = axios
            .delete(`http://localhost:3000/products/${params.id}`)
            .then(() => {
                navigate('/admin/products')
            })

        toast.promise(deletePromise, {
            loading: 'Deleting',
            success: 'Product deleted',
            error: 'Error while deleting',
        })

        deletePromise.catch((err) => {
            console.log(err)
        })
    }

    if (editFormOpened && selectedProduct) {
        return (
            <EditProductForm
                selectedProduct={selectedProduct}
                handleClick={() => seteditFormOpened(false)}
            ></EditProductForm>
        )
    }

    return (
        <section className='w-full rounded-md p-2 border-gray-400 border shadow-md'>
            <h1 className='overflow-hidden text-ellipsis line-clamp-2 break-all'>
                {' '}
                {selectedProduct?.productName}
            </h1>
            <p>{selectedProduct?.desc}</p>
            <p>
                Category:{' '}
                <span className='font-bold'>
                    {' '}
                    {
                        categories?.find((category) => {
                            return category._id === selectedProduct?.categoryId
                        })?.name
                    }
                </span>
            </p>
            <p>
                Price:{' '}
                <span className='font-bold'>{selectedProduct?.price} Kč</span>
            </p>
            <p>
                Count:{' '}
                <span className='font-bold'>{selectedProduct?.count} pcs</span>
            </p>

            <div className='aspect-square overflow-hidden rounded-md'>
                <img
                    className='w-full h-full object-cover'
                    src={selectedProduct?.imageUrl}
                    alt={selectedProduct?.productName}
                />
            </div>
            <div className='flex justify-between gap-2 mt-2'>
                <div
                    onClick={() => navigate(-1)}
                    className='flex items-center pl-1 hover:pl-0 cursor-pointer duration-200'
                >
                    <ArrowIco className='rotate-180 w-6 '></ArrowIco>
                    <p className=' mb-1'>go back</p>
                </div>
                <EditHandlers
                    handleClick={() => seteditFormOpened(true)}
                    handleDelete={deleteProduct}
                ></EditHandlers>
            </div>
        </section>
    )
}

export default ProductsManagerDetail
