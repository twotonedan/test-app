import StickyHeader from '@/components/Common/StickyHeader';
import theme from '@/theme';
import { styled } from '@mui/material';

const DummyDesktopHeader = styled(StickyHeader)`
  display: none;

  ${theme.breakpoints.up('lg')} {
    display: block;
    width: 100%;
    height: 88px;
    flex-shrink: 0;
  }
`;

export default DummyDesktopHeader;
