import { useReducer } from 'react';
import React from 'react';
import { LoadingContext } from './LoadingContext';
import { loadingReducer } from './loadingReducer';

export interface LoadingState {
    isLoading: boolean;
}

const LOADING_INITIAL_STATE: LoadingState = {
    isLoading: false
};

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(loadingReducer, LOADING_INITIAL_STATE);

    const openLoading = () => {
        dispatch({ type: '[Loading] - openMenu' });
    };

    const closeLoading = () => {
        dispatch({ type: '[Loading] - closeMenu' });
    };

    return (
        <LoadingContext.Provider
            value={{
                isLoading: state.isLoading,
                openLoading,
                closeLoading
            }}
        >
            {children}
        </LoadingContext.Provider>
    );
};
