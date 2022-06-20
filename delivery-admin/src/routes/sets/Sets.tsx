import React, {useEffect, useState} from 'react';
import {
  useCuisineActions,
  useDishActions,
  useSetActions,
  useSetDetailsActions,
  useStatusActions,
} from 'state/hooks/UseActions';
import styles from 'routes/sets/Sets.module.scss';
import {useSelector} from 'state/hooks';
import {useHistory, useParams} from 'react-router-dom';
import {AuthInfoKeeper} from 'auth';
import Set from 'entities/Set';
import {Field, Form, Formik} from 'formik';
import {Loader, TextField} from 'components';
import {useTranslation} from 'react-i18next';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Logo} from 'assets';
import {DropzoneArea} from 'material-ui-dropzone';
import Cuisine from 'entities/Cuisine';

interface SetFormValues {
  name: string;
  priceCents: string;
}

const Sets: React.FC = () => {
  const actions = useSetDetailsActions();
  const history = useHistory();
  const {t} = useTranslation('set');

  const [file, setFile] = useState<File>();
  const [showPreview, setShowPreview] = useState(false);
  const [cuisine, setCuisine] = useState<Cuisine>();
  const [selectedDishes, setDishes] = useState<string[]>([]);
  const [selectedStatuses, setStatuses] = useState<string[]>([]);
  const [isError, setError] = useState(false);
  const [isReady, setReady] = useState(true);
  const [isUniqueSetName, setUniqueSetName] = useState(true);
  const [isShowCuisines, setShowCuisines] = useState(false);
  const [isShowStatuses, setShowStatuses] = useState(false);
  const [isShowDishes, setShowDishes] = useState(false);

  useEffect(() => {
    AuthInfoKeeper.isAuthenticated().then((isAuthenticated) => {
      if (!isAuthenticated) {
        history.push('/auth');
      }
    });
  }, []);

  const setActions = useSetActions();
  const setDetailsActions = useSetDetailsActions();
  const cuisineActions = useCuisineActions();
  const statusActions = useStatusActions();
  const dishActions = useDishActions();

  useEffect(() => {
    setActions.fetchSets();
    cuisineActions.fetchCuisines();
    statusActions.fetchStatuses();
    dishActions.fetchDishes();
  }, []);

  const openCreateSet = () => {
    history.push('/sets/create');
    setError(false);
    setDishes([]);
    setCuisine(undefined);
    setStatuses([]);
    setShowStatuses(false);
    setShowCuisines(false);
    setShowDishes(false);
  };

  const {id} = useParams<{id: string | undefined}>();

  const {cuisines, sets, statuses, dishes} = useSelector((state) => state);

  const initialValues: SetFormValues =
    id && sets.isSuccess
      ? sets.sets
          .filter((set) => set.id === id)
          .map((item) => {
            return {
              name: item.name,
              priceCents: item.priceCents.toString(),
            };
          })[0]
      : {
          name: '',
          priceCents: '',
        };

  useEffect(() => {
    if (id) setDetailsActions.fetchSetDetails(id);
  }, [id]);

  const openSet = (set: Set, cuisines: Cuisine[]) => {
    setError(false);
    if (id) {
      setCuisine(cuisines.filter((item) => item.id === set.cuisineId)[0]);
    }
    setDishes(set.dishes.map((dish) => dish.id));
    setStatuses([...set.statuses.map((stat) => stat.id)]);
    setShowStatuses(false);
    setShowCuisines(false);
    setShowDishes(false);
    history.push(`/sets/${set.id}`);
  };

  const setsList = (sets: Set[]) => {
    return (
      <List component="nav" aria-label="main mailbox folders" className={styles.list}>
        {cuisines.isSuccess &&
          sets.map((set: Set) => (
            <ListItem
              key={set.id}
              button
              selected={id === set.id}
              onClick={() => openSet(set, cuisines.cuisines)}
              className={styles.button}
            >
              <ListItemText primary={set.name} />
            </ListItem>
          ))}
        <ListItem
          key="create"
          button
          selected={id === undefined}
          onClick={() => openCreateSet()}
          className={styles.button}
        >
          <ListItemText primary={t('createNewSet')} />
        </ListItem>
      </List>
    );
  };

  const nameUniquenessCheck = (set: Set, nationality: string) => set.name !== nationality;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const save = (values: SetFormValues) => {
    setError(false);
    setUniqueSetName(true);
    setReady(true);

    if (id === undefined && sets.isSuccess) {
      if (file && cuisine && values.name && values.priceCents) {
        if (sets.sets.every((set: Set) => nameUniquenessCheck(set, values.name))) {
          setShowPreview(false);
          return actions.createSet({
            ...values,
            uploadFile: file,
            dishes: selectedDishes,
            statuses: selectedStatuses,
            cuisineId: cuisine.id,
          });
        }
      } else {
        setReady(false);
      }

      sets.sets.forEach((set: Set) => {
        if (set.name === values.name) {
          setUniqueSetName(false);
        }
      });

      setError(true);
    }

    if (
      id &&
      cuisine &&
      values.name &&
      values.priceCents &&
      selectedDishes &&
      selectedStatuses &&
      sets.isSuccess
    ) {
      setShowPreview(false);
      return actions.updateSet({
        id,
        ...values,
        uploadFile: file || sets.sets.filter((set) => set.id === id)[0].image,
        dishes: selectedDishes,
        statuses: selectedStatuses,
        cuisineId: cuisine.id,
      });
    }
  };

  return (
    <div className={styles.pageContentContainer}>
      <div className={styles.mainContentHeader}>
        <h2 className={styles.pagesContainerTitle}>{t('sets')}</h2>
      </div>
      <div className={styles.container}>
        <div className={styles.listContainer}>
          {sets.isSuccess ? setsList(sets.sets) : <Loader />}
        </div>
        <div className={styles.editorContainer}>
          <Formik
            initialValues={initialValues}
            enableReinitialize
            onSubmit={(values, formActions) => {
              if (sets && sets.isSuccess) save(values);
              formActions.setSubmitting(false);
            }}
          >
            <Form className={styles.form}>
              <div className={styles.dropdownContainer}>
                {id ? (
                  sets.isSuccess &&
                  sets.sets
                    .filter((set) => set.id === id)
                    .map((item) => (
                      <div className={styles.imageContainer}>
                        <div className={styles.imageWrapper}>
                          <img className={styles.image} src={item.image} alt="Set" />
                        </div>
                      </div>
                    ))[0]
                ) : (
                  <div className={styles.imageContainer}>
                    <div className={styles.imageWrapper}>
                      <img className={styles.image} src={Logo} alt="Set" />
                    </div>
                  </div>
                )}
                <DropzoneArea
                  filesLimit={1}
                  onChange={(files: File[]) => {
                    setFile(files[0]);
                    setShowPreview(true);
                  }}
                  initialFiles={[]}
                  showPreviewsInDropzone={showPreview}
                />
              </div>
              <Field
                variant="outlined"
                fullWidth
                margin="normal"
                id="name"
                name="name"
                type="name"
                as={TextField}
                label={t('name')}
                className={styles.form__field}
              />
              <Field
                variant="outlined"
                margin="normal"
                fullWidth
                name="priceCents"
                label={t('priceCents')}
                type="priceCents"
                id="priceCents"
                as={TextField}
                className={styles.form__field}
              />
              <Field
                variant="outlined"
                margin="normal"
                fullWidth
                name="cuisine"
                label={t('cuisine')}
                type="cuisine"
                id="cuisine"
                as={TextField}
                className={styles.form__field}
                onClick={() => setShowCuisines(!isShowCuisines)}
                onChange={setCuisine}
                value={
                  // eslint-disable-next-line no-nested-ternary
                  cuisine
                    ? cuisine.nationality
                    : id &&
                      sets.isSuccess &&
                      cuisines[sets.sets.filter((set) => set.id === id)[0].cuisineId]
                }
              />
              {isShowCuisines && (
                <ul className={styles.selectList}>
                  {cuisines.isSuccess &&
                    cuisines.cuisines.map((item) => (
                      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
                      <li
                        onClick={() => {
                          setCuisine(item);
                          setShowCuisines(false);
                        }}
                        className={
                          cuisine && cuisine.id === item.id
                            ? styles.selectList__selectedItem
                            : styles.selectList__item
                        }
                      >
                        {item.nationality}
                      </li>
                    ))}
                </ul>
              )}
              <Field
                variant="outlined"
                margin="normal"
                fullWidth
                name="statuses"
                label={t('statuses')}
                type="statuses"
                id="statuses"
                as={TextField}
                className={styles.form__field}
                onClick={() => setShowStatuses(!isShowStatuses)}
                onChange={setStatuses}
                value={
                  statuses.isSuccess &&
                  statuses.statuses
                    .filter((stat) => selectedStatuses.includes(stat.id))
                    .map((item) => item.name)
                    .join(', ')
                }
              />
              {isShowStatuses && (
                <ul className={styles.selectList}>
                  {statuses.isSuccess &&
                    statuses.statuses.map((item) => (
                      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
                      <li
                        onClick={() => {
                          const indexInArray = selectedStatuses.indexOf(item.id);

                          if (
                            selectedStatuses.filter((stat) => stat !== item.id).length ===
                            selectedStatuses.length
                          ) {
                            setStatuses([...selectedStatuses, item.id]);
                          } else {
                            setStatuses([
                              ...selectedStatuses.filter(
                                (item, index) => index !== indexInArray,
                              ),
                            ]);
                          }
                        }}
                        className={
                          selectedStatuses.indexOf(item.id) !== -1
                            ? styles.selectList__selectedItem
                            : styles.selectList__item
                        }
                      >
                        {item.name}
                      </li>
                    ))}
                </ul>
              )}
              <Field
                variant="outlined"
                margin="normal"
                fullWidth
                name="dishes"
                label={t('dishes')}
                type="dishes"
                id="dishes"
                as={TextField}
                className={styles.form__field}
                onClick={() => setShowDishes(!isShowDishes)}
                onChange={setDishes}
                value={
                  dishes.isSuccess &&
                  dishes.dishes
                    .filter((dish) => selectedDishes.includes(dish.id))
                    .map((item) => item.name)
                    .join(', ')
                }
              />
              {isShowDishes && (
                <ul className={styles.selectList}>
                  {dishes.isSuccess &&
                    dishes.dishes.map((item) => (
                      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
                      <li
                        onClick={() => {
                          const indexInArray = selectedDishes.indexOf(item.id);

                          if (indexInArray === -1) {
                            setDishes([...selectedDishes, item.id]);
                          } else {
                            setDishes([
                              ...selectedDishes.filter(
                                (item, index) => index !== indexInArray,
                              ),
                            ]);
                          }
                        }}
                        className={
                          selectedDishes.includes(item.id)
                            ? styles.selectList__selectedItem
                            : styles.selectList__item
                        }
                      >
                        {item.name}
                      </li>
                    ))}
                </ul>
              )}
              <div className={styles.buttons}>
                {id && (
                  <button
                    className={styles.deleteButton}
                    type="button"
                    onClick={() => setDetailsActions.deleteSet(id)}
                  >
                    {t('delete')}
                  </button>
                )}
                <button className={styles.saveButton} type="submit">
                  {t('save')}
                </button>
              </div>
              {isError && (
                <div className={styles.errorMessages}>
                  {!isReady && <p>{t('filledFields')}</p>}
                  {!isUniqueSetName && <p>{t('uniqueFieldValue')}</p>}
                </div>
              )}
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Sets;
