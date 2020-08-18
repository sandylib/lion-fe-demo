import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';

const Input = ({id, name, type, label, disabled, value, placeholder, onChange, autoFocus, errorMessage, error, ...rest}) => {
  const [values, setValues] = useState(value);
  const onHandleChange = (e) => {
    setValues(e.target.value);
    onChange(e.target.id, e.target.value)
  }

  useEffect(() => {
    setValues(value);
  }, [value]);
  
  return (
      <TextField
        value={values}
        type={type || 'text'}
        placeholder={placeholder}
        error={error}
        helperText={error ? errorMessage : ''}
        disabled={disabled}
        variant="outlined"
        fullWidth
        id={id}
        label={label}
        name={name}
        onChange={onHandleChange}
        autoComplete={name}
        autoFocus={autoFocus}
        {...rest}
        />
  )
}


export default Input;