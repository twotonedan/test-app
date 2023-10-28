import { Typography, styled } from '@mui/material';
import Link from 'next/link';

const StyledLink = styled(Link)`
  text-decoration: none;
`;
type Props = {
  link: string;
  title: string;
};

const ItemLink = ({ link, title }: Props) => {
  return (
    <StyledLink href={link}>
      <Typography variant='label' fontWeight={500}>
        {title}
      </Typography>
    </StyledLink>
  );
};

export default ItemLink;
