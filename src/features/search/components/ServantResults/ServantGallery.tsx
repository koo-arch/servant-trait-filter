'use client'
import React from 'react';
import Image from 'next/image';
import { useSearchServants } from '../../hooks/useSearchServants';

const ServantGallery: React.FC = () => {
    const { servants, isLoading, error } = useSearchServants();

    if (isLoading) return <div>loading...</div>
    if (error) return <div>{error.message}</div>

    return (
        <div className='flex flex-wrap gap-4 p-4 bg-white rounded shadow'>
            {servants?.items.map(servant => (
                <div key={servant.id}>
                    <Image src={servant.face} alt={servant.name} width={50} height={50} />
                </div>
            ))}
        </div>
    )
}

export default ServantGallery;