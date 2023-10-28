/* eslint-disable consistent-return */
import theme from '@/theme/theme';
import { NiceModalHandler } from '@ebay/nice-modal-react';
import { useEffect, useState } from 'react';

type Props = {
  onRemove?: () => void;
};

const useMuiDrawer = (niceModal: NiceModalHandler<Record<string, unknown>>, { onRemove }: Props = {}) => {
  const { visible: open, remove, hide } = niceModal;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(open);

    const isClosing = !open && isOpen;

    if (!isClosing) return;

    const timeout = setTimeout(() => {
      remove();
      onRemove?.();
    }, theme.transitions.duration.leavingScreen);

    return () => {
      if (isClosing) return;
      clearTimeout(timeout);
    };
  }, [onRemove, open, isOpen, remove]);

  const handleOnClose = () => hide();

  return { isOpen, handleOnClose };
};

export default useMuiDrawer;
