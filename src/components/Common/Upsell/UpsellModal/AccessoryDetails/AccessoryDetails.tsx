import { MouseEvent } from 'react';
import { TagColor } from '@/types/enums';
import useMuiDrawer from '@/hooks/components/useMuiDrawer';
import NiceModal, { useModal, NiceModalHocProps } from '@ebay/nice-modal-react';
import { IImage, IQuantityLimits } from '@/types/common';
import useIsMobile from '@/hooks/useIsMobile';
import { ILocation } from '@/types/accessories';
import LocationModal from '@/components/Common/Upsell/LocationModal';

import MobileDrawerCard from './MobileDrawerCard';
import ModalCard from './ModalCard';
import LocationItemWithPrices from '../../LocationModal/LocationItemWithPrices';

interface ModalProps extends NiceModalHocProps {
  accessoryId: string;
  tag?: {
    label: string;
    color: TagColor;
  };
  images?: IImage[];
  alt?: string;
  title?: string;
  description?: string;
  limits?: IQuantityLimits;
  price?: number;
  quantity: number;
  locations?: ILocation[];
  selectedLocation?: ILocation;
  handleSetAccessoryQuantity: (accessoryId: string, quantity: number) => void;
  hidePricing?: boolean;
}

const AccessoryDetails = NiceModal.create(
  ({
    accessoryId,
    title,
    description,
    images = [],
    limits = { min: 0, max: 0 },
    tag,
    price = 0,
    quantity,
    locations,
    selectedLocation,
    handleSetAccessoryQuantity,
    hidePricing,
  }: ModalProps) => {
    const modal = useModal();
    const { isOpen, handleOnClose } = useMuiDrawer(modal);
    const accesoryDetail = { accessoryId, title, description, images, price };
    const isMobile = useIsMobile();
    const locationModalId = `location-modal-${accessoryId}`;

    const handleShowLocationModal = () => {
      if (!locations?.length) return;
      NiceModal.show(locationModalId);
    };

    const handleEditLocation = (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      handleShowLocationModal();
    };
    const Component = isMobile ? MobileDrawerCard : ModalCard;

    return (
      <>
        <Component
          selectedLocation={selectedLocation}
          isOpen={isOpen}
          onClose={handleOnClose}
          accesoryDetail={accesoryDetail}
          tag={tag}
          limits={limits}
          quantity={quantity}
          locations={locations}
          handleShowLocationModal={handleShowLocationModal}
          handleEditLocation={handleEditLocation}
          hidePricing={hidePricing}
        />
        {locations && (
          <LocationModal id={locationModalId} locations={locations} selectedLocation={selectedLocation}>
            {({ isSelected, location, handleOnClose: locationModalHandleOnClose }) => (
              <LocationItemWithPrices
                isSelected={isSelected}
                location={location}
                // This logic will be removed when we have the new accesories flow
                onClick={() => {
                  handleSetAccessoryQuantity(accessoryId, 1);
                  locationModalHandleOnClose();
                }}
              />
            )}
          </LocationModal>
        )}
      </>
    );
  }
);

export default AccessoryDetails;
