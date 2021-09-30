import React from "react";
import { TopPageHandler } from "../containers/TopPageContainer";
import { ShowState } from "./ShowState";
import { Header } from "./Header";
import { Input } from "./Input";

interface OwnProps {
  inputString: string;
  buttonIcon: string;
}

type Props = OwnProps & TopPageHandler;
export class TopPage extends React.Component<Props> {
  render() {
    return (
      <React.Fragment>
        <div className="top-page">
          <Header />
          <ShowState
            inputValue={this.props.inputString}
            clef={this.props.buttonIcon}
          />
          <Input
            buttonIcon={this.props.buttonIcon}
            inputValue={this.props.inputString}
            handleOnClick={this.props.handleOnClick}
            handleOnChangeValue={this.props.handleOnChangeValue}
          />
        </div>
      </React.Fragment>
    );
  }
}
