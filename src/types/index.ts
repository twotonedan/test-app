import { FieldValues, UseControllerProps } from 'react-hook-form';

export interface ControllersProps {
  controllerProps?: Omit<UseControllerProps<FieldValues, string>, 'name'>;
}
