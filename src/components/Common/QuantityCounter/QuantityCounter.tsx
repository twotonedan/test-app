import theme from '@/theme';
import { IQuantityLimits } from '@/types/common';
import { transientOptions } from '@/utils/transientOptions';
import { AddRounded, DeleteOutline, RemoveRounded } from '@mui/icons-material';
import { Box, IconButton, styled, Typography } from '@mui/material';
import { ForwardedRef, forwardRef, useCallback } from 'react';

const StyledWrapper = styled(Box, transientOptions)<{ $sizeSmall: boolean }>`
  display: flex;
  border: 1px solid ${theme.palette.customText.primary};
  border-radius: 200px;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
  max-width: ${props => (props.$sizeSmall ? '88px' : '108px')};
  height: inherit;

  &.counter-on-zero {
    width: fit-content;

    > .add-icon {
      margin: ${props => (props.$sizeSmall ? 0 : 3)}px;
    }
  }

  .left-icon {
    margin: ${props => (props.$sizeSmall ? '0px 0 0px 4px' : '3px 0 3px 10px')};
  }

  .add-icon {
    margin: ${props => (props.$sizeSmall ? '0px 4px 0px 0' : '3px 10px 3px 0')};
  }
`;

const StyledCounter = styled(Typography)`
  font-weight: 600;
  line-height: 20px;
`;

const StyledIconButton = styled(IconButton)`
  color: ${theme.palette.customText.primary};
`;

const StyledAddIconButton = styled(IconButton)`
  color: ${theme.palette.primary.main};
`;

type Props = {
  className?: string;
  limits: IQuantityLimits;
  quantity: number;
  hideTrash?: boolean;
  handleTrashClick?: (quantity: number) => void;
  handleRemoveClick: (quantity: number) => void;
  handleAddClick: (quantity: number) => void;
  disableSubstract?: boolean;
  sizeSmall?: boolean;
};

const QuantityCounter = (
  {
    limits,
    className,
    quantity,
    hideTrash,
    disableSubstract,
    handleTrashClick,
    handleRemoveClick,
    handleAddClick,
    sizeSmall = false,
  }: Props,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const isMandatory = limits.min > 0;
  const disableTrash = isMandatory && quantity <= limits.min;
  const availableTrash = !isMandatory && quantity === 1;
  const showTrash = !hideTrash && (availableTrash || disableTrash);
  const shouldDisableSubstract = disableSubstract && quantity === 1;

  const handleSubstract = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();
      if (shouldDisableSubstract) {
        return;
      }
      if (availableTrash && handleTrashClick) {
        handleTrashClick(quantity);
        return;
      }
      handleRemoveClick(quantity);
    },
    [shouldDisableSubstract, quantity, availableTrash, handleTrashClick, handleRemoveClick]
  );

  const isAddDisabled = quantity >= limits.max;

  const handleAdd = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();
      if (isAddDisabled) return;
      handleAddClick(quantity);
    },
    [isAddDisabled, handleAddClick, quantity]
  );

  return (
    <StyledWrapper
      ref={ref}
      className={`${quantity === 0 ? 'counter-on-zero' : ''} ${className}`}
      $sizeSmall={sizeSmall}>
      {quantity > 0 && (
        <>
          <StyledIconButton
            onClick={handleSubstract}
            className='left-icon'
            disabled={disableTrash || shouldDisableSubstract}>
            {showTrash ? <DeleteOutline fontSize='small' /> : <RemoveRounded fontSize='small' />}
          </StyledIconButton>
          <StyledCounter variant='subtitle1'>{quantity}</StyledCounter>
        </>
      )}

      <StyledAddIconButton onClick={handleAdd} className='add-icon' disabled={isAddDisabled}>
        <AddRounded fontSize='small' />
      </StyledAddIconButton>
    </StyledWrapper>
  );
};

export default forwardRef(QuantityCounter);
