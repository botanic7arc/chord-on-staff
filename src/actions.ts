import { actionCreatorFactory } from '../node_modules/typescript-fsa';

const actionCreator = actionCreatorFactory()

export const TextInputActions = {
    updateButtonIcon: actionCreator('ACTION_UPDATE_BUTTON_ICON'),
    updateTextInputValue: actionCreator<string>('ACTIONS_UPDATE_TEXT_INPUT_VALUE')
}