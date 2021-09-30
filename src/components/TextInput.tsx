import React from "react";

interface OwnProps {
  title: string;
  inputValue: string;
  onChangeValue: Function;
}

type Props = OwnProps;

export const TextInput: React.FC<Props> = (props) => {
  return (
    <div>
      <span>{props.title}</span>
      <input
        name={props.title}
        type="text"
        value={props.inputValue}
        onChange={(e) => props.onChangeValue(e.target.value)}
        autoFocus
        spellCheck="false"
      ></input>
    </div>
  );
};
