import { createContext } from 'react';

interface ContextProps {
    isLoading: boolean;
    openLoading: () => void;
    closeLoading: () => void;
}

export const LoadingContext = createContext({} as ContextProps);
