import React, {ChangeEvent, useEffect, useState} from 'react';
import {
  useCuisineActions,
  useDishActions,
  useDishDetailsActions,
  useSetActions,
} from 'state/hooks/UseActions';
import styles from 'routes/dishes/Dishes.module.scss';
import {useSelector} from 'state/hooks';
import {useHistory, useParams} from 'react-router-dom';
import {AuthInfoKeeper} from 'auth';
import Dish from 'entities/Dish';
import {Field, Form, Formik} from 'formik';
import {Loader, TextArea, TextField} from 'components';
import {useTranslation} from 'react-i18next';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Logo} from 'assets';
import {DropzoneArea} from 'material-ui-dropzone';
import Cuisine from 'entities/Cuisine';
import Set from 'entities/Set';

interface DishFormValues {
  name: string;
  description: string;
  weight: string;
  kal: string;
}

const Dishes: React.FC = () => {
  const actions = useDishDetailsActions();
  const history = useHistory();
  const {t} = useTranslation('dish');

  const {id} = useParams<{id: string | undefined}>();

  const [file, setFile] = useState<File>();
  const [showPreview, setShowPreview] = useState(false);
  const [ingredients, setIngredients] = useState<string>('');
  const [selectedSets, setSets] = useState<string[]>([]);
  const [isError, setError] = React.useState(false);
  const [isReady, setReady] = React.useState(true);
  const [isUniqueNationality, setUniqueNationality] = React.useState(true);
  const [isShowSets, setShowSets] = useState(false);

  useEffect(() => {
    AuthInfoKeeper.isAuthenticated().then((isAuthenticated) => {
      if (!isAuthenticated) {
        history.push('/auth');
      }
    });
  }, []);

  const dishActions = useDishActions();
  const setActions = useSetActions();
  const cuisineActions = useCuisineActions();
  const dishDetailsActions = useDishDetailsActions();

  const {dishes, sets, cuisines} = useSelector((state) => state);

  const setsByCuisines = (sets: Set[], cuisines: Cuisine[]) => {
    const setsByCuisinesArray: {cuisine: Cuisine; sets: Set[]}[] = cuisines.map(
      (cuisine) => {
        return {
          cuisine,
          sets: [],
        };
      },
    );

    return setsByCuisinesArray.map((item) => {
      return {
        cuisine: item.cuisine,
        sets: sets.filter((set) => set.cuisineId === item.cuisine.id),
      };
    });
  };

  useEffect(() => {
    dishActions.fetchDishes();
    cuisineActions.fetchCuisines();
    setSets([]);
    setIngredients('');
    setShowSets(false);
  }, []);

  useEffect(() => {
    if (id) {
      dishDetailsActions.fetchDishDetails(id);
      setActions.fetchSets();

      if (sets.isSuccess) {
        const dishSets = sets.sets
          .filter((item) => item.dishes.map((dish) => dish.id).includes(id))
          .map((set) => set.id);

        setSets(dishSets);
      }
    }
  }, [id]);

  const openCreateDish = () => {
    history.push('/dishes/create');
    setSets([]);
    setIngredients('');
    setShowSets(false);
    setError(false);
  };

  const openDish = (dish: Dish) => {
    history.push(`/dishes/${dish.id}`);

    setError(false);
    setIngredients(dish.ingredients.map((ingredient) => ingredient.name).join(', '));
    setShowSets(false);
  };

  const initialValues: DishFormValues =
    id && dishes.isSuccess
      ? dishes.dishes
          .filter((dish) => dish.id === id)
          .map((item) => {
            return {
              name: item.name,
              description: item.description,
              weight: item.weight,
              kal: item.kal,
            };
          })[0]
      : {
          name: '',
          description: '',
          weight: '',
          kal: '',
        };

  const nameUniquenessCheck = (dish: Dish, nationality: string) =>
    dish.name !== nationality;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const save = (values: DishFormValues) => {
    setError(false);
    setUniqueNationality(true);
    setReady(true);

    if (id === undefined && dishes.isSuccess) {
      if (
        file &&
        values.name &&
        values.description &&
        values.weight &&
        values.kal &&
        ingredients
      ) {
        if (dishes.dishes.every((dish: Dish) => nameUniquenessCheck(dish, values.name))) {
          setShowPreview(false);
          return actions.createDish({
            ...values,
            uploadFile: file,
            ingredients: ingredients.split(', '),
            sets: selectedSets,
          });
        }
      } else {
        setReady(false);
      }

      dishes.dishes.forEach((dish: Dish) => {
        if (dish.name === values.name) {
          setUniqueNationality(false);
        }
      });

      setError(true);
    }

    if (
      id &&
      values.name &&
      values.description &&
      values.weight &&
      values.kal &&
      ingredients &&
      selectedSets &&
      dishes.isSuccess
    ) {
      setShowPreview(false);
      return actions.updateDish({
        id,
        ...values,
        uploadFile: file || dishes.dishes.filter((dish) => dish.id === id)[0].image,
        ingredients: ingredients.split(', '),
        sets: selectedSets,
      });
    }
  };

  const dishList = (dishes: Dish[]) => {
    return (
      <List component="nav" aria-label="main mailbox folders" className={styles.list}>
        {dishes.map((dish: Dish) => (
          <ListItem
            key={dish.id}
            button
            selected={id === dish.id}
            onClick={() => openDish(dish)}
            className={styles.button}
          >
            <ListItemText primary={dish.name} />
          </ListItem>
        ))}
        <ListItem
          key="create"
          button
          selected={id === undefined}
          onClick={() => openCreateDish()}
          className={styles.button}
        >
          <ListItemText primary={t('createNewDish')} />
        </ListItem>
      </List>
    );
  };

  return (
    <div className={styles.pageContentContainer}>
      <div className={styles.mainContentHeader}>
        <h2 className={styles.pagesContainerTitle}>{t('dishes')}</h2>
      </div>
      <div className={styles.container}>
        <div className={styles.listContainer}>
          {dishes.isSuccess ? dishList(dishes.dishes) : <Loader />}
        </div>
        <div className={styles.editorContainer}>
          <Formik
            initialValues={initialValues}
            enableReinitialize
            onSubmit={(values, formActions) => {
              if (dishes && dishes.isSuccess) save(values);
              formActions.setSubmitting(false);
            }}
          >
            <Form className={styles.form}>
              <div className={styles.dropdownContainer}>
                {id ? (
                  dishes.isSuccess &&
                  dishes.dishes
                    .filter((dish) => dish.id === id)
                    .map((item) => (
                      <div className={styles.imageContainer}>
                        <div className={styles.imageWrapper}>
                          <img className={styles.image} src={item.image} alt="Dish" />
                        </div>
                      </div>
                    ))[0]
                ) : (
                  <div className={styles.imageContainer}>
                    <div className={styles.imageWrapper}>
                      <img className={styles.image} src={Logo} alt="Dish" />
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
                name="description"
                label={t('description')}
                type="description"
                id="description"
                as={TextArea}
                className={styles.form__field}
                control="textarea"
              />
              <Field
                variant="outlined"
                margin="normal"
                fullWidth
                name="weight"
                label={t('weight')}
                type="weight"
                id="weight"
                as={TextField}
                className={styles.form__field}
              />
              <Field
                variant="outlined"
                margin="normal"
                fullWidth
                name="kal"
                label={t('kal')}
                type="kal"
                id="kal"
                as={TextField}
                className={styles.form__field}
              />
              <Field
                variant="outlined"
                margin="normal"
                fullWidth
                name="ingredients"
                label={t('ingredients')}
                id="ingredients"
                as={TextField}
                className={styles.form__field}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setIngredients(event.target.value);
                }}
                value={ingredients}
              />
              <Field
                variant="outlined"
                margin="normal"
                fullWidth
                name="sets"
                label={t('sets')}
                type="sets"
                id="sets"
                as={TextField}
                className={styles.form__field}
                onClick={() => setShowSets(!isShowSets)}
                onChange={setSets}
                value={
                  sets.isSuccess &&
                  sets.sets
                    .filter((set) => selectedSets.includes(set.id))
                    .map((item) => item.name)
                    .join(', ')
                }
              />
              {isShowSets && (
                <ul className={styles.selectList}>
                  {cuisines.isSuccess &&
                    sets.isSuccess &&
                    setsByCuisines(sets.sets, cuisines.cuisines).map((element) => {
                      return (
                        <div className={styles.cuisineWithSets}>
                          <p>{element.cuisine.nationality}</p>
                          <ul>
                            {element.sets.map((item) => {
                              return (
                                // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
                                <li
                                  onClick={() => {
                                    const indexInArray = selectedSets.indexOf(item.id);

                                    if (indexInArray === -1) {
                                      setSets([...selectedSets, item.id]);
                                    } else {
                                      setSets([
                                        ...selectedSets.filter(
                                          (item, index) => index !== indexInArray,
                                        ),
                                      ]);
                                    }
                                  }}
                                  className={
                                    selectedSets.includes(item.id)
                                      ? styles.selectList__selectedItem
                                      : styles.selectList__item
                                  }
                                >
                                  {item.name}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      );
                    })}
                </ul>
              )}
              <div className={styles.buttons}>
                {id && (
                  <button
                    className={styles.deleteButton}
                    type="button"
                    onClick={() => dishDetailsActions.deleteDish(id)}
                  >
                    {t('delete')}
                  </button>
                )}
                <button className={styles.saveButton} type="submit">
                  Save
                </button>
              </div>
              {isError && (
                <div className={styles.errorMessages}>
                  {!isReady && <p>{t('filledFields')}</p>}
                  {!isUniqueNationality && <p>{t('uniqueFieldValue')}</p>}
                </div>
              )}
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Dishes;
