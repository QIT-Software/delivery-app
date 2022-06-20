import {StyleSheet, Dimensions} from 'react-native';

const {height} = Dimensions.get('window');
const styles = StyleSheet.create({
  layoutContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: '12%',
  },

  background: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  mapContainer: {
    flex: 1,
  },
  bottomContainerCourier: {},
  bottomContainer: {
    paddingHorizontal: 25,
    paddingVertical: 12,
    position: 'absolute',
    bottom: 30,
    right: 0,
    left: 0,
  },

  centerStatusCardContainer: {
    marginTop: 20,
    justifyContent: 'center',
    marginHorizontal: '2%',
  },
  safeArea: {
    backgroundColor: '#032CA6',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  arrowsContainer: {
    backgroundColor: 'white',
    borderTopColor: '#CDCDCD',
    borderTopWidth: 1,
  },
  mainContainer: {
    borderColor: 'gray',
    borderWidth: 0.2,
    backgroundColor: 'white',
    elevation: 0.8,
    overflow: 'hidden',
  },
  downIcon: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottomPanel: {
    borderTopColor: '#CDCDCD',
    borderTopWidth: 1,
    maxHeight: 245 + height - 683,
  },

  icon: {
    width: 25,
    height: 15,
  },

  // region Progress
  progressContainer: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  progressDetailsCard: {
    marginHorizontal: 10,
    marginTop: -8,
    zIndex: -1,
    elevation: 8,
  },
  progressDetailsCardContainer: {},
  progressDetailsButton: {
    height: 50,
    alignSelf: 'center',
    overflow: 'hidden',
    // zIndex: -2,
    elevation: 1,
  },
  progressDetailsButtonImage: {
    marginTop: -11,
  },
  courier: {
    position: 'absolute',
    top: height - 240,
    left: 0,
    right: 0,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    left: 18,
    top: 50,
    right: 18,
    zIndex: 100,
  },
  topContainerItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
    borderRadius: 10,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3,

    elevation: 16,
  },
  modalOuter: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  containerPopUp: {
    backgroundColor: '#FFFFFF',
    opacity: 1,
    marginHorizontal: 50,
    borderRadius: 10,
    padding: 15,
  },
  // endregion
});

export default styles;
