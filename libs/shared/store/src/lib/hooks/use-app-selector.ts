import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { RootState } from '../root';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
