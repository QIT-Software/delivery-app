import {StyleSheet, TextStyle} from 'react-native';

const baseStyles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    alignSelf: 'center',
    fontWeight: '600',
    marginBottom: 8,
    fontSize: 15,
  },
  itemContainer: {
    marginVertical: 5,
    flexDirection: 'row',
  },
  itemValue: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
  },
  itemStatus: {
    fontSize: 12,
    fontWeight: '600',
  },
});

const itemStatus = (color: string): TextStyle => ({
  ...baseStyles.itemStatus,
  color,
});

const styles = {
  ...baseStyles,
  itemStatus,
};

export {styles};
