import { FormControlLabel } from '@mui/material';
import Radio from '@mui/material/Radio';

type Props = {
  label?: string;
  value: string | number;
  size?: 'small' | 'medium' | undefined;
  disabled?: boolean;
  handleClick?: (e: React.MouseEvent<HTMLElement>) => void;
};

const RadioButton = ({ label, size, disabled, value, handleClick }: Props) => {
  return (
    <FormControlLabel
      disabled={disabled}
      value={value}
      label={label}
      control={<Radio value={value || 'defaultValue'} size={size} onClick={e => handleClick && handleClick(e)} />}
    />
  );
};

export default RadioButton;
