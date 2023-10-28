import { ElementType } from 'react';
import { SupportedIconsEnum } from '@/types/enums';
import {
  AnchorOutlined,
  BuildOutlined,
  EventNote,
  FactCheckOutlined,
  HeadsetMicOutlined,
  HelpOutlineOutlined,
  InfoOutlined,
  LocalOfferOutlined,
  PersonOutline,
  WavesOutlined,
  DirectionsBike,
  AccountCircleOutlined,
  EmailOutlined,
  PhoneAndroidOutlined,
  CalendarTodayOutlined,
  Logout,
  DragIndicator,
  LocationOnOutlined,
  CalendarToday,
  TuneOutlined,
} from '@mui/icons-material';

import {
  BoatIcon,
  KayakIcon,
  HomeIcon,
  CampingIcon,
  CatIcon,
  MaximizeIcon,
  PeopleIcon,
  VelocityIcon,
  GoogleIcon,
  FacebookIcon,
  InstagramIcon,
  AppleIcon,
  OutlinedCall,
  OutlinedChat,
  OutlinedFacebook,
  OutlinedInstagram,
} from '@/assets';

export const SupportedIcons: { [k in SupportedIconsEnum]: ElementType } = {
  [SupportedIconsEnum.ANCHOR_OUTLINED]: AnchorOutlined,
  [SupportedIconsEnum.BUILD_OUTLINED]: BuildOutlined,
  [SupportedIconsEnum.EVENT_NOTE]: EventNote,
  [SupportedIconsEnum.FACT_CHECK_OUTLINED]: FactCheckOutlined,
  [SupportedIconsEnum.HEADSET_MIC_OUTLINED]: HeadsetMicOutlined,
  [SupportedIconsEnum.HELP_OUTLINE_OUTLINED]: HelpOutlineOutlined,
  [SupportedIconsEnum.INFO_OUTLINED]: InfoOutlined,
  [SupportedIconsEnum.LOCAL_OFFER_OUTLINED]: LocalOfferOutlined,
  [SupportedIconsEnum.PERSON_OUTLINE]: PersonOutline,
  [SupportedIconsEnum.WAVES_OUTLINED]: WavesOutlined,
  [SupportedIconsEnum.DIRECTIONS_BIKE]: DirectionsBike,
  [SupportedIconsEnum.BOAT]: BoatIcon,
  [SupportedIconsEnum.KAYAK]: KayakIcon,
  [SupportedIconsEnum.CABIN]: HomeIcon,
  [SupportedIconsEnum.CAMPING]: CampingIcon,
  [SupportedIconsEnum.CAT]: CatIcon,
  [SupportedIconsEnum.MAXIMIZE]: MaximizeIcon,
  [SupportedIconsEnum.PEOPLE]: PeopleIcon,
  [SupportedIconsEnum.VELOCITY]: VelocityIcon,
  [SupportedIconsEnum.GOOGLE]: GoogleIcon,
  [SupportedIconsEnum.FACEBOOK]: FacebookIcon,
  [SupportedIconsEnum.INSTAGRAM]: InstagramIcon,
  [SupportedIconsEnum.APPLE]: AppleIcon,
  [SupportedIconsEnum.OUTLINED_CALL]: OutlinedCall,
  [SupportedIconsEnum.OUTLINED_CHAT]: OutlinedChat,
  [SupportedIconsEnum.OUTLINED_FACEBOOK]: OutlinedFacebook,
  [SupportedIconsEnum.OUTLINED_INSTAGRAM]: OutlinedInstagram,
  [SupportedIconsEnum.ACCOUNT_CIRCLE_OUTLINED]: AccountCircleOutlined,
  [SupportedIconsEnum.EMAIL_OUTLINED]: EmailOutlined,
  [SupportedIconsEnum.PHONE_ANDROID_OUTLINED]: PhoneAndroidOutlined,
  [SupportedIconsEnum.CALENDAR_TODAY_OUTLINED]: CalendarTodayOutlined,
  [SupportedIconsEnum.LOG_OUT]: Logout,
  [SupportedIconsEnum.DRAG_INDICATOR]: DragIndicator,
  [SupportedIconsEnum.LOCATION_OUTLINED]: LocationOnOutlined,
  [SupportedIconsEnum.CALENDAR_TODAY]: CalendarToday,
  [SupportedIconsEnum.TUNE_OUTLINED]: TuneOutlined,
};
