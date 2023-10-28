import { useCallback } from 'react';
import NiceModal from '@ebay/nice-modal-react';
import PoliciesModal from '@/components/Common/Upsell/PoliciesModal/PoliciesModal';

type Props = {
  policies?: string;
};

const usePoliciesHandlers = ({ policies }: Props) => {
  const handleConfirm = useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      if (!policies) {
        resolve();
      } else {
        NiceModal.show(PoliciesModal, {
          policiesDescription: policies,
          onConfirm: () => {
            NiceModal.hide(PoliciesModal);
            resolve();
          },
          onCancel: () => {
            NiceModal.hide(PoliciesModal);
            reject();
          },
        });
      }
    });
  }, [policies]);

  return { handleConfirm };
};

export default usePoliciesHandlers;
