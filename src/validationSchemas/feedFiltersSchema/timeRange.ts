import { TimeRangeType } from '@/types/enums';
import * as yup from 'yup';
import { dropdownSchema } from '../common/common';
import { TimeRangeSchema, timeRangeSliderSchema } from '../common/timeRangeSlider';

type FeedTimeRangeSchemaDuration = number | null;

export type FeedTimeRangeSchema =
  | { type: TimeRangeType.DURATION; value: FeedTimeRangeSchemaDuration }
  | { type: TimeRangeType.SLIDER_RANGE; value: TimeRangeSchema };

const timeRangeSchemaGenerator = ({ nullable = false }: { nullable: boolean }) =>
  yup.object().shape({
    type: yup.string().oneOf(Object.values(TimeRangeType))[nullable ? 'notRequired' : 'required'](),
    value: yup.mixed().when('type', ([type]) =>
      yup.lazy(() => {
        if (type === TimeRangeType.SLIDER_RANGE) {
          return timeRangeSliderSchema({
            nullable,
          });
        }

        if (type === TimeRangeType.DURATION) {
          return dropdownSchema.transform(v => Number(v))[nullable ? 'nullable' : 'required']();
        }

        return yup.mixed().notRequired();
      })
    ),
  });

export const timeRangeSchemaNonNullable = timeRangeSchemaGenerator({ nullable: false });
export const timeRangeSchemaNullable = timeRangeSchemaGenerator({ nullable: true });
