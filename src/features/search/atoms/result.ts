'use client'
import { atomWithStorage } from 'jotai/utils';

export const isGroupedAtom = atomWithStorage<boolean>(
    'servant:isGrouped',
    false
);