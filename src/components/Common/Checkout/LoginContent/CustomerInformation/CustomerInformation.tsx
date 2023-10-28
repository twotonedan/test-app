import useGetCustomerInfoInputs from '@/hooks/api/useGetCustomerInfoInputs';
import { useUserState } from '@/hooks/contexts/useUserState';
import { useMemo } from 'react';
import { InputType } from '@/types/enums';
import { IDataGroup, IFormGroup } from '@/validationSchemas/customerInformationSchema/customerInfoGroupSchema';
import EditForm from '../EditForm';
import Skeletons from './Skeletons';

const CustomerInformation = () => {
  const { userData } = useUserState();
  const { data: inputsData } = useGetCustomerInfoInputs();

  const defaultValues = useMemo(
    () => ({
      [InputType.SINGLECHECK]: false,
      [InputType.CHECKBOX]: [],
      [InputType.STRING]: undefined,
      [InputType.NUMBER]: undefined,
      [InputType.DATE]: undefined,
      [InputType.TIME]: undefined,
      [InputType.SELECT]: undefined,
      [InputType.RADIO]: undefined,
      [InputType.EMAIL]: undefined,
      [InputType.PHONE]: undefined,
    }),
    []
  );

  const parsedData: IFormGroup[] | undefined = useMemo(
    () =>
      inputsData?.map(inputDataGroup => {
        const childGroup: IDataGroup[] = inputDataGroup.data.map(inputData => {
          const value = defaultValues[inputData.type];
          return { id: inputData.id, type: inputData.type, value, icon: inputData.icon };
        });

        const newGroup: IFormGroup = { data: childGroup, id: inputDataGroup.id };
        const matchedGroup = userData?.data.find(userDataGroup => inputDataGroup.id === userDataGroup.id);
        if (!matchedGroup) return newGroup;

        matchedGroup.data.forEach(matchedData => {
          const matchedChildData = newGroup.data.find(childData => childData.id === matchedData.id);
          if (matchedChildData) matchedChildData.value = matchedData.value;
        });

        return newGroup;
      }),
    [defaultValues, inputsData, userData?.data]
  );

  const mandatoriesIds = useMemo(
    () => inputsData?.flatMap(curr => curr.data.filter(data => data.isMandatory).map(data => data.id)) || [],
    [inputsData]
  );

  if (!parsedData) return <Skeletons />;

  return <EditForm inputsData={inputsData} mandatoriesIds={mandatoriesIds || []} parsedData={parsedData} />;
};

export default CustomerInformation;
