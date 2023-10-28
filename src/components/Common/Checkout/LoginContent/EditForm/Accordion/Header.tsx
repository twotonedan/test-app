import { ExpandMoreRounded } from '@mui/icons-material';
import { Box, IconButton, Typography, styled } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Dispatch, SetStateAction } from 'react';
import { transientOptions } from '@/utils/transientOptions';

const StyledWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 14px 14px 8px;
  width: 100%;
  cursor: pointer;
`;

const StyledIconWrapper = styled(IconButton, transientOptions)<{ $isFormOpen: boolean }>`
  ${props => !props.$isFormOpen && 'transform: rotate(-90deg);'}
  transition: all ease-out 0.1s;
`;

const StyledInnerWrapper = styled(Box)`
  display: flex;
  column-gap: 8px;
`;

const StyledTypography = styled(Typography)`
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
`;

const StyledEditOutlinedIcon = styled(EditOutlinedIcon, transientOptions)<{ $isFormOpen: boolean }>`
  ${props => props.$isFormOpen && 'opacity: 0;'}
  transition: all ease-out 0.1s;
`;

type Props = {
  title: string;
  handleShowForm: Dispatch<SetStateAction<boolean>>;
  isFormOpen: boolean;
};

const Header = ({ title, handleShowForm, isFormOpen }: Props) => {
  return (
    <StyledWrapper onClick={() => handleShowForm(prevState => !prevState)}>
      <StyledInnerWrapper>
        <StyledIconWrapper $isFormOpen={isFormOpen}>
          <ExpandMoreRounded color='primary' />
        </StyledIconWrapper>
        <StyledTypography variant='h4'>{title}</StyledTypography>
      </StyledInnerWrapper>
      <StyledEditOutlinedIcon color='secondary' fontSize='small' $isFormOpen={isFormOpen} />
    </StyledWrapper>
  );
};

export default Header;
