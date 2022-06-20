import React, {useEffect, useState} from 'react';
import {useCuisineActions, useCuisineDetailsActions} from 'state/hooks/UseActions';
import styles from 'routes/cuisines/Cuisines.module.scss';
import {useSelector} from 'state/hooks';
import {useHistory, useParams} from 'react-router-dom';
import {AuthInfoKeeper} from 'auth';
import Cuisine from 'entities/Cuisine';
import {Field, Form, Formik} from 'formik';
import {Loader, TextField} from 'components';
import {useTranslation} from 'react-i18next';
import {List, ListItem} from '@material-ui/core';
import {DropzoneArea} from 'material-ui-dropzone';
import ListItemText from '@material-ui/core/ListItemText';
import {Logo} from 'assets';

interface CuisineFormValues {
  nationality: string;
}

const Cuisines: React.FC = () => {
  const actions = useCuisineDetailsActions();
  const history = useHistory();
  const {t} = useTranslation('cuisine');

  const [file, setFile] = useState<File>();
  const [showPreview, setShowPreview] = useState(false);
  const [isError, setError] = useState(false);
  const [isReady, setReady] = useState(true);
  const [isUniqueNationality, setUniqueNationality] = useState(true);

  useEffect(() => {
    AuthInfoKeeper.isAuthenticated().then((isAuthenticated) => {
      if (!isAuthenticated) {
        history.push('/auth');
      }
    });
  }, []);

  const cuisineActions = useCuisineActions();
  const cuisineDetailsActions = useCuisineDetailsActions();

  useEffect(() => {
    cuisineActions.fetchCuisines();
  }, []);

  const openCreateCuisine = () => {
    history.push('/cuisines/create');
    setError(false);
  };

  const {id} = useParams<{id: string | undefined}>();

  const data = useSelector((state) => state.cuisines);

  const initialValues: CuisineFormValues =
    id && data.isSuccess
      ? data.cuisines
          .filter((cuisine) => cuisine.id === id)
          .map((item) => {
            return {
              nationality: item.nationality,
            };
          })[0]
      : {
          nationality: '',
        };

  useEffect(() => {
    if (id) cuisineDetailsActions.fetchCuisineDetails(id);
  }, [id]);

  const openCuisine = (cuisine: Cuisine) => {
    setError(false);
    history.push(`/cuisines/${cuisine.id}`);
  };

  const cuisines = (cuisines: Cuisine[]) => {
    return (
      <List component="nav" aria-label="main mailbox folders" className={styles.list}>
        {cuisines.map((cuisine: Cuisine) => (
          <ListItem
            key={cuisine.id}
            button
            selected={id === cuisine.id}
            onClick={() => openCuisine(cuisine)}
            className={styles.button}
          >
            <ListItemText primary={cuisine.nationality} />
          </ListItem>
        ))}
        <ListItem
          key="create"
          button
          selected={id === undefined}
          onClick={() => openCreateCuisine()}
          className={styles.button}
        >
          <ListItemText primary={t('createNewCuisine')} />
        </ListItem>
      </List>
    );
  };

  const nationalityUniquenessCheck = (cuisine: Cuisine, nationality: string) =>
    cuisine.nationality !== nationality;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const save = (values: CuisineFormValues) => {
    setError(false);
    setUniqueNationality(true);
    setReady(true);

    if (id === undefined && data.isSuccess) {
      if (file && values.nationality) {
        if (
          data.cuisines.every((cuisine: Cuisine) =>
            nationalityUniquenessCheck(cuisine, values.nationality),
          )
        ) {
          setShowPreview(false);
          return actions.createCuisine({...values, uploadFile: file});
        }
      } else {
        setReady(false);
      }

      data.cuisines.forEach((cuisine: Cuisine) => {
        if (cuisine.nationality === values.nationality) {
          setUniqueNationality(false);
        }
      });

      setError(true);
    }

    if (id && values.nationality && data.isSuccess) {
      setShowPreview(false);
      return actions.updateCuisine({
        id,
        ...values,
        uploadFile: file || data.cuisines.filter((cuisine) => cuisine.id === id)[0].image,
      });
    }
  };

  return (
    <div className={styles.pageContentContainer}>
      <div className={styles.mainContentHeader}>
        <h2 className={styles.pagesContainerTitle}>{t('cuisines')}</h2>
      </div>
      <div className={styles.container}>
        <div className={styles.listContainer}>
          {data.isSuccess ? cuisines(data.cuisines) : <Loader />}
        </div>
        <div className={styles.editorContainer}>
          <Formik
            initialValues={initialValues}
            enableReinitialize
            onSubmit={(values, formActions) => {
              if (data && data.isSuccess) save(values);
              formActions.setSubmitting(false);
            }}
          >
            <Form className={styles.form}>
              <div className={styles.dropdownContainer}>
                {id ? (
                  data.isSuccess &&
                  data.cuisines
                    .filter((cuisine) => cuisine.id === id)
                    .map((item) => (
                      <div className={styles.imageContainer}>
                        <div className={styles.imageWrapper}>
                          <img className={styles.image} src={item.image} alt="Cuisine" />
                        </div>
                      </div>
                    ))[0]
                ) : (
                  <div className={styles.imageContainer}>
                    <div className={styles.imageWrapper}>
                      <img className={styles.image} src={Logo} alt="Cuisine" />
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
                id="nationality"
                name="nationality"
                type="nationality"
                as={TextField}
                label={t('nationality')}
                className={styles.form__field}
              />
              <div className={styles.buttons}>
                {id && (
                  <button
                    className={styles.deleteButton}
                    type="button"
                    onClick={() => cuisineDetailsActions.deleteCuisine(id)}
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

export default Cuisines;
