import axios from "@/lib/axios/public";
import { atomWithQuery } from "jotai-tanstack-query";
import { Servant } from '@/types/servant';

export const servantAtom = atomWithQuery(
    () => ({
        queryKey: ['servants'],
        queryFn: async () => {
            const { data } = await axios.get<Servant[]>('/servants');
            return data;
        }
    })
);