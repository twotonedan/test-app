import { MAX_LOCATIONS_ALLOWED } from '@/hooks/contexts/useFeedFilterHandlers';
import { SupportedIconsEnum } from '@/types/enums';
import { useTranslation } from 'next-i18next';
import { startTransition, useId, useMemo, useRef } from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useSetFeedQuery } from '@/hooks/queries/FeedQuery/useSetFeedQuery';
import { useFieldArray, useFormContext } from 'react-hook-form';
import useFiltersByCategory from '@/hooks/useFiltersByCategory';
import { ILocation } from '@/types/accessories';

import { DrawerOrModalSelector } from '../../DrawerOrModal/DrawerOrModal';
import LocationModalFooter from '../../Upsell/LocationModal/LocationModalFooter';
import LocationModal from '../../Upsell/LocationModal';
import FilterButton from './FilterButton';
import LocationCheckbox from '../../Upsell/LocationModal/LocationCheckbox';

type Props = {
  baseName: string;
  locationLabel?: string;
};

const LocationFilterButton = ({ baseName, locationLabel }: Props) => {
  const { handleSetQuery } = useSetFeedQuery({ name: baseName });
  const { t } = useTranslation();
  const modalId = useId();
  const filtersByCategory = useFiltersByCategory();

  const locationFiltersModalId = `location-filters-modal-${modalId}`;
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({ name: `${baseName}.locations`, control });

  const selectedLocations = fields as unknown as { value: number | string }[];

  const handleLocationDrawerClose = () =>
    startTransition(() => {
      NiceModal.hide(locationFiltersModalId);
      handleSetQuery();
    });

  const locationModal = useModal(locationFiltersModalId);
  const prevSortedLocationsRef = useRef<ILocation[]>([]);

  const sortedLocations = useMemo(
    () => {
      if (!locationModal.visible) return prevSortedLocationsRef.current;

      const sortedSelectedLocations = filtersByCategory?.options?.locations?.options?.sort((a, b) => {
        const aIsSelected = selectedLocations.find(location => location.value === a.key);
        const bIsSelected = selectedLocations.find(location => location.value === b.key);

        if (aIsSelected && bIsSelected) return a.name.localeCompare(b.name);
        if (aIsSelected) return -1;
        if (bIsSelected) return 1;
        return a.name.localeCompare(b.name);
      });

      prevSortedLocationsRef.current = sortedSelectedLocations || [];
      return prevSortedLocationsRef.current;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [locationModal.visible]
  );

  return (
    <>
      <FilterButton
        fullWidth
        isLocationFilter
        value={locationLabel}
        placeholder={t('selectDeliveryLocation')}
        icon={SupportedIconsEnum.LOCATION_OUTLINED}
        iconSize={24}
        onClick={() => {
          NiceModal.show(locationFiltersModalId);
        }}
      />

      <LocationModal
        onCloseModal={handleLocationDrawerClose}
        id={locationFiltersModalId}
        locations={sortedLocations}
        forceDrawerOrModal={DrawerOrModalSelector.DRAWER}
        footer={
          <LocationModalFooter
            onClose={handleLocationDrawerClose}
            isDisabled={!selectedLocations.length || selectedLocations.length > MAX_LOCATIONS_ALLOWED}
          />
        }>
        {({ location }) => {
          const findIndex = selectedLocations.findIndex(locationItem => locationItem.value === location.key);
          const isSelected = findIndex !== -1;
          const isDisabled = selectedLocations.length === MAX_LOCATIONS_ALLOWED && !isSelected;
          return (
            <LocationCheckbox
              isDisabled={isDisabled}
              isSelected={isSelected}
              location={location}
              name={baseName}
              onClick={() => (!isSelected ? append({ value: location.key }) : remove(findIndex))}
            />
          );
        }}
      </LocationModal>
    </>
  );
};

export default LocationFilterButton;
