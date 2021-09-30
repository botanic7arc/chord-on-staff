import { reducerWithInitialState } from '../node_modules/typescript-fsa-reducers';
import { TextInputActions } from './actions';

export interface State {
    inputString: string
    buttonIcon: string
}

export const initialState: State = {
    inputString: '',
    buttonIcon: '𝄢'
}

export const Reducer = reducerWithInitialState(initialState)
    .case(TextInputActions.updateTextInputValue, (state, inputString) => {
        return { ...state, inputString }
    })
    .case(TextInputActions.updateButtonIcon, (state) => {
        (state.buttonIcon === '𝄢') ? state.buttonIcon = '𝄞' : state.buttonIcon = '𝄢';
        return { ...state, clickCount: state.buttonIcon }
    })