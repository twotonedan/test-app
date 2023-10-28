import { has } from 'lodash';
import { ControllerRenderProps } from 'react-hook-form';

const handleInputRef = (inpRef: HTMLElement, field: ControllerRenderProps) =>
  field.ref({
    ...inpRef,
    focus: () => {
      inpRef.focus();
      if (!has(inpRef, 'node')) inpRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
    },
  });

export default handleInputRef;
