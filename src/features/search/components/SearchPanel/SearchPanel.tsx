import React from 'react';
import QueryBuilderPanel from '../QueryBuilder/QueryBuilderPanel';
import SearchFooter from './SearchFooter';

const SearchPanel: React.FC = () => {
    
    return (
        <div>
            <QueryBuilderPanel />
            <SearchFooter />
        </div>
    );
}

export default SearchPanel;