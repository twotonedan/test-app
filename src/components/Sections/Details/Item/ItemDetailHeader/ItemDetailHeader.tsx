import DetailHeader from '@/components/Sections/Common/DetailHeader/DetailHeader';
import DesktopHeader from '@/components/Sections/Common/Header/DesktopHeader';
import NavLinksWithCart from '@/components/Sections/Common/Header/NavLinksWithCart';
import theme from '@/theme/theme';
import { styled } from '@mui/material';
import { useTranslation } from 'next-i18next';

const StyledDetailHeader = styled(DetailHeader)`
  ${theme.breakpoints.up('lg')} {
    display: none;
  }
`;

const StyledDestkopHeader = styled(DesktopHeader)`
  display: none;

  ${theme.breakpoints.up('lg')} {
    display: block;
  }
`;

type Props = {
  title: string;
  onClickBack?: () => void;
  onClickCart?: () => void;
};

const ItemDetailHeader = ({ title, onClickBack, onClickCart }: Props) => {
  const { t } = useTranslation();
  return (
    <>
      <StyledDetailHeader title={title} onClickBack={onClickBack} onClickCart={onClickCart} />
      <StyledDestkopHeader withShadow rightComponent={<NavLinksWithCart desktopBackCartText={t('itemDetail')} />} />
    </>
  );
};

export default ItemDetailHeader;
