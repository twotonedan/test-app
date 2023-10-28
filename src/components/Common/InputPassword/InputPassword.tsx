import { IconButton } from '@mui/material';
import { useState, MouseEvent } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Input from '../Input/Input';

type Props = {
  name: string;
  label: string;
  disabled?: boolean;
  validateFields?: string | string[];
};

const InputPassword = ({ name, label, disabled = false, validateFields }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(show => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => event.preventDefault();

  return (
    <Input
      name={name}
      disabled={disabled}
      fullWidth
      label={label}
      type={showPassword ? 'text' : 'password'}
      validateFields={validateFields}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default InputPassword;
