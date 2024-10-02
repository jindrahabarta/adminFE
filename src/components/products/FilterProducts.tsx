import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

interface Category {
    _id: string
    name: string
}

const FilterProducts = ({ categories }: { categories: Category[] }) => {
    const [searchPhrase, setSearchPhrase] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<
        string | undefined
    >('')

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        const foundCategory = searchParams.get('category')

        if (!location.search) {
            return setSelectedCategory('all')
        }

        const categoryId = categories.find((category) => {
            return category.name === foundCategory
        })?._id

        setSelectedCategory(categoryId ? categoryId : 'all')
    }, [location.search, categories])

    const search: React.MouseEventHandler<HTMLButtonElement> = () => {
        if (!searchPhrase) return

        navigate(`?searchPhrase=${searchPhrase}`)
    }

    return (
        <div className='flex flex-col sm:flex-row gap-2 justify-end items-baseline mt-4'>
            <label htmlFor='search'>Search:</label>
            <input
                className='ml-1 px-1 py-1 gap-1 border-gray-300 border rounded-md shadow-sm duration-200 focus-within:border-black outline-none'
                type='text'
                name='search'
                id='search'
                onChange={(e) => setSearchPhrase(e.target.value)}
            />
            <button onClick={search} className='bg-gray-400 hover:bg-gray-500'>
                Search
            </button>

            <label htmlFor='categories'>Category:</label>

            {selectedCategory && (
                <select
                    defaultValue={selectedCategory ? selectedCategory : 'all'}
                    onChange={(e) =>
                        navigate(
                            `?category=${
                                e.target.value === 'all'
                                    ? 'all'
                                    : categories?.find((category) => {
                                          return category._id === e.target.value
                                      })?.name
                            }`
                        )
                    }
                    id='category'
                >
                    <option value='all'>All</option>
                    {categories?.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            )}
        </div>
    )
}

export default FilterProducts
