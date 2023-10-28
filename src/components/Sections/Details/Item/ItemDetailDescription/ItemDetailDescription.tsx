import theme from '@/theme/theme';
import { Box, Button, ButtonBase, Typography, styled } from '@mui/material';
import { useId, useMemo, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { ICardPayload, IDescription } from '@/types/cards';
import UpsellModal from '@/components/Common/Upsell/UpsellModal/UpsellModal';
import NiceModal from '@ebay/nice-modal-react';

const StyledWrapper = styled(Box)`
  ${theme.mixins.layout}
  display: flex;
  flex-direction: column;
  margin-top: 24px;
`;

const StyledTitle = styled(Typography)`
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  margin-bottom: 8px;
`;

const StyledTextWrapper = styled(Box)`
  line-height: 19px;
`;

const StyledParagraph = styled(Typography)`
  display: inline;
  margin-right: 4px;
`;

const StyledSeeAccessories = styled(Button)`
  margin-top: 24px;
  width: 100%;

  ${theme.breakpoints.up('md')} {
    width: max-content;
    min-width: 158px;
  }

  ${theme.breakpoints.up('lg')} {
    margin-top: 32px;
    min-width: 302px;
  }
`;

const StyledTextButton = styled(ButtonBase)`
  ${theme.mixins.resetButton}
  margin-top: -3px;
`;

const StyledButtonLabel = styled(Typography)`
  font-weight: 500;
  color: ${theme.palette.primary.main};
  white-space: nowrap;
  text-decoration: underline;
`;

type Props = {
  description: IDescription;
  cardData: ICardPayload;
};

const ItemDetailDescription = ({ description, cardData }: Props) => {
  const { text, maxChars: maxCharsFromData } = description;
  const maxChars = maxCharsFromData || 180;
  const { t } = useTranslation(['common', 'actions']);
  const [showMore, setShowMore] = useState(false);
  const triggerShowMore = () => setShowMore(prev => !prev);
  const textLenght = text.length;
  const isLongDescription = useMemo(() => textLenght > maxChars, [textLenght, maxChars]);
  const descriptionText = useMemo(
    () => (isLongDescription && !showMore ? `${text.slice(0, maxChars)}...` : text),
    [text, isLongDescription, showMore, maxChars]
  );

  const id = useId();
  const upsellModalId = `upsell-modal-${id}`;

  return (
    <StyledWrapper>
      <StyledTitle variant='h4'>{t('common:description')}</StyledTitle>
      <StyledTextWrapper>
        <StyledParagraph variant='h4' paragraph>
          {descriptionText}
        </StyledParagraph>
        {isLongDescription && (
          <StyledTextButton onClick={triggerShowMore}>
            <StyledButtonLabel variant='h4'>
              {showMore ? t('actions:readLess') : t('actions:readMore')}
            </StyledButtonLabel>
          </StyledTextButton>
        )}
      </StyledTextWrapper>
      <StyledSeeAccessories variant='outlined' onClick={() => NiceModal.show(upsellModalId)}>
        {t('common:seeAccesories')}
      </StyledSeeAccessories>
      <UpsellModal
        id={upsellModalId}
        onRemove={() => NiceModal.hide(upsellModalId)}
        itemTitle={cardData?.title}
        defaultClose
        cardData={cardData}
        hidePricing
        backText={t('common:itemDetail')}
      />
    </StyledWrapper>
  );
};

export default ItemDetailDescription;
