import { Box, styled } from '@mui/material';

const StyledSpan = styled('span')<{ bold?: boolean }>`
  font-weight: ${props => (props.bold ? 500 : 400)};
  font-size: 12px;
  line-height: 14px;
  color: ${props => props.theme.palette.customText.primary};
  font-family: 'Maven Pro';
  margin-top: 6px;
  max-width: 106px;
`;

export type IColorData = {
  colorName: string;
  colorHex: string;
};

const ColorDisplay = ({ colorName, colorHex }: IColorData) => {
  const isWhiteColor = colorHex === '#fff';

  return (
    <Box display='flex' flexDirection='column'>
      <Box
        width={100}
        height={100}
        bgcolor={colorHex}
        borderRadius='16px'
        mb='6px'
        borderColor={theme => theme.palette.customInput.border}
        border={theme => (isWhiteColor ? `1px solid ${theme.palette.customInput.border}` : '')}
      />
      <StyledSpan bold>{colorName}</StyledSpan>
      <StyledSpan>{isWhiteColor ? '#FFFFFF' : colorHex}</StyledSpan>
    </Box>
  );
};

export default ColorDisplay;
