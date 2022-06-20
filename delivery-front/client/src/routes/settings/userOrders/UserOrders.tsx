import React, {useEffect, useState} from 'react';
import styles from './UserOrders.styles';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {useRouterActions, useUserOrdersActions} from 'state/client/hooks/UseActions';
import {useSelector} from 'react-redux';
import State from 'state/client/entities/State';
import Order from 'entities/Order';
import {BackBtn} from 'routes/auth/assets';
import UserOrderItem from 'client/src/components/userOrderItem/UserOrderItem';

export interface UniqueOrder {
  order: Order;
  quantity: number;
}

const UserOrders: React.FC = () => {
  const routerActions = useRouterActions();
  const actions = useUserOrdersActions();

  const {userOrders} = useSelector((state: State) => state);

  const [ordersByDay, setOrdersByDay] = useState<Order[]>([]);

  type CurrentDate =
    | 'Sunday'
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday'
    | 'Saturday';

  const getWeekDay = (day: Date): CurrentDate => {
    const days: CurrentDate[] = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    return days[day.getDay()];
  };

  const [active, setActive] = useState<CurrentDate>('Friday');
  //
  const filterOrders = (day: CurrentDate) => {
    if (userOrders.isSuccess) {
      userOrders.userOrders.filter((item) => {
        if (getWeekDay(new Date(item.date)) === day) {
          setOrdersByDay((prevState) => [...prevState, item]);
        }
        return true;
      });
    }
  };

  const fetchOrders = () => {
    if (!userOrders.isSuccess) {
      actions.fetchUserOrders();
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    const today = new Date();
    const day = getWeekDay(today);
    setActive(day);
    filterOrders(day);
  }, [userOrders]);

  const handleFilterSets = async (value: CurrentDate) => {
    await setOrdersByDay([]);
    setActive(value);
    filterOrders(value);
  };
  const renderWeekDay = (value: CurrentDate, label: string) => (
    <TouchableOpacity
      onPress={() => handleFilterSets(value)}
      style={styles.tabStyle(value === 'Saturday')}
    >
      <Text style={styles.tabTitleStyle(value === active)}>{label}</Text>
    </TouchableOpacity>
  );

  const uniqueOrders: UniqueOrder[] = [];

  const uniqueOrderCreator = (order: Order): UniqueOrder => ({
    order,
    quantity: 0,
  });

  ordersByDay.forEach((order, index) => {
    if (!index) {
      uniqueOrders.push(uniqueOrderCreator(order));
    }
    let isAdded = false;
    uniqueOrders?.forEach((uOrder, index) => {
      if (uOrder.order.set.name === order.set.name) {
        uniqueOrders[index].quantity += 1;
        isAdded = true;
      }
    });
    if (!isAdded) {
      uniqueOrders.push(uniqueOrderCreator(order));
    }
  });

  return (
    <View style={styles.cuisinesContainer}>
      <View style={styles.topContainer}>
        <TouchableOpacity
          onPress={() => routerActions.goBack()}
          style={styles.backBtnContainer}
        >
          <Image source={BackBtn} style={styles.backBtn} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Your Orders</Text>
        </View>
      </View>
      <View style={styles.tabsContainer}>
        {renderWeekDay('Sunday', 'Sun')}
        {renderWeekDay('Monday', 'Mon')}
        {renderWeekDay('Tuesday', 'Tue')}
        {renderWeekDay('Wednesday', 'Wed')}
        {renderWeekDay('Thursday', 'Thu')}
        {renderWeekDay('Friday', 'Fri')}
        {renderWeekDay('Saturday', 'Sat')}
      </View>
      <View style={styles.setsContainer}>
        <FlatList
          contentContainerStyle={styles.scroll}
          data={uniqueOrders}
          numColumns={1}
          keyExtractor={(item) => item.order.id}
          renderItem={({item}) => <UserOrderItem order={item} />}
        />
      </View>
    </View>
  );
};

export default UserOrders;
