'use client'
import React from 'react';
import { useAtom } from 'jotai';
import { isGroupedAtom } from '@/features/search/atoms/result';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const ResultsModeSwitch: React.FC = () => {
    const [isGrouped, setIsGrouped] = useAtom(isGroupedAtom);
    const id = React.useId();

    return (
        <div className='flex items-center gap-2'>
            <Switch
                id={id}
                checked={isGrouped}
                onCheckedChange={setIsGrouped}
            />
            <Label htmlFor={id}>クラス別</Label>
        </div>
    );
};

export default ResultsModeSwitch;