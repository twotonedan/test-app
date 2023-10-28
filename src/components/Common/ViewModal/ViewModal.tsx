import useMuiDrawer from '@/hooks/components/useMuiDrawer';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Drawer, styled } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { IViewFormValues, IViewModalProps } from '@/types/dockQueue';
import { Header, Body, Footer } from './ModalComponents';

const StyledDrawer = styled(Drawer)`
  & > .MuiPaper-root {
    width: 100%;
    border-radius: 0;
    position: relative;
    display: flex;
    flex-direction: column;
  }
`;

const viewFormSchema = yup.lazy(() =>
  yup.object().shape({
    id: yup.string().required(),
    name: yup.string().required(),
    private: yup.boolean(),
    columns: yup.array(),
    actions: yup.array(),
    sortField: yup.string(),
    sortOrder: yup.string(),
  })
);

const ViewModal = NiceModal.create(({ data, modalType, isCardView, deleteView, createView }: IViewModalProps) => {
  const modal = useModal();
  const { isOpen, handleOnClose } = useMuiDrawer(modal);
  const { t } = useTranslation('actions');
  const form = useForm<IViewFormValues>({
    resolver: yupResolver(viewFormSchema),
    defaultValues: {
      ...data,
      id: modalType === 'edit' ? data.id : undefined,
      name: modalType === 'edit' ? data.name : '',
    },
  });

  const handleDelete = () => {
    const formValues = form.getValues();
    if (formValues.id) {
      deleteView(
        { viewId: formValues.id, isCardView },
        {
          onSuccess: () => {
            handleOnClose();
          },
        }
      );
    }
  };
  const submit = () => {
    const formValues = form.getValues();
    createView(
      { formValues, isCardView },
      {
        onSuccess: () => {
          handleOnClose();
        },
      }
    );
  };
  const titles = isCardView
    ? {
        add: t('cardView.addCardView'),
        edit: t('cardView.editCardView'),
        duplicate: t('cardView.duplicateCardView'),
      }
    : {
        add: t('tableView.addTableView'),
        edit: t('tableView.editTableView'),
        duplicate: t('tableView.duplicateTableView'),
      };
  const title = titles[modalType];
  return (
    <StyledDrawer open={isOpen} anchor='right'>
      <Header handleOnClose={handleOnClose} title={title} />
      <div style={{ margin: '20px' }}>
        <FormProvider {...form}>
          <Body modalType={modalType} deleteView={handleDelete} isCardView={isCardView} />
        </FormProvider>
      </div>
      <Footer onSave={submit} onCancel={handleOnClose} />
    </StyledDrawer>
  );
});

export default ViewModal;
