import useToPath from '@/hooks/useToPath';
import { PageType } from '@/types/enums';
import { ReactElement } from 'react';

type Props = {
  children: ({ link }: { link: string }) => ReactElement;
  pageType: PageType;
};

const ToPathWrapper = ({ children, pageType }: Props) => {
  const { toPath } = useToPath({ pageType });

  return children({ link: toPath() });
};

export default ToPathWrapper;
