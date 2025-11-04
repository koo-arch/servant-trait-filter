import React from 'react';
import MastersHydrator from './MastersHydrator';
import { fetchMasters } from '@/features/search/lib/fetcher';

type MastersBoundaryProps = {
    children: React.ReactNode;
};

const MastersBoundary: React.FC<MastersBoundaryProps> = async ({ children }) => {
    const masters = await fetchMasters();

    return (
        <MastersHydrator initial={masters}>
            {children}
        </MastersHydrator>
    );
}

export default MastersBoundary;