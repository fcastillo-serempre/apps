import { useDispatch } from 'react-redux';

import { AppDispatch } from '../root';

export const useAppDispatch: () => AppDispatch = useDispatch;
