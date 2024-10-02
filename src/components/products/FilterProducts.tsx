import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

interface Category {
    _id: string
    name: string
}

const FilterProducts = ({ categories }: { categories: Category[] }) => {
    const [selectedCategory, setSelectedCategory] = useState('')
    //TODO: dodelat aby input byl nastaven spravne pri kroku zpet
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        const foundCategory = searchParams.get('category')

        if (!location.search) {
            return setSelectedCategory('all')
        }

        setSelectedCategory(foundCategory)
    }, [location.search])

    return (
        <div className='flex gap-2 justify-end'>
            <label htmlFor='categories'>Category:</label>

            <select
                defaultValue={'a91fc59c-dddc-4477-a062-474da9499406'}
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
        </div>
    )
}

export default FilterProducts
