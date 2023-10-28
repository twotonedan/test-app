import Button from '@mui/material/Button';
import Link from 'next/link';

type DataProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
};

type ButtonProps = {
  onClick: () => void;
  dataProps: DataProps;
};

export const ButtonCellFormatter = (ButtonProps: ButtonProps) => {
  const { onClick, dataProps } = ButtonProps;
  const { value } = dataProps;
  return (
    <Button style={{ height: '25px' }} variant='outlined' onClick={onClick}>
      {value}
    </Button>
  );
};

type LinkProps = {
  url: string;
  dataProps: DataProps;
};

export const LinkCellFormatter = (linkProps: LinkProps) => {
  const { url, dataProps } = linkProps;
  const { value } = dataProps;
  return <Link href={url}>{value}</Link>;
};
