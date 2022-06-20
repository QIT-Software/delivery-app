import React, {useEffect} from 'react';
import styles from './Profile.styles';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {useAuthActions} from 'state/client/hooks/UseActions';
import {
  useRouterActions as useEditActions,
  useDocumentsActions,
  useRouterActions as useRouterCourierActions,
} from 'state/courier/hooks/UseActions';
import {useRouterActions} from 'state/hooks/UseActions';
import BackBtn from 'routes/main/assets/BackBtn.png';
import {LoadableContainer} from 'state/entities/LoadableContainer';
import {Session} from 'entities/Session';
import {RequireLoadable} from 'components';
import RequireSession from 'components/require/RequireSession';
import {useSelector} from 'react-redux';
import State from 'state/courier/entities/State';
import DocumentList from './components/DocumentList';
import {
  DocumentsGroup,
  DocumentsGroups,
  DocumentsRevision,
  DocumentsRevisionStatus,
} from 'entities/Documents';
import ImagePickerPopUp from 'routes/main/imagePicker/ImagePickerPopUp';
import {Route, useHistory} from 'react-router';
import useAppState from 'react-native-appstate-hook';
import {EditProfile, ProfileImage} from 'routes/settings/assets';
import Image from 'client/src/components/image/Image';
import DocumentPickerPopUp from 'routes/main/documentPicker/DocumentPickerPopUp';
import LinearGradient from 'react-native-linear-gradient';

interface UserProfileProps {
  session: LoadableContainer<Session>;
}

const Profile: React.FC<UserProfileProps> = ({session}) => {
  const routerActions = useRouterActions();
  const routerCourierActions = useRouterCourierActions();
  const editActions = useEditActions();
  const actions = useAuthActions();
  const documentActions = useDocumentsActions();
  const history = useHistory();
  const {revision, groups} = useSelector((state: State) => state.documents);
  useEffect(() => {
    actions.fetchSession({history});
    documentActions.fetchDocuments();
  }, []);

  useAppState({
    onForeground: () => documentActions.fetchDocuments(),
  });

  const submit = () => {
    if (revision) {
      documentActions.submit();
    }
  };

  const createGroup = (groups: DocumentsGroups, title: string, group: DocumentsGroup) => {
    return {
      title,
      group,
      documents: groups[group],
    };
  };

  const groupsCreator = (groups: DocumentsGroups) => [
    createGroup(groups, 'Employment Agreement', 'employmentAgreement'),
    // createGroup(groups, 'Drivers License', 'driversLicense'),
  ];

  const renderButton = ({status}: DocumentsRevision) => {
    if (status === DocumentsRevisionStatus.VerificationRequested) {
      return (
        <TouchableOpacity onPress={() => documentActions.fetchDocuments()}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#FF8C29', '#FF2D55']}
            style={styles.btn}
          >
            <Text style={styles.btnText}>Refresh</Text>
          </LinearGradient>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity onPress={() => submit()}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#FF8C29', '#FF2D55']}
          style={styles.btn}
        >
          <Text style={styles.btnText}>Confirm</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const renderRevisionStatus = ({status, comment}: DocumentsRevision) => {
    const documentStatus = () => {
      switch (status) {
        case DocumentsRevisionStatus.New:
          return 'New';
        case DocumentsRevisionStatus.Approved:
          return 'Approved';
        case DocumentsRevisionStatus.ChangesRequested:
          return 'Changes Requested';
        case DocumentsRevisionStatus.Rejected:
          return 'Rejected';
        case DocumentsRevisionStatus.VerificationRequested:
          return 'Verification Requested';
      }
    };
    return (
      <View style={styles.statusContainer}>
        <Text style={{...styles.statusTitle, ...styles.rejectStatus}}>Status:</Text>
        <Text
          style={{
            ...styles.statusTitle,
            ...styles.rejectStatus,
            ...styles.statusText,
          }}
        >
          {documentStatus()}
        </Text>
        {!!comment && (
          <View style={styles.commentContainer}>
            <Text
              style={{
                ...styles.statusComment,
              }}
            >
              {comment}
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.profileContainer}>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => routerCourierActions.navigateToMain()}>
          <Image source={BackBtn} style={styles.backBtn} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Profile</Text>
        </View>
        <TouchableOpacity onPress={() => editActions.navigateToEditUser()}>
          <Image source={EditProfile} style={styles.editBtn} />
        </TouchableOpacity>
      </View>
      <RequireLoadable data={session}>
        {({account}) => (
          <>
            <View style={styles.profileHeaderContainer}>
              {!account.user.image ? (
                <Image source={ProfileImage} style={styles.profileImage} />
              ) : (
                <Image source={{uri: account.user.image}} style={styles.profileImage} />
              )}

              <Text style={styles.profileName}>{account.user.name}</Text>
            </View>
            <View style={styles.profileInnerContainer}>
              <View style={styles.profileInner}>
                <Text style={styles.profileInnerTitle}>Email</Text>
                <Text style={styles.profileInnerInfo}>{account.info.email}</Text>
              </View>
              <View style={styles.profileInner}>
                <Text style={styles.profileInnerTitle}>Phone number</Text>
                <Text style={styles.profileInnerInfo}>{account.info.phoneNumber}</Text>
              </View>
              <View style={styles.profileInnerDocuments}>
                {/* <Text style={styles.profileInnerTitle}>Document</Text> */}
                {/* <View style={styles.profileInnerInfoDocument}> */}
                {/* <Image source={Document} style={styles.imageAdd} /> */}
                {/* <TouchableOpacity */}
                {/*  onPress={() => */}
                {/*    documentActions.chooseDocument({ */}
                {/*      group: document.groups.employmentAgreement., */}
                {/*    }) */}
                {/*  } */}
                {/* > */}
                {/*  <Image source={AddDocument} /> */}
                {/* </TouchableOpacity> */}
                <FlatList
                  data={groupsCreator(groups)}
                  renderItem={({item, index}) => (
                    <View>
                      <DocumentList
                        status={revision && revision.status}
                        title={item.title}
                        documents={
                          !item.documents ? item.documents[index] : item.documents
                        }
                        addDocumentPress={() => {
                          documentActions.chooseDocument(item.group);
                          routerActions.navigateToDocumentPicker(account.user.id);
                        }}
                      />
                    </View>
                  )}
                  keyExtractor={(_item, index) => index.toString()}
                />
                {revision && renderButton(revision)}
              </View>
            </View>
            {revision && renderRevisionStatus(revision)}
          </>
        )}
      </RequireLoadable>
      <TouchableOpacity style={styles.logoutContainer} onPress={() => actions.logout()}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
      <Route path="/profile/imagePicker" component={ImagePickerPopUp} />
      <Route path="/settings/:id/documentPickerPopUp">
        <DocumentPickerPopUp />
      </Route>
    </View>
  );
};

// export default Profile;

export default () => (
  <RequireSession>{(session) => <Profile session={session} />}</RequireSession>
);
