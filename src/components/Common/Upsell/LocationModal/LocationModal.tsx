import { Fragment, ReactNode, useEffect, useState, useTransition } from 'react';
import useMuiDrawer from '@/hooks/components/useMuiDrawer';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Box, IconButton, Typography, styled, Divider, css, InputAdornment, Button } from '@mui/material';
import DrawerOrModal from '@/components/Common/DrawerOrModal';
import { CloseRounded } from '@mui/icons-material';
import theme from '@/theme/theme';
import { ILocation } from '@/types/accessories';
import { useTranslation } from 'next-i18next';
import Input from '@/components/Common/Input';
import { transientOptions } from '@/utils/transientOptions';
import SearchIcon from '@mui/icons-material/Search';
import useIsMobile from '@/hooks/useIsMobile';
import DummyDesktopHeader from '@/components/Sections/Common/Header/DummyDesktopHeader';
import { DrawerOrModalSelector } from '../../DrawerOrModal/DrawerOrModal';

const StyledDrawerOrModal = styled(DrawerOrModal, transientOptions)<{ $isDrawer: boolean }>`
  & > .MuiPaper-root {
    height: 100vh;
    border-radius: 16px 16px 0 0;
    overflow-y: scroll;

    .drawerOrModalWrapper {
      display: flex;
      flex-grow: 1;
    }

    ${({ $isDrawer }) =>
      $isDrawer &&
      css`
        border-radius: 0;
        ${theme.breakpoints.up('md')} {
          width: 372px;
          right: 0;
          border-radius: 0;
        }

        ${theme.breakpoints.up('lg')} {
          width: 421px;
        }
      `}
  }

  & > .MuiBox-root {
    height: 100%;
  }
`;

const StyledWrapper = styled(Box, transientOptions)<{ $isDrawer: boolean }>`
  background: ${theme.palette.customColors.white};
  width: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: column;

  ${({ $isDrawer }) =>
    $isDrawer
      ? css``
      : css`
          ${theme.breakpoints.up('md')} {
            position: initial;
            padding: 24px 24px 32px 24px;
            position: absolute;
            width: 605px;
            max-height: 730px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 16px;
          }

          ${theme.breakpoints.up('lg')} {
            width: 864px;
          }
        `}
`;

const StyledHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 24px;
  flex-shrink: 0;
`;

const StyledInput = styled(Input)`
  margin-bottom: 24px;
  width: 100%;

  & .MuiOutlinedInput-notchedOutline > legend {
    width: 130px;
  }
`;

const SearchWrapper = styled(Box)`
  display: flex;
  gap: 8px;
  justify-content: space-between;

  ${theme.breakpoints.down('md')} {
    padding-top: 24px;
  }
`;

const StyledSearchTitle = styled(Typography)`
  color: ${theme.palette.customText.secondary};
  margin-bottom: 22px;
`;

const StyledLocationsWrapper = styled(Box, transientOptions)<{ $isDrawer: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  overflow-y: scroll;

  ${theme.breakpoints.down('md')} {
    padding-bottom: 24px;
  }

  ${({ $isDrawer }) =>
    $isDrawer &&
    css`
      ${theme.breakpoints.up('md')} {
        padding-top: 0;
      }
      ${theme.breakpoints.up('lg')} {
        padding-top: 26px;
      }
    `}

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const StyledLocationNotFound = styled(Typography)`
  color: ${theme.palette.customText.secondary};
`;

const StyledDivider = styled(Divider)`
  margin-bottom: 22px;
`;

const StyledStickyWrapper = styled(Box, transientOptions)<{ $isDrawer: boolean }>`
  position: sticky;
  top: 0;
  background-color: ${theme.palette.customColors.white};
  z-index: 1;
  padding-top: 26px;
  ${theme.breakpoints.up('md')} {
    padding-top: 0;
  }

  ${({ $isDrawer }) =>
    $isDrawer &&
    css`
      ${theme.breakpoints.up('md')} {
        padding-top: 26px;
      }
      ${theme.breakpoints.up('lg')} {
        top: 26px;
        padding-top: 0;
      }
    `}
