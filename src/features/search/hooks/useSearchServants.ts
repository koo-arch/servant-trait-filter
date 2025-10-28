'use client'
import { useAtom } from 'jotai';
import { searchAtom } from '@/features/search/atoms/queries';

export const useSearchServants = () => {
    const [{data, isLoading, error}] = useAtom(searchAtom);

    return {
        servants: data,
        isLoading,
        error,
    }
}