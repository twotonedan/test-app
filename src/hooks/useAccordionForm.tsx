import customerInfoGroupSchema, {
  IFormGroup,
} from '@/validationSchemas/customerInformationSchema/customerInfoGroupSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo, useState } from 'react';
import { useForm, useFormContext } from 'react-hook-form';

type Props = {
  parsedData: IFormGroup;
  mandatoriesIds: string[];
  setInvalidGroups: React.Dispatch<React.SetStateAction<boolean[]>>;
  groupIndex: number;
  name: string;
  groupId: string;
  isFirstInvalidGroup: boolean;
};

const useAccordionForm = ({
  parsedData,
  mandatoriesIds,
  setInvalidGroups,
  groupIndex,
  name,
  groupId,
  isFirstInvalidGroup,
}: Props) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [isFirstErrorFocused, setIsFirstErrorFocused] = useState(false);
  const { setValue } = useFormContext();

  // This form handle each Accordion form
  const accordionForm = useForm<IFormGroup>({
    resolver: yupResolver(customerInfoGroupSchema(mandatoriesIds)),
    defaultValues: parsedData,
  });

  const accordionFormValues = useMemo(() => accordionForm.getValues().data, [accordionForm]);
  const hasErrors = useMemo(() => !accordionForm.formState.isValid, [accordionForm.formState.isValid]);

  // This will open/close the Accordion on the first render if there are errors and the form is not dirty.
  useEffect(() => {
    if (accordionForm.formState.isDirty) return;
    setIsFormOpen(hasErrors);
  }, [accordionForm.formState.isDirty, hasErrors]);

  const hasValues = useMemo(
    () =>
      accordionFormValues?.some(data => {
        if (!data.value || (Array.isArray(data.value) && data.value.length === 0)) return false;
        return true;
      }),
    [accordionFormValues]
  );

  useEffect(() => {
    // Based on the state of each accordion, a status will be set in the parent component,
    // to establish which accordions are in an error state.
    setInvalidGroups(prev => {
      const newPrev = [...prev];
      newPrev[groupIndex] = hasErrors;
      return newPrev;
    });

    // In addition, if the Accordion form status is valid, the value will be stored in the parent component's form,
    // otherwise it will be reset.
    if (hasErrors) setValue(name, { id: groupId, data: undefined }, { shouldValidate: true });
    else setValue(name, { id: groupId, data: accordionFormValues }, { shouldValidate: true });
  }, [accordionFormValues, groupId, groupIndex, hasErrors, name, setInvalidGroups, setValue]);

  useEffect(() => {
    const validateGroups = async () => {
      await accordionForm.trigger().then(() => {
        setIsValidated(true);
      });
    };

    if (isFirstInvalidGroup && !isValidated) {
      validateGroups();
    }

    // If the Accordion contains errors, the first one will be located and a focus() will be executed.
    const errors = accordionForm.formState?.errors;
    if (isFormOpen && errors.data && !isFirstErrorFocused) {
      const firstErrorIndx = errors.data.findIndex?.(e => e);
      accordionForm.clearErrors();
      if (errors.data.length && firstErrorIndx) {
        const errorData = errors.data[firstErrorIndx];
        errorData?.value?.ref?.focus?.();
        setIsFirstErrorFocused(true);
      }
    }
  }, [isFirstInvalidGroup, isValidated, accordionForm, isFormOpen, isFirstErrorFocused]);

  return { accordionForm, hasErrors, isFormOpen, setIsFormOpen, hasValues, accordionFormValues };
};

export default useAccordionForm;
