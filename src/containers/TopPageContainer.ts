import { connect } from "react-redux";
import { Dispatch } from "redux";
import { TextInputActions } from "../actions";
import { TopPage } from "../components/TopPage";
import { AppState } from "../store";

export interface TopPageHandler {
    handleOnClick(): void
    handleOnChangeValue(value: string): void
}

const mapStateToProps = (appState: AppState) => {
    return {
        buttonIcon: appState.state.buttonIcon,
        inputString: appState.state.inputString
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        handleOnClick: () => { dispatch(TextInputActions.updateButtonIcon()) },
        handleOnChangeValue: (value: string) => { dispatch(TextInputActions.updateTextInputValue(value)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TopPage)