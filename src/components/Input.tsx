import { Button } from "./Button";
import { TextInput } from "./TextInput";

export const Input = ({
  buttonIcon,
  inputValue,
  handleOnClick,
  handleOnChangeValue,
}: {
  buttonIcon: string;
  inputValue: string;
  handleOnClick: () => void;
  handleOnChangeValue: (artg0:string) => void;
}) => {
  return (
    <div className="input">
      <Button title={buttonIcon} onClick={handleOnClick} />
      <div className="text-form">
        <TextInput
          title=""
          inputValue={inputValue}
          onChangeValue={handleOnChangeValue}
        />
      </div>
    </div>
  );
};
