import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import { AppState, AppDispatch } from '../app/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
