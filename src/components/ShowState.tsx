import React from "react";
import { FiveLines } from "./FiveLines";
import { Chord } from "./Chord";

interface OwnProps {
  inputValue: string;
  clef: string;
}

type Props = OwnProps;
export const ShowState: React.FC<Props> = (props) => {
  let clef = "";
  let clefClassName ="";
  if (props.clef === "𝄢") {
    clef = "𝄞";
    clefClassName = "clef g";
  } else {
    clef = "𝄢";
    clefClassName = "clef f";
  }

  return (
    <div className="staff">
      <div className={clefClassName}>{clef}</div>
      <FiveLines />
      <Chord chordName={props.inputValue} clef={clef} />
    </div>
  );
};
