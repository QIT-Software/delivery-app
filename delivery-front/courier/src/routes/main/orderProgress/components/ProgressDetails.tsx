import React from 'react';
import {Text, View, ViewProps} from 'react-native';
import {styles} from './ProgressDetails.styles';

export interface ProgressDetailsItemModel {
  id: string;
  value: string;
  status: string;
  statusColor: string;
}

export interface ProgressDetailsProps extends ViewProps {
  items: ProgressDetailsItemModel[];
}

export const ProgressDetails: React.FC<ProgressDetailsProps> = ({
  style,
  items,
  ...otherProps
}) => (
  <View style={[style, styles.container]} {...otherProps}>
    <Text style={styles.title}>Order(s) Status:</Text>
    {items.map((it) => (
      <View style={styles.itemContainer}>
        <Text style={styles.itemValue}>{it.value}</Text>
        <Text style={styles.itemStatus(it.statusColor)}>{it.status}</Text>
      </View>
    ))}
  </View>
);

export default ProgressDetails;
