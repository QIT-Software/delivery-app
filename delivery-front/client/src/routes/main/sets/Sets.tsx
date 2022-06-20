import React, {useEffect, useState} from 'react';
import styles from './Sets.styles';
import {FlatList, Image, Modal, Text, TouchableOpacity, View} from 'react-native';
import {SetItem} from '../../../components';
import BackBtn from '../assets/BackBtn.png';
import {useChooseSetActions, useRouterActions} from 'state/client/hooks/UseActions';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import State from 'state/client/entities/State';
import {Route, useParams} from 'react-router';
import SetDishes from 'routes/main/popUp/setDishes/SetDishes';
import Basket from '../../../components/Basket/Basket';
import Set from 'entities/Set';

const Sets: React.FC = () => {
  const routerActions = useRouterActions();
  const actions = useChooseSetActions();
  const {t} = useTranslation('cuisineSets');

  const {id} = useParams();
  const {sets} = useSelector((state: State) => state);

  const [setsByDay, setSetsByDay] = useState<Set[]>([]);

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
  const filterSets = (day: string) => {
    if (sets.isSuccess) {
      sets.sets.filter((item) => {
        if (item.day === day) {
          setSetsByDay((prevState) => [...prevState, item]);
        }
        return true;
      });
    }
  };

  const fetchSets = () => {
    if (!sets.isSuccess) {
      actions.fetchSets(id);
    }
    if (sets.isSuccess) {
      actions.fetchSets(id);
    }
  };

  useEffect(() => {
    fetchSets();
  }, []);

  useEffect(() => {
    const today = new Date();
    const day = getWeekDay(today);
    setActive(day);
    filterSets(day);
  }, [sets]);

  const handleFilterSets = async (value: CurrentDate) => {
    await setSetsByDay([]);
    setActive(value);
    filterSets(value);
  };
  const renderWeekDay = (value: CurrentDate, label: string) => (
    <TouchableOpacity
      onPress={() => handleFilterSets(value)}
      style={styles.tabStyle(value === 'Saturday')}
    >
      <Text style={styles.tabTitleStyle(value === active)}>{label}</Text>
    </TouchableOpacity>
  );

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
          <Text style={styles.title}>{t('chooseSet')}</Text>
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
        {/* <TouchableOpacity */}
        {/*  style={styles.tab} */}
        {/*  onPress={async () => { */}
        {/*    await setSetsByDay([]); */}
        {/*    filterSets('Monday'); */}
        {/*  }} */}
        {/* > */}
        {/*  <Text style={[styles.tabTitle, styles.tabTitleActive]}>Mon</Text> */}
        {/* </TouchableOpacity> */}
        {/* <TouchableOpacity style={styles.tab}> */}
        {/*  <Text style={styles.tabTitle}>Tue</Text> */}
        {/* </TouchableOpacity> */}
        {/* <TouchableOpacity style={styles.tab}> */}
        {/*  <Text style={styles.tabTitle}>Wed</Text> */}
        {/* </TouchableOpacity> */}
        {/* <TouchableOpacity style={styles.tab}> */}
        {/*  <Text style={styles.tabTitle}>Thu</Text> */}
        {/* </TouchableOpacity> */}
        {/* <TouchableOpacity */}
        {/*  style={styles.tab} */}
        {/*  onPress={async () => { */}
        {/*    await setSetsByDay([]); */}
        {/*    filterSets('Friday'); */}
        {/*  }} */}
        {/* > */}
        {/*  <Text style={styles.tabTitle}>Fri</Text> */}
        {/* </TouchableOpacity> */}
        {/* <TouchableOpacity style={styles.tab}> */}
        {/*  <Text style={styles.tabTitle}>Sat</Text> */}
        {/* </TouchableOpacity> */}
        {/* <TouchableOpacity style={[styles.tab, styles.lastTab]}> */}
        {/*  <Text style={styles.tabTitle}>Sun</Text> */}
        {/* </TouchableOpacity> */}
      </View>
      <View style={styles.setsContainer}>
        <FlatList
          contentContainerStyle={styles.scroll}
          data={setsByDay}
          numColumns={1}
          keyExtractor={(item) => item.id}
          renderItem={({item, index}) => (
            <SetItem set={item} blockStyle={styles.setContainer} index={index} />
          )}
        />
      </View>
      <Route path="/main/set/:id">
        <Modal animationType="fade" transparent>
          <SetDishes />
        </Modal>
      </Route>
      <Basket style={styles.basketItem} />
    </View>
  );
};

export default Sets;