`;

type Props = {
  locations: ILocation[];
  selectedLocation?: ILocation;
  children: ({
    isSelected,
    location,
    handleOnClose,
  }: {
    isSelected: boolean;
    location: ILocation;
    handleOnClose: () => void;
  }) => ReactNode;
  forceDrawerOrModal?: DrawerOrModalSelector;
  className?: string;
  hasFooter?: boolean;
  onCloseModal?: () => void;
  footer?: ReactNode;
};

type QueryLocations = {
  query: string;
  list: ILocation[];
};

const LocationModal = NiceModal.create(
  ({ locations, selectedLocation, children, forceDrawerOrModal, className, onCloseModal, footer }: Props) => {
    const { t } = useTranslation('common');
    const modal = useModal();
    const { isOpen, handleOnClose } = useMuiDrawer(modal);
    const isMobile = useIsMobile();
    const [, startTransition] = useTransition();

    const [renderedLocations, setRenderedLocations] = useState<QueryLocations>({
      query: selectedLocation?.name || '',
      list: locations,
    });

    useEffect(() => {
      setRenderedLocations(prevState => ({ ...prevState, list: locations }));
    }, [locations]);

    const noLocationResult = renderedLocations.list.length === 0 && renderedLocations.query !== '';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setRenderedLocations(prev => ({ ...prev, query: e.target.value }));
      startTransition(() => {
        const results = locations.filter(location => {
          if (e.target.value === '') return locations;
          return location.name.toLowerCase().includes(e.target.value.toLowerCase());
        });
        setRenderedLocations(prev => ({ ...prev, list: results }));
      });
    };

    const handleCloseModal = () => {
      if (onCloseModal) {
        onCloseModal();
      } else {
        handleOnClose();
      }
    };

    const isDrawer = DrawerOrModalSelector.DRAWER === forceDrawerOrModal;

    return (
      <StyledDrawerOrModal
        className={className}
        isOpen={isOpen}
        onClose={handleCloseModal}
        anchor='right'
        $isDrawer={isDrawer}
        force={forceDrawerOrModal}>
        <StyledWrapper $isDrawer={isDrawer}>
          <StyledStickyWrapper $isDrawer={isDrawer}>
            {isDrawer && <DummyDesktopHeader />}
            {!isMobile && (
              <StyledHeader>
                <Typography variant='h2'>{t('selectDeliveryLocation')}</Typography>
                <IconButton onClick={handleCloseModal}>
                  <CloseRounded color='primary' />
                </IconButton>
              </StyledHeader>
            )}
            <SearchWrapper>
              <StyledInput
                name='searchLocation'
                label={
                  <Typography variant='h4' color={theme.palette.customText.secondary}>
                    {t('searchDeliveryLocation')}
                  </Typography>
                }
                onChange={handleChange}
                value={renderedLocations.query}
                type='search'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              {isMobile && (
                <Button onClick={handleCloseModal} variant='text'>
                  {t('cancel')}
                </Button>
              )}
            </SearchWrapper>

            <StyledDivider />
            {!noLocationResult && (
              <StyledSearchTitle variant='h4' fontWeight={500}>
                {t('searchResults')} ({renderedLocations.list.length})
              </StyledSearchTitle>
            )}
          </StyledStickyWrapper>
          <StyledLocationsWrapper $isDrawer={isDrawer}>
            {noLocationResult ? (
              <StyledLocationNotFound variant='h4' fontWeight={500}>
                {t('noLocationsFound')}
              </StyledLocationNotFound>
            ) : (
              renderedLocations.list.map(location => {
                const isSelected = location.id === selectedLocation?.id;
                return <Fragment key={location.id}>{children({ isSelected, location, handleOnClose })}</Fragment>;
              })
            )}
          </StyledLocationsWrapper>
          {footer}
        </StyledWrapper>
      </StyledDrawerOrModal>
    );
  }
);

export default LocationModal;
