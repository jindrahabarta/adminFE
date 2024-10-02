import { useEffect, useState } from 'react'
import AddCategoryForm from './forms/AddCategoryForm'
import EditHandlers from './ui/EditHandlers'
import axios from 'axios'
import toast from 'react-hot-toast'
import UpdateCategoryForm from './forms/UpdateCategoryForm'

type Category = {
    _id: string
    name: string
}

//TODO: dodelat edit
const CategoriesManager = () => {
    const [categories, setCategories] = useState<Category[]>()
    const [selectedCategory, setSelectedCategory] = useState<Category>()
    const [loading, setLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        axios
            .get('http://localhost:3000/categories')
            .then((res) => {
                setCategories(res.data)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    const deleteCategory: React.MouseEventHandler<HTMLButtonElement> = (id) => {
        const deletePromise = axios
            .delete(`http://localhost:3000/categories/${id}`)
            .then((res) => {
                const newCategories = categories?.filter((category) => {
                    return category._id !== res.data._id
                })
                setCategories(newCategories)
            })

        toast.promise(deletePromise, {
            loading: 'Deleting',
            success: 'Successfuly deleted',
            error: 'Something went wrong',
        })
    }

    const updateCategory = (id: string) => {
        setIsEditing(true)
        setSelectedCategory(
            categories?.find((category) => {
                return category._id === id
            })
        )
    }

    return (
        <section>
            {isEditing ? (
                <UpdateCategoryForm
                    handleCloseForm={() => setIsEditing(false)}
                    selectedCategory={selectedCategory}
                    passCategories={(updatedCategory) => {
                        const newCategories = categories?.map((category) => {
                            return category._id === updatedCategory._id
                                ? updatedCategory
                                : category
                        })

                        setCategories(newCategories)
                        setIsEditing(false)
                    }}
                />
            ) : (
                <AddCategoryForm
                    passCategories={(category) => {
                        setCategories([...categories, category])
                    }}
                />
            )}

            <div className='mt-4 flex flex-col gap-2'>
                {loading && <p className='text-center'>Loading...</p>}
                {categories && categories.length > 0 ? (
                    categories.map((category) => (
                        <div
                            key={category._id}
                            className='hover:shadow-none hover:border-black duration-200 px-2 py-2 border border-gray-400 shadow-sm rounded-md flex items-center justify-between'
                        >
                            <p className='w-full line-clamp-1 text-ellipsis overflow-hidden'>
                                {category.name}
                            </p>
                            <EditHandlers
                                handleClick={() => updateCategory(category._id)}
                                handleDelete={() =>
                                    deleteCategory(category._id)
                                }
                            />
                        </div>
                    ))
                ) : (
                    <p className='text-center'>Nothin` here</p>
                )}
            </div>
        </section>
    )
}

export default CategoriesManager
