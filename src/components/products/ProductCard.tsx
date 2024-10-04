import { Link } from 'react-router-dom'

interface Props {
    _id: string
    productName: string
    desc: string
    count: number
    price: number
    imageUrl: string
}

const ProductCard = (props: Props) => {
    return (
        <Link
            to={props._id}
            className='group/product flex flex-col bg-gray-100 p-2 rounded-md shadow-md border-2 border-gray-200 hover:shadow-sm duration-200'
        >
            <div className='aspect-square h-full rounded-md overflow-hidden'>
                <img
                    className='h-full w-full group-hover/product:scale-105 duration-200 object-cover'
                    src={props.imageUrl}
                    alt={props.productName}
                />
            </div>

            <div className=' h-full flex flex-col justify-between'>
                <div>
                    <h1 className='text-xl font-bold text-ellipsis line-clamp-2 break-all overflow-hidden w-full'>
                        {props.productName}
                    </h1>
                    <p className='break-all line-clamp-4 min-h-24'>
                        {props.desc}
                    </p>
                </div>
                <div className='flex justify-between items-end mt-4'>
                    <p className='font-bold line-clamp-1'>{props.price} CZK</p>
                    <button className='bg-blue-500 px-6 py-1 text-white rounded-md hover:bg-blue-600 duration-200'>
                        Buy
                    </button>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard
