import { FormEvent, useState } from 'react'
import { useFilter } from '../contexts/FilterContext'

interface Category {
    _id: string
    name: string
}

const FilterProducts = ({ categories }: { categories: Category[] }) => {
    const actualPhrase = useFilter((phrase) => phrase.phrase)
    const actualCategory = useFilter((id) => id.category)
    const [searchPhrase, setSearchPhrase] = useState(actualPhrase)

    const updatePhrase = useFilter((phrase) => phrase.updatePhrase)
    const updateCategory = useFilter((id) => id.updateCategory)

    const search = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        updatePhrase(searchPhrase)
    }

    return (
        <div className='mt-4'>
            <div className='flex justify-center gap-2'>
                <nav className='flex flex-wrap gap-2 justify-center pb-4'>
                    <button
                        className={`${
                            actualCategory === 'all'
                                ? 'bg-blue-500'
                                : 'bg-blue-400'
                        } hover:bg-blue-500`}
                        onClick={() => {
                            updateCategory('all')
                            updatePhrase('')
                            setSearchPhrase('')
                        }}
                    >
                        All
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category._id}
                            className={`${
                                actualCategory === category._id
                                    ? 'bg-blue-500'
                                    : 'bg-blue-400'
                            } hover:bg-blue-500`}
                            onClick={() => {
                                updateCategory(category._id)
                                updatePhrase('')
                                setSearchPhrase('')
                            }}
                        >
                            {category.name}
                        </button>
                    ))}
                </nav>
            </div>

            <form
                onSubmit={(e) => {
                    search(e)
                }}
                className='flex justify-center items-baseline gap-2'
            >
                <input
                    className='ml-1 px-1 py-1 gap-1 border-gray-300 border rounded-md shadow-sm duration-200 focus-within:border-black outline-none'
                    type='text'
                    name='search'
                    id='search'
                    onChange={(e) => setSearchPhrase(e.target.value)}
                    value={searchPhrase}
                />
                <button type='submit' className='bg-gray-400 hover:bg-gray-500'>
                    Search
                </button>
                <button
                    onClick={() => {
                        updatePhrase('')
                        updateCategory('all')
                        setSearchPhrase('')
                    }}
                    type='button'
                    className='bg-red-400 hover:bg-red-500'
                >
                    Reset
                </button>
            </form>
        </div>
    )
}

export default FilterProducts
