import Checkbox from '@/components/Common/Checkbox';
import theme from '@/theme';
import { IAmenityOption } from '@/types/filters';
import { List, ListItem, styled, Typography } from '@mui/material';
import { useFieldArray, useFormContext } from 'react-hook-form';
import AccordionWrapper from '../AccordionWrapper/AccordionWrapper';

const StyledListItem = styled(ListItem)`
  display: flex;
  padding: 4px 0;
  grid-gap: 8px;
  border-radius: 4px;

  :hover {
    background-color: ${theme.palette.customColors.barelyBlue};
  }
`;

const StyledList = styled(List)`
  padding: 8px 0 !important;
  overflow: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const StyledCheckbox = styled(Checkbox)`
  width: 100%;
`;

type Props = {
  title: string;
  options: IAmenityOption[];
  name: string;
};

const AmenitySelector = ({ title, options, name }: Props) => {
  const { control } = useFormContext();
  const { fields, append, remove, replace } = useFieldArray({ name: `${name}.amenities`, control });

  const handleClearValues = () => replace([]);

  return (
    <AccordionWrapper
      title={title}
      label={
        <Typography color={theme.palette.customText.secondary} variant='subtitle1'>
          {options
            .filter(option => {
              const typedFields = fields as { id: string; value: number }[];
              const checkedIndex = typedFields.findIndex(field => field.value === option.id);
              return checkedIndex !== -1;
            })
            .map(option => option.label)
            .join(', ')}
        </Typography>
      }
      onClear={handleClearValues}>
      <StyledList>
        {options.map(option => {
          const typedFields = fields as { id: string; value: number }[];
          const checkedIndex = typedFields.findIndex(field => field.value === option.id);
          const checked = checkedIndex !== -1;

          return (
            <StyledListItem key={option.id}>
              <StyledCheckbox
                label={option.label}
                size='small'
                name={`${name}.amenities`}
                onChange={() => (!checked ? append({ value: option.id }) : remove(checkedIndex))}
                checked={checked}
              />
            </StyledListItem>
          );
        })}
      </StyledList>
    </AccordionWrapper>
  );
};

export default AmenitySelector;
