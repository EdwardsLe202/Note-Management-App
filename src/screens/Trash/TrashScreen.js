// TrashScreen.js
import React, { useContext, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { NotesContext } from '../../components/NotesContext';
import { COlORPICKER, COLOR, HEIGHT } from '../../theme/theme';
import { LABELS } from '../../../data/dummy-data';

const TrashScreen = () => {
  const { trashNotes, restoreNote, deleteNote, restoreAllNotes, emptyTrash } = useContext(NotesContext);
  const [selectedNote, setSelectedNote] = useState(null);

  const handleRestoreNote = (note) => {
    restoreNote(note.id);
    setSelectedNote(null);
  };

  const handleDeleteNote = (note) => {
    deleteNote(note.id);
    setSelectedNote(null);
  };

  const handleEmptyTrash = () => {
    Alert.alert('Confirm', 'Are you sure you want to delete all notes permanently?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Empty Trash', onPress: () => emptyTrash() }
    ]);
  };

  const handleRestoreAll = () => {
    restoreAllNotes();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedNote(item)}>
      <View style={styles.noteContainer}>
        <View>
          <Text style={styles.noteContent}>{item.content}</Text>
          <View style={styles.labelContainer}>
            {item.labelIds.map(labelId => {
              const label = LABELS.find(label => label.id === labelId);
              return (
                <View key={label.id} style={[styles.label, { backgroundColor: 'gray' }]}>
                  <Text style={styles.labelText}>{label.label}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Trash</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity onPress={handleRestoreAll} style={styles.headerButton}>
            <Text style={styles.headerButtonText}>Restore</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleEmptyTrash} style={styles.headerButton}>
            <Text style={styles.headerButtonText}>Empty</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={trashNotes}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyList}>Trash is empty</Text>}
      />
      {selectedNote && (
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => handleRestoreNote(selectedNote)} style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Restore</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteNote(selectedNote)} style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Delete permanently</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerButtons: {
    flexDirection: 'row',
  },
  headerButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: COLOR.primaryRedHex,
    borderRadius: 5,
  },
  headerButtonText: {
    color: COLOR.primaryWhiteHex,
    fontWeight: 'bold',
  },
  noteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: HEIGHT(2),
    backgroundColor: COLOR.primaryBlue,
    padding: HEIGHT(2.5),
    borderRadius: HEIGHT(2),
  },
  noteContent: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLOR.primaryWhiteHex,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  label: {
    borderRadius: 5,
    padding: 3,
    marginRight: 5,
  },
  labelText: {
    color: COLOR.primaryWhiteHex,
  },
  emptyList: {
    textAlign: 'center',
  },
  actions: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    padding: 10,
    backgroundColor: COLOR.primaryRedHex,
    borderRadius: 5,
  },
  actionButtonText: {
    color: COLOR.primaryWhiteHex,
    fontWeight: 'bold',
  },
});

export default TrashScreen;
