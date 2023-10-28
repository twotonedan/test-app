import CartRowItem from '@/components/Common/CartRowItem/CartRowItem';
import Upsell from '@/components/Common/Upsell/Upsell';
import { useCalculatePrice } from '@/hooks/contexts/useCalculatePrice';
import { useCurrentCartItem } from '@/hooks/contexts/useCurrentCartItem';
import useUpsellModal from '@/hooks/useUpsellModal';
import { AddOutlined } from '@mui/icons-material';
import { Box, Button, styled } from '@mui/material';
import { map } from 'lodash';
import { useTranslation } from 'next-i18next';
import theme from '@/theme/theme';

const StyledContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 16px;

  ${theme.breakpoints.up('lg')} {
    max-width: 867px;
  }
`;

const StyledCartItem = styled(CartRowItem)`
  padding: 8px 8px 16px;

  ${theme.breakpoints.up('md')} {
    padding: 16px;
  }

  ${theme.breakpoints.up('lg')} {
    padding: 20px 24px 20px;
  }

  .image {
    width: 104px;
    height: 104px;

    ${theme.breakpoints.up('lg')} {
      width: 128px;
      height: 128px;
    }
  }

  .inner-wrapper {
    padding: 0;
    row-gap: 12px;

    ${theme.breakpoints.up('lg')} {
      row-gap: 18px;
    }
  }

  .title {
    margin-top: 4px;
  }

  .content-wrapper {
    row-gap: 4px;
    padding: 0;
    align-self: flex-start;
  }

  .top-row {
    align-items: center;
    ${theme.breakpoints.up('md')} {
      align-items: baseline;
    }
    ${theme.breakpoints.up('lg')} {
      column-gap: 24px;
    }
  }

  .bottom-row {
    ${theme.breakpoints.up('lg')} {
      padding-top: 16px;
    }
  }
`;

const StyledButton = styled(Button)`
  padding: 10px 8px 10px 12px;
  border-radius: 0;
  border-bottom-left-radius: 16px;

  &.MuiButton-text {
    font-weight: 600;
  }
`;

type Props = {
  onClose: () => void;
};

const CardsSubcontainer = ({ onClose }: Props) => {
  const {
    $uniqueId,
    cartItem,
    handleAddItemQuantity,
    handleRemoveItemQuantity,
    handleAddAccessoryQuantity,
    handleRemoveAccessoryQuantity,
  } = useCurrentCartItem();
  const { prices } = useCalculatePrice();
  const { t } = useTranslation(['actions', 'common']);
  const items = prices.items[$uniqueId] ? [prices.items[$uniqueId]] : [];
  const { upsellId, handleOnClickConfirm } = useUpsellModal({});

  return (
    <>
      {map(items, item => (
        <StyledContainer key={item.$metadata.id}>
          <StyledCartItem
            $uniqueId={item.$uniqueId}
            cardId={item.$metadata.id}
            {...item.$metadata}
            bookingInformation={cartItem?.settings}
            quantity={item.$quantity}
            price={item.subTotal}
            handleAddClick={q => handleAddItemQuantity(item.$uniqueId, q)}
            handleRemoveClick={q => handleRemoveItemQuantity(item.$uniqueId, q)}
            showData
            onClose={onClose}
          />
          {map(item.accessories, accesory => (
            <StyledCartItem
              $uniqueId={item.$uniqueId}
              key={accesory.$metadata.id}
              parentQuantity={item.$quantity}
              parentTitle={item.$metadata.title}
              {...accesory.$metadata}
              isMandatory={!!accesory.$metadata.limits.min}
              image={accesory.$metadata.imagesDetail[0].src}
              quantity={accesory.$quantity}
              price={accesory.total}
              handleAddClick={q => handleAddAccessoryQuantity(accesory.$metadata.id, q)}
              handleRemoveClick={q => handleRemoveAccessoryQuantity(accesory.$metadata.id, q)}
              bookingInformation={cartItem?.settings}
              showData
            />
          ))}
          <Box>
            <StyledButton onClick={() => handleOnClickConfirm(item.$uniqueId)} startIcon={<AddOutlined />}>
              {t('addAccesories')}
            </StyledButton>
          </Box>

          <Upsell id={upsellId} defaultClose backText={t('common:cart')} />
        </StyledContainer>
      ))}
    </>
  );
};

export default CardsSubcontainer;
