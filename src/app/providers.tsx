'use client'
import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

interface ProvidersProps {
    children: React.ReactNode;
}

const queryClient = new QueryClient();

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

export default Providers;