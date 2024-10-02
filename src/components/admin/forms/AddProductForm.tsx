import styles from '../admin.module.css'
import { useForm, SubmitHandler } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import useGetCategories from '../../../hooks/useGetCategories'

type Inputs = {
    productName: string
    desc: string
    category: string
    count: number
    price: number
    image: FileList
}

const AddProductForm = () => {
    const { categories, loading, isError } = useGetCategories()

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

        formData.append('productName', data.productName)
        formData.append('desc', data.desc)
        formData.append('category', data.category)
        formData.append('count', data.count.toString())
        formData.append('price', data.price.toString())
        formData.append('mainImage', mainImage[0])

        const sendPromise = axios
            .post('http://localhost:3000/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(() => {
                reset()
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

    if (isError) {
        return <p className='text-center'>Something went wrong</p>
    }

    if (loading) {
        return <p className='text-center'>Loading...</p>
    }

    if (categories?.length === 0) {
        return (
            <div className='text-center'>
                <h1>First make categories</h1>
                <Link to='/admin/categories'>
                    <button className='bg-blue-500 hover:bg-blue-400 mt-2'>
                        Edit categories
                    </button>
                </Link>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.addProdForm}>
            <h1 className='mb-2'>Add product</h1>
            <label htmlFor='productName'>Product name</label>

            <input
                {...register('productName', {
                    required: 'Toto pole je povinné',
                })}
                type='text'
                id='productName'
                placeholder='Product name'
                className={styles.addProdInput}
            />

            {errors.productName && (
                <p className={styles.error}>{errors.productName.message}</p>
            )}
            <div className='mt-2'>
                <label htmlFor='description'>Description</label>
                <textarea
                    {...register('desc', {
                        required: 'Toto pole je povinné',
                    })}
                    id='description'
                    placeholder='Description'
                    className={styles.addProdInput}
                />
            </div>
            {errors.productName && (
                <p className={styles.error}>{errors.productName.message}</p>
            )}
            <div>
                <label htmlFor='category'>Category</label>
                <select
                    {...register('category')}
                    id='category'
                    className={styles.addProdInput}
                >
                    {categories?.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className='mt-2'>
                <label htmlFor='count'>Count</label>
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
                    defaultValue={1}
                    placeholder='Count'
                    className={styles.addProdInput}
                />
            </div>
            {errors.count && (
                <p className={styles.error}>{errors.count.message}</p>
            )}
            <div className='mt-2'>
                <label htmlFor='price'>Price</label>
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
                    placeholder='Price'
                    className={styles.addProdInput}
                />
            </div>
            {errors.price && (
                <p className={styles.error}>{errors.price.message}</p>
            )}
            <div className='mt-2'>
                <label htmlFor='image'>Image</label>

                <input
                    {...register('image', { required: 'Insert proudct image' })}
                    id='image'
                    type='file'
                    className={styles.addProdInput}
                />
            </div>
            {errors.image && (
                <p className={styles.error}>{errors.image.message}</p>
            )}

            <div className='flex justify-center mt-2'>
                <button className={styles.button} type='submit'>
                    Submit
                </button>
            </div>
            {errors.root && (
                <p className={styles.error}>{errors.root.message}</p>
            )}
        </form>
    )
}

export default AddProductForm
