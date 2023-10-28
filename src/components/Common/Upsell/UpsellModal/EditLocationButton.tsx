import { Box, IconButton, Typography, styled } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useTranslation } from 'next-i18next';
import { ILocation } from '@/types/accessories';

const StyledEditLocation = styled(Box)`
  display: flex;
  gap: 4px;
  border-radius: 16px;
  padding: 4px 8px;
  width: max-content;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  height: 40px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

const StyledIconButton = styled(IconButton)`
  &:hover {
    background: none;
  }
`;

type Props = {
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  className?: string;
  selectedLocation?: ILocation;
};

const EditLocationButton = ({ onClick, className, selectedLocation }: Props) => {
  const { t } = useTranslation('common');

  return (
    <StyledEditLocation onClick={e => onClick(e)} className={className}>
      <Typography variant='h4' fontWeight={600} color='primary'>
        {selectedLocation?.name || t('location.selectLocation')}
      </Typography>
      <StyledIconButton>
        <EditOutlinedIcon fontSize='small' color='secondary' />
      </StyledIconButton>
    </StyledEditLocation>
  );
};

export default EditLocationButton;
