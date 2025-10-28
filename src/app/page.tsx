import React from 'react';
import SearchPage from '@/features/search/SearchPage';

const HomePage: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
            <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
                <SearchPage />
            </div>
        </div>
    );
}

export default HomePage;