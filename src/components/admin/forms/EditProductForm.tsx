import styles from '../admin.module.css'
import { useForm, SubmitHandler } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import useGetCategories from '../../../hooks/useGetCategories'

type Inputs = {
    productName: string
    desc: string
    category: string
    count: number
    price: string
    image: FileList
}

type Product = {
    _id: string
    productName: string
    desc: string
    categoryId: string
    count: number
    price: number
    imageUrl: string
}

interface props {
    selectedProduct: Product
    handleClick: () => void
}

const EditProductForm = ({ selectedProduct, handleClick }: props) => {
    const { categories } = useGetCategories()
    const navigate = useNavigate()
    const {
        register,
        reset,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const mainImage = data.image

        const formData = new FormData()
        formData.append('id', selectedProduct._id)
        formData.append('productName', data.productName)
        formData.append('desc', data.desc)
        formData.append('categoryId', data.category)
        formData.append('count', data.count.toString())
        formData.append('price', data.price)
        if (mainImage[0]) {
            formData.append('mainImage', mainImage[0])
        } else {
            formData.append('imageUrl', selectedProduct.imageUrl)
        }

        const sendPromise = axios
            .put('http://localhost:3000/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    reset()
                    navigate(-1)
                }
            })

        sendPromise.catch(() => {
            setError('root', { message: 'Something went wrong' })
        })

        toast.promise(sendPromise, {
            loading: 'Uploading',
            success: 'Success',
            error: 'Error while uploading',
        })
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='w-full flex flex-col gap-1 rounded-md p-2 border-gray-400 border shadow-md'
        >
            <h1>Edit product:</h1>
            <input
                {...register('productName', { required: 'Required' })}
                type='text'
                id='productName'
                placeholder={selectedProduct.productName}
                defaultValue={selectedProduct.productName}
                className={`${styles.addProdInput} text-3xl font-bold`}
            />
            {errors.productName && (
                <p className={styles.error}>{errors.productName.message}</p>
            )}

            <textarea
                {...register('desc', { required: 'Required' })}
                id='description'
                placeholder={selectedProduct.desc}
                defaultValue={selectedProduct.desc}
                className={styles.addProdInput}
            />

            {errors.count && (
                <p className={styles.error}>{errors.count.message}</p>
            )}

            <div>
                <label htmlFor='category'>Category</label>
                <select
                    {...register('category')}
                    id='category'
                    className={styles.addProdInput}
                >
                    {categories?.map((category) => (
                        <option
                            selected={
                                category._id === selectedProduct.categoryId
                                    ? true
                                    : false
                            }
                            key={category._id}
                            value={category._id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className='flex gap-1 items-baseline'>
                <label htmlFor='price'>Price:</label>
                <input
                    {...register('price', {
                        required: 'Insert price',
                        pattern: {
                            value: /^[0-9]+$/,
                            message: 'Insert a number',
                        },
                    })}
                    id='price'
                    type='text'
                    placeholder={selectedProduct.price.toString()}
                    defaultValue={selectedProduct.price.toString()}
                    className={`${styles.addProdInput} w-24`}
                />
            </div>
            {errors.price && (
                <p className={styles.error}>{errors.price.message}</p>
            )}

            <div className='flex gap-1 items-baseline'>
                <label htmlFor='count'>Count:</label>
                <input
                    {...register('count', {
                        required: 'Insert count',
                        valueAsNumber: true,
                        min: 0,
                        max: 10,
                    })}
                    id='count'
                    type='number'
                    min={1}
                    max={10}
                    defaultValue={selectedProduct.count}
                    placeholder='Count'
                    className={`${styles.addProdInput} w-20`}
                />
            </div>
            {errors.count && (
                <p className={styles.error}>{errors.count.message}</p>
            )}

            <div className='flex gap-1 items-baseline'>
                <label htmlFor='image'>Image:</label>

                <input
                    {...register('image')}
                    id='image'
                    type='file'
                    className={styles.addProdInput}
                />
            </div>

            {errors.image && (
                <p className={styles.error}>{errors.image.message}</p>
            )}
            {errors.root && (
                <p className={styles.error}>{errors.root.message}</p>
            )}

            <div className='flex justify-end gap-2 mt-2'>
                <button
                    className='bg-red-500 hover:bg-red-400'
                    onClick={handleClick}
                >
                    Close
                </button>
                <button className={styles.button} type='submit'>
                    Submit
                </button>
            </div>
        </form>
    )
}

export default EditProductForm
