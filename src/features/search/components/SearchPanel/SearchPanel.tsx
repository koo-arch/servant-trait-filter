import React from 'react';
import MastersHydrator from '@/features/search/providers/MastersHydrator';
import QueryBuilderPanel from '../QueryBuilder/QueryBuilderPanel';
import SearchFooter from './SearchFooter';
import { fetchMasters } from '@/features/search/lib/fetcher';

const SearchPanel: React.FC = async() => {
    const masters = await fetchMasters();
    
    return (
        <div>
            <MastersHydrator initial={masters}>
                <QueryBuilderPanel />
            </MastersHydrator>
            <SearchFooter />
        </div>
    );
}

export default SearchPanel;