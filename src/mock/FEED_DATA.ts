import { CategoryType, SupportedIconsEnum, TimeRangeType } from '@/types/enums';
import { IFeedPayload } from '@/types/feed';
import { IFeedSupportedFilterKeys } from '@/types/filters';
import { LOCATIONS_DATA } from './LOCATIONS_DATA';

const FEED_DATA: IFeedPayload = {
  title: 'Stellar IMS | Feed',
  categories: [
    {
      id: 1,
      icon: SupportedIconsEnum.WAVES_OUTLINED,
      name: 'All',
      type: CategoryType.ALL,
    },
    {
      id: 2,
      icon: SupportedIconsEnum.BOAT,
      name: 'Boats',
      type: CategoryType.BOATS,
    },
    { id: 3, icon: SupportedIconsEnum.DIRECTIONS_BIKE, name: 'Bikes', type: CategoryType.BIKES },
    {
      id: 4,
      icon: SupportedIconsEnum.KAYAK,
      name: 'Kayaks',
      type: CategoryType.KAYAKS,
    },
    {
      id: 5,
      icon: SupportedIconsEnum.CABIN,
      name: 'Cabins',
      type: CategoryType.CABINS,
    },
    {
      id: 6,
      icon: SupportedIconsEnum.CAMPING,
      name: 'Camping',
      type: CategoryType.CAMPING,
    },
  ],
  filters: {
    [CategoryType.ALL]: {
      settings: {
        allowMultidayChange: true,
        filtersToShowOnFeed: [
          IFeedSupportedFilterKeys.locations,
          IFeedSupportedFilterKeys.dateOrDateRange,
          IFeedSupportedFilterKeys.timeRange,
          IFeedSupportedFilterKeys.priceRange,
          IFeedSupportedFilterKeys.amenities,
        ],
      },
      defaults: {
        isMultiDay: true,
        showUnavailable: false,
        locations: [LOCATIONS_DATA[0], LOCATIONS_DATA[1]],
      },
      options: {
        timeRange: {
          type: TimeRangeType.DURATION,
        },
        priceRange: {
          id: 1,
          name: 'Price Range',
          limits: {
            min: 0,
            max: 1000000,
          },
        },
        locations: {
          options: LOCATIONS_DATA,
        },
        amenities: [
          {
            id: 1,
            title: 'BOAT TYPE',
            options: [
              {
                label: 'Fishing Boats',
                id: 1,
              },
              {
                label: 'Dinghy Boats',
                id: 2,
              },
            ],
          },
          {
            id: 2,
            title: 'BOAT SIZE',
            options: [
              {
                label: 'Big Boats',
                id: 3,
              },
              {
                label: 'Small Boats',
                id: 4,
              },
            ],
          },
        ],
      },
    },
    [CategoryType.BOATS]: {
      settings: {
        allowMultidayChange: true,
        filtersToShowOnFeed: [
          IFeedSupportedFilterKeys.locations,
          IFeedSupportedFilterKeys.amenities,
          IFeedSupportedFilterKeys.dateOrDateRange,
          IFeedSupportedFilterKeys.timeRange,
          IFeedSupportedFilterKeys.priceRange,
        ],
      },
      defaults: {
        isMultiDay: true,
        showUnavailable: false,
      },
      options: {
        timeRange: {
          type: TimeRangeType.DURATION,
          options: [
            {
              label: '2 hours',
              value: 2,
            },
            {
              label: '4 hours',
              value: 4,
            },
            {
              label: '6 hours',
              value: 6,
            },
          ],
        },
        priceRange: {
          id: 1,
          name: 'Price Range',
          limits: {
            min: 1000,
            max: 20000,
          },
        },
        amenities: [
          {
            id: 1,
            title: 'BOAT TYPE',
            options: [
              {
                label: 'Fishing Boats',
                id: 1,
              },
              {
                label: 'Dinghy Boats',
                id: 2,
              },
            ],
          },
          {
            id: 2,
            title: 'BOAT SIZE',
            options: [
              {
                label: 'Big Boats',
                id: 3,
              },
              {
                label: 'Small Boats',
                id: 4,
              },
            ],
          },
        ],
        locations: { options: LOCATIONS_DATA },
      },
    },
    [CategoryType.BIKES]: {
      settings: {
        allowMultidayChange: false,
        filtersToShowOnFeed: [
          IFeedSupportedFilterKeys.locations,
          IFeedSupportedFilterKeys.priceRange,
          IFeedSupportedFilterKeys.dateOrDateRange,
          IFeedSupportedFilterKeys.timeRange,
          IFeedSupportedFilterKeys.amenities,
        ],
      },
      defaults: {
        isMultiDay: false,
        showUnavailable: false,
      },
      options: {
        timeRange: {
          type: TimeRangeType.DURATION,
          options: [
            {
              label: '2 hours',
              value: 2,
            },
            {
              label: '4 hours',
              value: 4,
            },
            {
              label: '6 hours',
              value: 6,
            },
          ],
        },
        priceRange: {
          id: 1,
          name: 'Price Range',
          limits: {
            min: 10,
            max: 200,
          },
        },
        amenities: [
          {
            id: 1,
            title: 'BIKE TYPE',
            options: [
              {
                label: 'MTB Bike',
                id: 1,
              },
              {
                label: 'Route Bike',
                id: 2,
              },
            ],
          },
        ],
        locations: { options: LOCATIONS_DATA },
      },
    },
    [CategoryType.KAYAKS]: {
      settings: {
        allowMultidayChange: false,
        filtersToShowOnFeed: [
          IFeedSupportedFilterKeys.locations,
          IFeedSupportedFilterKeys.timeRange,
          IFeedSupportedFilterKeys.priceRange,
          IFeedSupportedFilterKeys.dateOrDateRange,
          IFeedSupportedFilterKeys.amenities,
        ],
      },
      options: {
        locations: { options: LOCATIONS_DATA },
      },
    },
    [CategoryType.CABINS]: {
      settings: {
        allowMultidayChange: true,
        filtersToShowOnFeed: [
          IFeedSupportedFilterKeys.locations,
          IFeedSupportedFilterKeys.dateOrDateRange,
          IFeedSupportedFilterKeys.priceRange,
          IFeedSupportedFilterKeys.timeRange,
          IFeedSupportedFilterKeys.amenities,
        ],
      },
      defaults: {
        isMultiDay: true,
        showUnavailable: false,
      },
      options: {
        timeRange: {
          type: TimeRangeType.DURATION,
          options: [
            {
              label: '2 hours',
              value: 2,
            },
          ],
        },
        priceRange: {
          id: 1,
          name: 'Price Range',
          limits: {
            min: 10,
            max: 200,
          },
        },
        amenities: [
          {
            id: 1,
            title: 'CABINS TYPE',
            options: [
              {
                label: 'Big Cabin',
                id: 1,
              },
              {
                label: 'Small Cabins',
                id: 2,
              },
            ],
          },
        ],
        locations: { options: LOCATIONS_DATA },
      },
    },
    [CategoryType.CAMPING]: {
      settings: {
        allowMultidayChange: true,
        filtersToShowOnFeed: [
          IFeedSupportedFilterKeys.locations,
          IFeedSupportedFilterKeys.amenities,
          IFeedSupportedFilterKeys.timeRange,
          IFeedSupportedFilterKeys.dateOrDateRange,
          IFeedSupportedFilterKeys.priceRange,
        ],
      },
      defaults: {
        isMultiDay: true,
        showUnavailable: false,
      },
      options: {
        timeRange: { type: TimeRangeType.SLIDER_RANGE },
        priceRange: {
          id: 1,
          name: 'Price Range',
          limits: {
            min: 10,
            max: 200,
          },
        },
        amenities: [
          {
            id: 1,
            title: 'CAMPING TYPE',
            options: [
              {
                label: 'Fishing Camping',
                id: 1,
              },
              {
                label: 'Dinghy Camping',
                id: 2,
              },
            ],
          },
        ],
        locations: { options: LOCATIONS_DATA },
      },
    },
  },
};

export default FEED_DATA;
