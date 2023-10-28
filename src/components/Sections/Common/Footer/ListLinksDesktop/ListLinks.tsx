import { Box, styled } from '@mui/material';
import Typography from '@mui/material/Typography';
import { LinkType } from '@/types/footer';
import Masonry from '@mui/lab/Masonry';
import useIsDesktop from '@/hooks/useIsDesktop';
import theme from '@/theme/theme';
import { PageType } from '@/types/enums';
import useGetCompany from '@/hooks/api/useGetCompany';
import ItemLink from '../ItemLink/ItemLink';
import ToPathWrapper from '../../../../Common/ToPathWrapper/ToPathWrapper';

const StyledWrapper = styled(Box)`
  display: none;
  ${theme.breakpoints.up('md')} {
    display: block;
    padding-top: 24px;
    padding-bottom: 56px;
    padding-top: 32px;
    overflow: hidden;
  }
`;

const StyledList = styled(Box)`
  margin-bottom: 24px;
`;

const StyledItems = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 16px;
`;

const ListLinks = () => {
  const isDesktop = useIsDesktop();
  const { data: companyData } = useGetCompany();
  const footer = companyData?.footer || { items: [] };
  return (
    <StyledWrapper>
      <Masonry columns={isDesktop ? 8 : 4} spacing={3} defaultColumns={8} defaultHeight={400} defaultSpacing={3}>
        {footer.items.map((list, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <StyledList key={`masonryItem-${list.title}-${JSON.stringify(list)}-${i}`}>
            <Typography variant='h4' fontWeight={600}>
              {list.title}
            </Typography>
            <StyledItems>
              {list.list?.map(item => {
                if (item.type !== LinkType.INTERNAL)
                  return <ItemLink key={`${item.title}-${item.link}`} link={item.link} title={item.title} />;
                return (
                  <ToPathWrapper pageType={item.link as PageType} key={`${item.title}-${item.link}`}>
                    {({ link }) => <ItemLink key={link} link={link} title={item.title} />}
                  </ToPathWrapper>
                );
              })}
            </StyledItems>
          </StyledList>
        ))}
      </Masonry>
    </StyledWrapper>
  );
};

export default ListLinks;
