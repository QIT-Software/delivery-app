import {FlatList, Text, TouchableOpacity, View, ViewProps} from 'react-native';
import React from 'react';
import styles from './DocumentList.style';
import {Document, DocumentsRevisionStatus} from 'entities/Documents';
import Image from 'client/src/components/image/Image';
import {useDocumentsActions} from 'state/courier/hooks/UseActions';
import {Document as AddDocument} from '../../../main/assets';

interface DocumentListProps extends ViewProps {
  title: string;
  status?: DocumentsRevisionStatus;
  documents: Document[];
  addDocumentPress: () => void;
}

const DocumentList: React.FC<DocumentListProps> = ({
  title,
  documents,
  addDocumentPress,
  status,
}) => {
  const actions = useDocumentsActions();
  const initialDocuments: Item[] = [
    ...documents.map<DocumentItem>((d) => ({type: 'document', ...d})),
  ];

  const checkStatus: boolean =
    !status ||
    status === DocumentsRevisionStatus.New ||
    status === DocumentsRevisionStatus.Rejected;

  const getItems = (): Item[] => {
    if (checkStatus) {
      initialDocuments.push({type: 'addButton'});
      return initialDocuments;
    }
    return initialDocuments;
  };

  type DocumentItem = {
    type: 'document';
  } & Document;

  type AddButtonItem = {
    type: 'addButton';
  };

  type Item = DocumentItem | AddButtonItem;

  const renderDocumentItem = (item: Document) => (
    <View style={styles.iconPositionRight}>
      {checkStatus ? (
        <TouchableOpacity onPress={() => actions.deleteDocument(item.id)}>
          <Image source={{uri: item.image}} style={styles.documentImageDelete} />
        </TouchableOpacity>
      ) : (
        <Image source={{uri: item.image}} style={styles.documentImage} />
      )}
    </View>
  );

  const renderAddButtonItem = () => (
    <TouchableOpacity onPress={() => addDocumentPress()}>
      <View style={styles.flexRow}>
        <TouchableOpacity
          onPress={() => {
            addDocumentPress();
          }}
        >
          <View style={styles.flexRow}>
            <Image source={AddDocument} style={styles.documentImage} />
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderItem = (item: Item) => {
    switch (item.type) {
      case 'document':
        return renderDocumentItem(item);
      case 'addButton':
        return renderAddButtonItem();
    }
  };

  return (
    <View style={styles.position}>
      <Text style={styles.text}>{title}</Text>
      <View>
        <FlatList
          data={getItems()}
          renderItem={({item}) => renderItem(item)}
          horizontal
          keyExtractor={(_item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default DocumentList;
