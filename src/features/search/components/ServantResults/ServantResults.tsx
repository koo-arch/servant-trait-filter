'use client'
import React from 'react';
import { useAtomValue } from 'jotai';
import { isGroupedAtom } from '@/features/search/atoms/result';
import ResultsModeSwitch from './ResultsModeSwitch';
import ServantClassSections from './ServantClassSections';
import ServantGallery from './ServantGallery';

const ServantResults: React.FC = () => {
    const isGrouped = useAtomValue(isGroupedAtom);

    return (
        <div>
            <div className='flex justify-end mb-2'>
                <ResultsModeSwitch />
            </div>

            {isGrouped ? <ServantClassSections /> : <ServantGallery />}
        </div>
    );
}

export default ServantResults;