import axios from '@/lib/axios/public';
import { atomWithQuery } from 'jotai-tanstack-query';
import { searchQueryAtom } from './selectors';
import type { SearchResponse } from '@/features/search/types';

export const searchAtom = atomWithQuery(
    (get) => {
        const body = get(searchQueryAtom);
        return {
            queryKey: ['search', JSON.stringify(body)],
            queryFn: async () => {
                const { data } = await axios.post<SearchResponse>('/servants/search', body);
                return data;
            },
            staleTime: 30_000, // 30 seconds
        }
    }
);