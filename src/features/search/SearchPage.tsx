import React from 'react';
import SearchPanel from './components/SearchPanel/SearchPanel';
import ServantResults from './components/ServantResults/ServantResults';

const SearchPage: React.FC = () => {
    return (
        <div>
            <div className="grid grid-cols-1 gap-4 p-4">
                <SearchPanel />
                <ServantResults />
            </div>
        </div>
    );
}

export default SearchPage;