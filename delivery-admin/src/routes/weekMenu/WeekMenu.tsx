import React, {useEffect, useState} from 'react';
import {useCuisineActions, useSetActions} from 'state/hooks/UseActions';
import styles from 'routes/weekMenu/WeekMenu.module.scss';
import {useSelector} from 'state/hooks';
import {useHistory, useParams} from 'react-router-dom';
import {AuthInfoKeeper} from 'auth';
import Cuisine from 'entities/Cuisine';
import Set from 'entities/Set';
import {Loader} from 'components';
import {useTranslation} from 'react-i18next';
import {List, ListItem} from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';

const WeekMenu: React.FC = () => {
  const history = useHistory();
  const {t} = useTranslation('weekMenu');

  const cuisineActions = useCuisineActions();
  const setActions = useSetActions();

  const [setIds, setSetIds] = useState<string[]>([]);

  const {id} = useParams<{id: string | undefined}>();

  const {cuisines, sets} = useSelector((state) => state);

  useEffect(() => {
    AuthInfoKeeper.isAuthenticated().then((isAuthenticated) => {
      if (!isAuthenticated) {
        history.push('/auth');
      }
    });
  }, []);

  useEffect(() => {
    setSetIds([]);
    cuisineActions.fetchCuisines();
  }, []);

  useEffect(() => {
    setSetIds([]);
    if (id) setActions.fetchSetsByCuisineId(id);
  }, [id]);

  const setSelectedSetToState = (set: Set, day: string) => {
    if (setIds.includes(set.id)) {
      if (sets.isSuccess) {
        sets.sets = [
          ...sets.sets.filter((item) => item.name !== set.name),
          {...set, day: undefined},
        ];
      }
      setSetIds(setIds.filter((item) => item !== set.id));
    } else {
      if (sets.isSuccess) {
        sets.sets = [
          ...sets.sets.filter((item) => item.name !== set.name),
          {...set, day},
        ];
      }
      setSetIds([...setIds, set.id]);
    }
  };

  const openCuisineWeekMenu = (cuisine: Cuisine, sets: Set[]) => {
    history.push(`/weekMenu/cuisine/${cuisine.id}`);

    setSetIds([]);

    if (id) {
      sets
        .filter((item) => {
          return item.cuisineId === cuisine.id;
        })
        .forEach((set) => {
          setSetIds([...setIds, set.id]);
        });
    }
  };

  const save = (sets: Set[]) => {
    return setActions.distributeSetsByDays(
      sets.map((set) => {
        return {setId: set.id, day: set.day};
      }),
    );
  };

  const cuisinesList = (cuisines: Cuisine[], sets: Set[]) => {
    return (
      <List component="nav" aria-label="main mailbox folders" className={styles.list}>
        {cuisines.map((cuisine: Cuisine) => (
          <ListItem
            key={cuisine.id}
            button
            selected={id === cuisine.id}
            onClick={() => id !== cuisine.id && openCuisineWeekMenu(cuisine, sets)}
            className={styles.button}
          >
            <ListItemText primary={cuisine.nationality} />
          </ListItem>
        ))}
      </List>
    );
  };

  const tableColumn = (title: string, dayName: string, sets: Set[]) => {
    return (
      <div>
        <div className={styles.weekDay}>
          <span>{title}</span>
        </div>
        <ul className={styles.selectList}>
          {sets
            .filter((item) => item.day === dayName || !item.day)
            .map((set) => (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
              <li
                key={`set_${dayName}_${set.id}`}
                className={
                  set.day ? styles.selectList__selectedItem : styles.selectList__item
                }
                onClick={() => setSelectedSetToState(set, dayName)}
              >
                <span>{set.name}</span>
              </li>
            ))}
        </ul>
      </div>
    );
  };

  const setsTable = (sets: Set[]) => {
    return (
      <div className={styles.weekTable}>
        {tableColumn(t('sunday'), 'Sunday', sets)}
        {tableColumn(t('monday'), 'Monday', sets)}
        {tableColumn(t('tuesday'), 'Tuesday', sets)}
        {tableColumn(t('wednesday'), 'Wednesday', sets)}
        {tableColumn(t('thursday'), 'Thursday', sets)}
        {tableColumn(t('friday'), 'Friday', sets)}
        {tableColumn(t('saturday'), 'Saturday', sets)}
      </div>
    );
  };

  return (
    <div className={styles.content}>
      <div className={styles.pageContentContainer}>
        <div className={styles.mainContentHeader}>
          <h2 className={styles.pagesContainerTitle}>{t('cuisines')}</h2>
        </div>
        <div className={styles.container}>
          <div className={styles.listContainer}>
            {cuisines.isSuccess && sets.isSuccess ? (
              cuisinesList(cuisines.cuisines, sets.sets)
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
      <div>
        <div className={styles.editorContainer}>
          <div className={styles.mainContentHeader}>
            <h2 className={styles.weekTableTitle}>{t('sets')}</h2>
          </div>
          {id && (sets.isSuccess ? setsTable(sets.sets) : <Loader />)}
          <div className={styles.buttons}>
            <button
              className={styles.saveButton}
              type="submit"
              onClick={() =>
                id && cuisines.isSuccess && sets.isSuccess && save(sets.sets)
              }
            >
              {t('save')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeekMenu;
