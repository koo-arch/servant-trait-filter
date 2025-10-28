'use client';
import React from 'react';
import { useAtom } from 'jotai';
import { commitSearchAtom } from '@/features/search/atoms/selectors';
import { Button } from '@/components/ui/button';

const SearchFooter: React.FC = () => {
    const [, commit] = useAtom(commitSearchAtom);

    return (
        <div className="flex items-center gap-3">
            <Button className="ml-auto" onClick={() => commit()}>検索</Button>
        </div>
    );
}

export default SearchFooter;