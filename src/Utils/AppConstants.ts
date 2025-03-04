import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Dimensions, PixelRatio, Platform} from 'react-native';

export const ScreenSize = Dimensions.get('screen');
const templateWidth = 375;
const templateHeight = 812;

export type ScreenProps = NativeStackScreenProps<any, any>;
export const fullDate = 'Y-MM-DD HH:mm:ss.SSS Z';
const widthRatio = ScreenSize.width / templateWidth;
const heightRatio = ScreenSize.height / templateHeight;
export const normalized = (value: number) =>
  PixelRatio.roundToNearestPixel(value * widthRatio);
export const hv = (value: number) =>
  PixelRatio.roundToNearestPixel(value * heightRatio);

export const formFieldsHeight =
  Platform.OS == 'android' ? normalized(50) : normalized(55);
export const AppHorizontalMargin = normalized(15);

export const AppImages = {
  user: require('../Ui/assets/images/user.png'),
  calender: require('../Ui/assets/images/calendar.png'),
  time: require('../Ui/assets/images/time.png'),
  check: require('../Ui/assets/images/check.png'),
  menu: require('../Ui/assets/images/menu.png'),
  notification: require('../Ui/assets/images/notification.png'),
  dots: require('../Ui/assets/images/dots.png'),
  close: require('../Ui/assets/images/close.png'),
};

export const AppColors = {
  black: {
    black: '#000000',
    common: '#3C3F43',
    bg: '#181818',
  },
  white: {
    white: '#ffffff',
  },
  themeColor: {
    dark: '#DC384A',
    light: '#FE4C4C',
  },
  randomColors: {
    green: '#26AD5F',
    purple: '#8C4EA8',
    yellow: '#FEB102',
    blue: '#097F9A',
  },
  grey: {
    light: '#eeeeee',
    dark: '#909090',
  },
};

export const eventsList = [
  {
    title: 'Monthly Attendance',
    icon: AppImages.check,
    value: '00',
    tintColor: AppColors.randomColors.purple,
  },
  {
    title: 'Monthly Hours',
    icon: AppImages.time,
    value: '00',
    tintColor: AppColors.randomColors.blue,
  },
  {
    title: 'Monthly Late',
    icon: AppImages.user,
    value: '00:00',
    tintColor: AppColors.randomColors.green,
  },
  {
    title: 'Remaining Leaves',
    icon: AppImages.calender,
    value: '1',
    tintColor: AppColors.randomColors.yellow,
  },
];
