import { createSelectorHook } from 'react-redux';
import { LocalContext } from './LocalProvider';

const useLocalSelector = createSelectorHook(LocalContext);

export default useLocalSelector;
