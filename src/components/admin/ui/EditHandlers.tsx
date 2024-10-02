import { useState } from 'react'

const EditHandlers = ({
    handleClick,
    handleDelete,
}: {
    handleClick: () => void
    handleDelete: () => void
}) => {
    const [confirmOpened, setConfirmOpened] = useState(false)

    if (confirmOpened) {
        return (
            <div className='flex gap-2 items-center'>
                <button
                    onClick={handleDelete}
                    className='bg-green-500 hover:bg-green-400'
                >
                    Confirm
                </button>
                <button
                    onClick={() => setConfirmOpened(false)}
                    className='bg-orange-500 hover:bg-orange-400'
                >
                    Deny
                </button>
            </div>
        )
    }
    return (
        <div className='flex gap-2 items-center'>
            <button
                onClick={() => setConfirmOpened(true)}
                className='bg-red-500 hover:bg-red-400'
            >
                Delete
            </button>
            <button
                onClick={handleClick}
                className='bg-amber-500 hover:bg-amber-400'
            >
                Edit
            </button>
        </div>
    )
}

export default EditHandlers
