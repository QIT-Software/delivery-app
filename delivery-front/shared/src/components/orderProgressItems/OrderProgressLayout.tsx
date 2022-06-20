import React, {useEffect, useState} from 'react';
import styles from './OrderProgressLayout.styles';
import {
  FlatList,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Card, ErrorPlaceholder} from 'components/index';
import OrderProgressLayoutState, {
  OrderProgressLayoutError,
} from 'components/orderProgressItems/OrderProgressLayoutState';
import {
  BackButton,
  CurrentOrdersMenu,
  DropDownIcon,
  Group,
} from 'components/orderProgressItems/assets';
import {isClient, isCourier} from 'app/Config';
import {useRouterActions} from 'state/hooks/UseActions';
import {useSelector} from 'react-redux';
import State from 'state/courier/entities/State';
import {useCourierOrdersActions} from 'state/courier/hooks/UseActions';
import CourierOrderItem from 'components/courierOrderItem/CourierOrderItem';
import {useTranslation} from 'react-i18next';

interface OrderProgressLayoutProps {
  children: OrderProgressLayoutState;
}

const OrderProgressLayout: React.FC<OrderProgressLayoutProps> = ({children}) => {
  const {
    //
    background,
    progress,
    progressExpandedDetails,
    bottomElements,
    error,
  } = children;
  const [visible, setVisible] = useState(false);
  const [visiblePopUp, setVisiblePopUp] = useState(false);
  const routerActions = useRouterActions();
  const actions = useCourierOrdersActions();
  const {t} = useTranslation('order');

  useEffect(() => {
    actions.fetchCourierOrders();
  }, []);

  const state = useSelector((state: State) => state.courierOrdersList);
  const renderError = (error: OrderProgressLayoutError) => (
    <ErrorPlaceholder message={error.message} refresh={error.refresh} />
  );

  const renderProgress = () => {
    return (
      <View>
        {isClient() && <Card>{progress}</Card>}
        {isCourier() && <Card containerStyle={styles.courier}>{progress}</Card>}
        {progressExpandedDetails && visible && (
          <Card
            visible={visible}
            style={styles.progressDetailsCard}
            containerStyle={styles.progressDetailsCardContainer}
          >
            {progressExpandedDetails}
          </Card>
        )}
        {isClient() && (
          <>
            {!visible ? (
              <TouchableOpacity
                style={styles.progressDetailsButton}
                activeOpacity={0.8}
                onPress={() => setVisible(!visible)}
              >
                <Image source={DropDownIcon} style={styles.progressDetailsButtonImage} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.progressDetailsButton}
                activeOpacity={0.8}
                onPress={() => setVisible(!visible)}
              >
                <Image source={Group} style={styles.progressDetailsButtonImage} />
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    );
  };

  const renderContent = () => (
    <>
      {isCourier() && (
        <View style={styles.layoutContainer}>
          <View style={styles.background}>{background}</View>
          <View style={styles.topContainer}>
            <TouchableOpacity
              onPress={() => {
                routerActions.goBack();
              }}
            >
              <View style={styles.topContainerItem}>
                <Image source={BackButton} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setVisiblePopUp(!visiblePopUp);
              }}
            >
              <View style={styles.topContainerItem}>
                <Image source={CurrentOrdersMenu} />
              </View>
            </TouchableOpacity>
          </View>
          <Modal animationType="fade" visible={visiblePopUp} transparent>
            <TouchableWithoutFeedback onPress={() => setVisiblePopUp(!visiblePopUp)}>
              <View style={styles.modalOuter}>
                <View style={styles.containerPopUp}>
                  <Text>{t('orders')}</Text>
                  <FlatList
                    // contentContainerStyle={styles.scroll}
                    data={state.isSuccess ? state.courierOrdersList : []}
                    numColumns={1}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => <CourierOrderItem order={item} />}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
          <View style={styles.progressContainer}>{renderProgress()}</View>
        </View>
      )}
      {isClient() && (
        <View style={styles.layoutContainer}>
          <View style={styles.background}>{background}</View>
          <View style={styles.progressContainer}>{renderProgress()}</View>
        </View>
      )}
    </>
  );

  return (
    <>
      <View style={styles.container}>
        {!error ? renderContent() : renderError(error)}
      </View>
      <View style={styles.bottomContainer}>{bottomElements}</View>
    </>
  );
};

export default OrderProgressLayout;
