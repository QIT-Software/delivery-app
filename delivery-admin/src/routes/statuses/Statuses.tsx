import React, {useEffect, useState} from 'react';
import {useStatusActions, useStatusDetailsActions} from 'state/hooks/UseActions';
import styles from 'routes/statuses/Statuses.module.scss';
import {useSelector} from 'state/hooks';
import {useHistory, useParams} from 'react-router-dom';
import {AuthInfoKeeper} from 'auth';
import Status from 'entities/Status';
import {Field, Form, Formik} from 'formik';
import {Loader, TextField} from 'components';
import {useTranslation} from 'react-i18next';
import {List, ListItem} from '@material-ui/core';
import {DropzoneArea} from 'material-ui-dropzone';
import ListItemText from '@material-ui/core/ListItemText';
import {Logo} from 'assets';

interface StatusFormValues {
  name: string;
}

const Statuses: React.FC = () => {
  const actions = useStatusDetailsActions();
  const history = useHistory();
  const {t} = useTranslation('status');

  const [file, setFile] = useState<File>();
  const [showPreview, setShowPreview] = useState(false);
  const [isError, setError] = React.useState(false);
  const [isReady, setReady] = React.useState(true);
  const [isUniqueName, setUniqueName] = React.useState(true);

  useEffect(() => {
    AuthInfoKeeper.isAuthenticated().then((isAuthenticated) => {
      if (!isAuthenticated) {
        history.push('/auth');
      }
    });
  }, []);

  const statusActions = useStatusActions();
  const statusDetailsActions = useStatusDetailsActions();

  useEffect(() => {
    statusActions.fetchStatuses();
  }, []);

  const openCreateStatus = () => {
    history.push('/statuses/create');
    setError(false);
  };

  const {id} = useParams<{id: string | undefined}>();

  const data = useSelector((state) => state.statuses);

  const initialValues: StatusFormValues =
    id && data.isSuccess
      ? data.statuses
          .filter((status) => status.id === id)
          .map((item) => {
            return {
              name: item.name,
            };
          })[0]
      : {
          name: '',
        };

  useEffect(() => {
    if (id) statusDetailsActions.fetchStatusDetails(id);
  }, [id]);

  const openStatus = (status: Status) => {
    setError(false);
    history.push(`/statuses/${status.id}`);
  };

  const statuses = (statuses: Status[]) => {
    return (
      <List component="nav" aria-label="main mailbox folders" className={styles.list}>
        {statuses.map((status: Status) => (
          <ListItem
            key={status.id}
            button
            selected={id === status.id}
            onClick={() => openStatus(status)}
            className={styles.button}
          >
            <ListItemText primary={status.name} />
          </ListItem>
        ))}
        <ListItem
          key="create"
          button
          selected={id === undefined}
          onClick={() => openCreateStatus()}
          className={styles.button}
        >
          <ListItemText primary={t('createNewStatus')} />
        </ListItem>
      </List>
    );
  };

  const nameUniquenessCheck = (status: Status, name: string) => status.name !== name;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const save = (values: StatusFormValues) => {
    setError(false);
    setUniqueName(true);
    setReady(true);

    if (id === undefined && data.isSuccess) {
      if (file && values.name) {
        if (
          data.statuses.every((status: Status) =>
            nameUniquenessCheck(status, values.name),
          )
        ) {
          setShowPreview(false);
          return actions.createStatus({...values, uploadFile: file});
        }
      } else {
        setReady(false);
      }

      data.statuses.forEach((status: Status) => {
        if (status.name === values.name) {
          setUniqueName(false);
        }
      });

      setError(true);
    }

    if (id && values.name && data.isSuccess) {
      setShowPreview(false);
      return actions.updateStatus({
        id,
        ...values,
        uploadFile: file || data.statuses.filter((status) => status.id === id)[0].image,
      });
    }
  };

  return (
    <div className={styles.pageContentContainer}>
      <div className={styles.mainContentHeader}>
        <h2 className={styles.pagesContainerTitle}>{t('statuses')}</h2>
      </div>
      <div className={styles.container}>
        <div className={styles.listContainer}>
          {data.isSuccess ? statuses(data.statuses) : <Loader />}
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
                  data.statuses
                    .filter((status) => status.id === id)
                    .map((item) => (
                      <div className={styles.imageContainer}>
                        <div className={styles.imageWrapper}>
                          <img className={styles.image} src={item.image} alt="Status" />
                        </div>
                      </div>
                    ))[0]
                ) : (
                  <div className={styles.imageContainer}>
                    <div className={styles.imageWrapper}>
                      <img className={styles.image} src={Logo} alt="Status" />
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
              <div className={styles.buttons}>
                {id && (
                  <button
                    className={styles.deleteButton}
                    type="button"
                    onClick={() => statusDetailsActions.deleteStatus(id)}
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
                  {!isUniqueName && <p>{t('uniqueFieldValue')}</p>}
                </div>
              )}
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Statuses;
