'use client'
import React from 'react';
import { useHydrateAtoms } from 'jotai/utils';
import { mastersAtom, type Masters } from '@/atoms/queries/master';

type HydratorProps = {
    children: React.ReactNode;
    initial: Masters;
};

const MastersHydrator: React.FC<HydratorProps> = ({ children, initial }) => {
    useHydrateAtoms([[mastersAtom, initial]]);
    
    return <>{children}</>;
}

export default MastersHydrator;