import {ImageSourcePropType} from 'react-native';

export default interface MenuComponent {
  status: boolean;
  title: string;
  emptyImage: ImageSourcePropType;
  activeImage: ImageSourcePropType;
  navigateAction: () => void;
}
