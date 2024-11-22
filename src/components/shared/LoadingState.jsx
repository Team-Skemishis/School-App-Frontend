import React from 'react'
import { InfinitySpin } from 'react-loader-spinner';

const LoadingState = () => {
    return (
        <div className='flex justify-center items-center h-screen bg-white dark:bg-gray-800'>
            <InfinitySpin
                visible={true}
                width="200"
                color="#254BAB"
                ariaLabel="infinity-spin-loading"
            />
        </div>
    )
}

export default LoadingState