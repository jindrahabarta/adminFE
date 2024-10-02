import React from 'react'

const UserIco = ({ className }: { className?: string }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            className={className}
        >
            <g strokeWidth={1.5}>
                <circle cx={12} cy={9} r={3} opacity={0.5} />
                <circle cx={12} cy={12} r={10} />
                <path
                    strokeLinecap='round'
                    d='M17.97 20c-.16-2.892-1.045-5-5.97-5s-5.81 2.108-5.97 5'
                    opacity={0.5}
                />
            </g>
        </svg>
    )
}

export default UserIco
