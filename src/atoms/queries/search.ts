import axios from '@/lib/axios/public';
import { atomWithQuery } from 'jotai-tanstack-query';
import { searchQueryAtom } from '@/atoms/search';
import { SearchResponse } from '@/types/search';

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