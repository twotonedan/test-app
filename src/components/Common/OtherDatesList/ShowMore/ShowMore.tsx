import { Box, Button, styled } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { IDateRangeCalendarInfo } from '@/types/common';
import DrawerOrModal from '@/components/Common/DrawerOrModal';

import AvailableDatesDrawer from './AvailableDatesDrawer';

const StyledTextButton = styled(Button)`
  padding: 6px 8px;
  width: fit-content;
`;

type Props = {
  formBaseName: string;
  isSingleDate: boolean;
  calendarInfo: IDateRangeCalendarInfo;
};

const ShowMore = ({ formBaseName, isSingleDate, calendarInfo }: Props) => {
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const closeDrawer = () => setIsOpenDrawer(false);
  const { t } = useTranslation('actions');

  return (
    <Box>
      <StyledTextButton onClick={() => setIsOpenDrawer(true)}>{t('showMore')}</StyledTextButton>
      <DrawerOrModal isOpen={isOpenDrawer} onClose={closeDrawer}>
        <AvailableDatesDrawer
          onClose={closeDrawer}
          formBaseName={formBaseName}
          isSingleDate={isSingleDate}
          calendarInfo={calendarInfo}
        />
      </DrawerOrModal>
    </Box>
  );
};

export default ShowMore;
