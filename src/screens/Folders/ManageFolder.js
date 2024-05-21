import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { FOLDERS, NOTES } from '../../../data/dummy-data';
import { Ionicons } from '@expo/vector-icons';
import { COLOR, HEIGHT } from '../../theme/theme';

const ManageFolderScreen = ({ route, navigation }) => {
  const { folderId } = route.params;
  const folder = FOLDERS.find(f => f.id === folderId);
  const [folderNotes, setFolderNotes] = useState([]);

  useEffect(() => {
    if (folder) {
      const notes = NOTES.filter(note => folder.noteIds.includes(note.id));
      setFolderNotes(notes);
    }
  }, [folder]);

  const renderNoteItem = ({ item }) => (
    <View style={styles.noteItem}>
      <Text style={styles.noteContent}>{item.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={folderNotes}
        keyExtractor={item => item.id}
        renderItem={renderNoteItem}
        ListEmptyComponent={<Text style={styles.emptyList}>No notes in this folder..</Text>}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => { /* Handle add new note to this folder */ }}>
        <Ionicons name="add-circle" size={50} color={COLOR.secondaryYellowHex} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  noteItem: {
    padding: HEIGHT(2),
    marginBottom: HEIGHT(2),
    backgroundColor: COLOR.primaryWhiteHex,
    borderRadius: HEIGHT(1),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  noteContent: {
    fontSize: 18,
  },
  addButton: {
    position: 'absolute',
    bottom: HEIGHT(7),
    right: 20,
  },
  emptyList: {
    textAlign: 'center',
    marginTop: HEIGHT(2),
  },
});

export default ManageFolderScreen;
