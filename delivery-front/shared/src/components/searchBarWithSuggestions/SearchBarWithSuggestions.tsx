import React from 'react';
import {View, FlatList, Text} from 'react-native';
import Modal from 'react-native-modal';
import {Card, Button, AuthInputField} from 'components';
import {CloseIcon, SearchIcon} from './assets';
import styles from './SearchBarWithSuggestions.styles';
import LinearGradient from 'react-native-linear-gradient';

interface SearchBarWithSuggestions {
  showPopUp: boolean;
  setShowPopUp: (status: boolean) => void;
}
const SearchBarWithSuggestions: React.FC<SearchBarWithSuggestions> = ({
  showPopUp,
  setShowPopUp,
}) => {
  return (
    <Modal
      isVisible={showPopUp}
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationOutTiming={100}
      hasBackdrop
      backdropOpacity={0.4}
      onBackdropPress={() => setShowPopUp(false)}
    >
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#FF8C29', '#FF2D55']}
        style={styles.closeButton}
      >
        <Button
          visualStyle="none"
          rightImage={CloseIcon}
          onPress={() => {
            setShowPopUp(false);
          }}
          style={styles.closeButtonImg}
        />
      </LinearGradient>
      <Card style={styles.container}>
        <View style={styles.innerContainerSearchBar}>
          <View style={styles.searchInputContainer}>
            <AuthInputField
              placeholder="Enter address"
              placeholderTextColor="#B1B1B1"
              isEditable
              textStyle={styles.searchBarText}
              type="none"
              // style={styles.addressContainer}
              onChangeText={() => {}}
            />
            <Button
              visualStyle="none"
              rightImage={SearchIcon}
              onPress={() => {}}
              wrapperStyle={styles.searchButton}
            />
          </View>
        </View>
        <View>
          <FlatList
            data={[
              {id: '1', name: 'Home'},
              {id: '2', name: 'Work'},
              {id: '3', name: '129 N Mountain View Ave'},
              {id: '4', name: '4371 Melrose Ave'},
              {id: '5', name: '129 N Mountain View Ave'},
              {id: '6', name: '129 N Mountain View Ave'},
              {id: '7', name: '4371 Melrose Ave'},
              {id: '8', name: '129 N Mountain View Ave'},
            ]}
            renderItem={({item}) => (
              <View>
                <Text style={styles.textSuggestions}>{item.name}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.contentContainerStyle}
          />
        </View>
      </Card>
    </Modal>
  );
};

export default SearchBarWithSuggestions;
