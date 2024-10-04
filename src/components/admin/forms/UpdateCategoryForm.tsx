import { useForm, SubmitHandler } from 'react-hook-form'
import styles from '../admin.module.css'
import axios from 'axios'
import toast from 'react-hot-toast'

type Inputs = {
    category: string
}
type Category = {
    _id: string
    name: string
}

const UpdateCategoryForm = ({
    passCategories,
    selectedCategory,
    handleCloseForm,
}: {
    passCategories: (category: Category) => void
    selectedCategory: Category
    handleCloseForm: () => void
}) => {
    const {
        register,
        reset,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        if (selectedCategory.name === data.category) {
            return setError('root', {
                message: 'Category has same value as before',
            })
        }

        const postPromise = axios
            .put(
                `https://adminbe.onrender.com/categories/${selectedCategory._id}`,
                data
            )
            .then((res) => {
                passCategories(res.data)
                reset()
            })

        postPromise.catch((err) => {
            if (err.status === 401) {
                setError('root', { message: 'This category exists' })
            } else {
                setError('root', { message: 'Something went wrong' })
            }
        })

        toast.promise(postPromise, {
            loading: 'Uploading',
            success: 'Successfuly uploaded',
            error: 'Something went wrong',
        })
    }

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex items-center gap-1'
            >
                <input
                    {...register('category', {
                        required: 'Pole je povinné',
                    })}
                    type='text'
                    id='category'
                    placeholder={selectedCategory.name}
                    defaultValue={selectedCategory.name}
                    className={styles.addProdInput}
                />

                <button
                    type='submit'
                    className='bg-green-500 hover:bg-green-400'
                >
                    Update category
                </button>
                <button
                    onClick={handleCloseForm}
                    className='bg-red-500 hover:bg-red-400'
                >
                    Close
                </button>
            </form>
            <div>
                {errors.category && (
                    <p className={styles.error}>{errors.category.message}</p>
                )}
                {errors.root && (
                    <p className={styles.error}>{errors.root.message}</p>
                )}
            </div>
        </>
    )
}

export default UpdateCategoryForm
