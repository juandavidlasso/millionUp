import { LoadingState } from './LoadingProvider';

type LoadingActionType = { type: '[Loading] - closeMenu' } | { type: '[Loading] - openMenu' };

export const loadingReducer = (state: LoadingState, action: LoadingActionType): LoadingState => {
    switch (action.type) {
        case '[Loading] - openMenu':
            return {
                ...state,
                isLoading: true
            };

        case '[Loading] - closeMenu':
            return {
                ...state,
                isLoading: false
            };

        default:
            return state;
    }
};
