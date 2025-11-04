import React, { Suspense } from 'react';
import SearchPanel from './components/SearchPanel/SearchPanel';
import ServantResults from './components/ServantResults/ServantResults';
import MastersBoundary from './providers/MastersBoundary';

const SearchPage: React.FC = () => {
    return (
        <div>
            <div className="grid grid-cols-1 gap-4 p-4">
                <Suspense fallback={<div>Loading Search Panel...</div>}>
                    <MastersBoundary>
                        <SearchPanel />
                        <ServantResults />
                    </MastersBoundary>
                </Suspense>

            </div>
        </div>
    );
}

export default SearchPage;