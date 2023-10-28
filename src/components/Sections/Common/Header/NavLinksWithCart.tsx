import NiceModal from '@ebay/nice-modal-react';
import Cart from '@/components/Common/Cart/Cart';
import { useId } from 'react';
import NavLinksWithoutCart from './NavLinks';

type Props = {
  onLinksClick?: () => void;
  desktopBackCartText: string;
};

const NavLinksWithCart = ({ onLinksClick, desktopBackCartText }: Props) => {
  const id = useId();
  const cartModalId = `cart-${id}`;
  const showCart = () => NiceModal.show(cartModalId);

  return (
    <>
      <NavLinksWithoutCart onCartClick={showCart} onLinksClick={onLinksClick} />
      <Cart id={cartModalId} desktopBackText={desktopBackCartText} />
    </>
  );
};

export default NavLinksWithCart;
