import { Grid, Button, TextField, FormGroup, Checkbox } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from '@emotion/styled';
import { useTranslation } from 'next-i18next';
import DetailHeader from '@/components/Sections/Common/DetailHeader';
import FooterDrawer from '@/components/Common/FooterDrawer';
import theme from '@/theme/theme';
import { IBookingFilter, IFilterModalProps, IColumn } from '@/types/dockQueue';
import Sorting from '../Sorting';

const StyledDetailHeader = styled(DetailHeader)`
  display: block;
  ${theme.breakpoints.up('lg')} {
    display: none;
  }
`;
type IHeaderProps = {
  handleOnClose: () => void;
};
export const Header = ({ handleOnClose }: IHeaderProps) => {
  const { t } = useTranslation('actions');
  return <StyledDetailHeader onClickBack={handleOnClose} title={t('Filters')} />;
};
const StyledContainer = styled(Grid)`
  padding: 10px;
  > div {
    margin: 5px;
  }
`;
const StyledAccordion = styled(Accordion)`
  box-shadow: none;
  border-bottom: 1px solid ${theme.palette.customColors.paleGray};
  border-radius: 0;
  > .MuiAccordionDetails-root {
    background: red;
  }
`;

export const Body = ({ data }: IFilterModalProps) => {
  const { fields, filterFields, setFilterFields } = data;
  const { t } = useTranslation('actions');
  const stringComponent = (field: IColumn, matchingFilter: IBookingFilter | undefined) => {
    return (
      <TextField
        value={matchingFilter?.contains || ''}
        onChange={e => {
          if (matchingFilter) {
            setFilterFields(
              filterFields.map((x: IBookingFilter) => {
                if (x.field !== field.field) return x;
                return {
                  ...x,
                  contains: e.target.value,
                };
              })
            );
          } else {
            setFilterFields(
              filterFields.concat({
                field: field.field,
                contains: e.target.value,
              } as IBookingFilter)
            );
          }
        }}
      />
    );
  };
  // TODO: fix dates being off by one day
  const dateComponent = (field: IColumn, matchingFilter: IBookingFilter | undefined) => {
    return (
      <>
        <TextField
          type='date'
          value={matchingFilter?.after || ''}
          onChange={e => {
            const newFilter: IBookingFilter = {
              field: field.field,
              before: matchingFilter?.before,
              after: e.target.value,
            };
            if (matchingFilter) {
              setFilterFields(
                filterFields.map((x: IBookingFilter) => {
                  if (x.field !== field.field) return x;
                  return newFilter;
                })
              );
            } else {
              setFilterFields(filterFields.concat(newFilter));
            }
          }}
        />
        <TextField
          type='date'
          value={matchingFilter?.before || ''}
          onChange={e => {
            const newFilter: IBookingFilter = {
              field: field.field,
              before: e.target.value,
              after: matchingFilter?.after,
            };
            if (matchingFilter) {
              setFilterFields(
                filterFields.map((x: IBookingFilter) => {
                  if (x.field !== field.field) return x;
                  return newFilter;
                })
              );
            } else {
              setFilterFields(filterFields.concat(newFilter));
            }
          }}
        />
      </>
    );
  };
  const optionsComponent = (field: IColumn, matchingFilter: IBookingFilter | undefined) => {
    return (
      <FormGroup>
        {field.options?.map(option => (
          <Grid container key={option.id}>
            <Grid item xs={2}>
              <Checkbox
                checked={matchingFilter?.value?.some(x => x.id === option.id) || false}
                onChange={e => {
                  if (matchingFilter) {
                    setFilterFields(
                      filterFields.map((x: IBookingFilter) => {
                        return x.field === field.field
                          ? {
                              field: x.field,
                              value: e.target.checked
                                ? x.value?.concat(option)
                                : x.value?.filter(entry => entry.id !== option.id),
                            }
                          : x;
                      })
                    );
                  } else {
                    setFilterFields(
                      filterFields.concat({
                        field: field.field,
                        value: [option],
                      } as IBookingFilter)
                    );
                  }
                }}
              />
            </Grid>
            <Grid item xs={10} style={{ margin: 'auto' }}>
              {option.title}
            </Grid>
          </Grid>
        ))}
      </FormGroup>
    );
  };
  const getFieldComponent = (field: IColumn) => {
    const matchingFilter = filterFields.find(x => x.field === field.field);
    switch (field.comparator) {
      case 'string':
        return stringComponent(field, matchingFilter);
      case 'date':
        return dateComponent(field, matchingFilter);
      case 'options':
        return optionsComponent(field, matchingFilter);
      default:
        return '';
    }
  };
  const clearField = (field: string) => {
    setFilterFields(filterFields?.filter((x: IBookingFilter) => x.field !== field));
  };
  return (
    <StyledContainer container>
      <Sorting
        columns={fields}
        sortField={data.sortField}
        setSortField={data.setSortField}
        sortOrder={data.sortOrder}
        setSortOrder={data.setSortOrder}
      />
      {fields.map((field: IColumn) => {
        const matchingFilter = filterFields.find(x => x.field === field.field);
        const getDisplayValue = () => {
          switch (field.comparator) {
            case 'string':
              return matchingFilter?.contains;
            case 'date':
              if (!matchingFilter?.after && !matchingFilter?.before) return '';
              return (
                <>
                  {matchingFilter?.after && <div>After: {matchingFilter.after}</div>}
                  {matchingFilter?.before && <div>Before: {matchingFilter.before}</div>}
                </>
              );
            case 'options':
              if (!matchingFilter?.value || matchingFilter?.value?.length === 0) return '';
              return matchingFilter?.value?.reduce((acc, curr, index) => {
                return index === 0 ? `${acc}${curr.title}` : `${acc}, ${curr.title}`;
              }, '');
            default:
              return '';
          }
        };
        const displayValue = getDisplayValue();
        return (
          <Grid item xs={12} key={field.field}>
            <StyledAccordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} id={field.field}>
                <Grid item xs={8}>
                  <Grid item xs={12}>
                    <Typography variant='h3'>{field.headerName}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='h4'>{displayValue}</Typography>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  {!!displayValue && displayValue !== '' && (
                    <Button
                      onClick={e => {
                        e.stopPropagation();
                        clearField(field.field);
                      }}>
                      {t('Clear')}
                    </Button>
                  )}
                </Grid>
              </AccordionSummary>
              <AccordionDetails>{getFieldComponent(field)}</AccordionDetails>
            </StyledAccordion>
          </Grid>
        );
      })}
    </StyledContainer>
  );
};

type IFooterProps = {
  applyFilters?: () => void;
  clearAllFilters?: () => void;
};
const ButtonWrapper = styled(Grid)`
  padding: 0 10px;
  button {
    width: 100%;
  }
`;
export const Footer = ({ applyFilters, clearAllFilters }: IFooterProps) => {
  const { t } = useTranslation(['actions']);
  return (
    <FooterDrawer>
      <Grid container>
        <ButtonWrapper item xs={6}>
          <Button onClick={clearAllFilters} variant='outlined'>
            {t('clearAll')}
          </Button>
        </ButtonWrapper>
        <ButtonWrapper item xs={6}>
          <Button onClick={applyFilters} variant='contained'>
            {t('applyFilters')}
          </Button>
        </ButtonWrapper>
      </Grid>
    </FooterDrawer>
  );
};
