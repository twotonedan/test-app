import constate from 'constate';

type Props = {
  isEditing: boolean;
};

const useIsEditingModeContext = ({ isEditing }: Props) => {
  return isEditing;
};

export const [IsEditingModeProvider, useIsEditingMode] = constate(useIsEditingModeContext);
