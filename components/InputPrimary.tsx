import { ChangeEvent, FC, FormEvent, MouseEvent, MouseEventHandler, useState } from "react";

type InputPrimaryProps = {
  PlaceholderText: string,
  CreateNew: (inputValue: string) => void
}

const InputPrimary: FC<InputPrimaryProps> = (props) => {

  const [ inputValue, setInputValue ] = useState('')

  const handleSubmit = (event: MouseEvent) => {
    event.preventDefault();
    props.CreateNew(inputValue)
  }

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="input-group mb-3">
      <input type="text" className="form-control" placeholder={props.PlaceholderText} value={inputValue} onChange={handleChange}/>
        <button className="btn btn-primary" type="button" id="basic-addon2" onClick={handleSubmit}>Create New</button>
    </div>
  )
}

export default InputPrimary