// TrashScreen.js
import React, { useState, useContext, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { NotesContext } from '../../components/NotesContext.js';
import { LabelsContext } from '../../components/LabelsContext.js';  // Import LabelsContext
import { Ionicons } from '@expo/vector-icons';
import { COLOR, HEIGHT } from '../../theme/theme.js';
import AlertModal from '../../components/AlertModal.js';

const TrashScreen = ({ navigation, route }) => {
  const { trashNotes, restoreNote, restoreAllNotes, emptyTrash, deleteNote } = useContext(NotesContext);
  const { labels } = useContext(LabelsContext);  // Use LabelsContext
  const [localTrashNotes, setLocalTrashNotes] = useState(trashNotes);
  const [selectedNote, setSelectedNote] = useState(null);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({});

  useEffect(() => {
    if (route.params?.updatedTrashNotes) {
      setLocalTrashNotes(route.params.updatedTrashNotes);
    }
  }, [route.params?.updatedTrashNotes]);

  useEffect(() => {
    setLocalTrashNotes(trashNotes);
  }, [trashNotes]);

  const handleRestoreNote = (noteId) => {
    restoreNote(noteId);
    const updatedTrashNotes = trashNotes.filter(n => n.id !== noteId);
    setLocalTrashNotes(updatedTrashNotes);
    setSelectedNote(null);
  };

  const handleDeleteNote = (noteId) => {
    setAlertConfig({
      title: 'Delete Note',
      message: 'Are you sure you want to permanently delete this note? This action cannot be undone.',
      showCancelButton: true,
      showConfirmButton: true,
      onCancelPress: () => setAlertVisible(false),
      onConfirmPress: () => {
        deleteNote(noteId);
        const updatedTrashNotes = trashNotes.filter(n => n.id !== noteId);
        setLocalTrashNotes(updatedTrashNotes);
        setSelectedNote(null);
        setAlertVisible(false);
      },
    });
    setAlertVisible(true);
  };

  const handleRestoreAll = () => {
    restoreAllNotes();
  };

  const handleEmptyTrash = () => {
    setAlertConfig({
      title: 'Empty Trash',
      message: 'Are you sure you want to empty the trash? This action cannot be undone.',
      showCancelButton: true,
      showConfirmButton: true,
      onCancelPress: () => setAlertVisible(false),
      onConfirmPress: () => {
        emptyTrash();
        setLocalTrashNotes([]);
        setAlertVisible(false);
      },
    });
    setAlertVisible(true);
  };

  const handleNotePress = (noteId) => {
    setSelectedNote(noteId);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleNotePress(item.id)}>
      <View style={styles.noteContainer}>
        <View>
          <View style={styles.timeContainer}>
            <View style={[styles.colorIndicator, { backgroundColor: item.color || 'gray' }]}></View>
            <Text style={styles.createdAt}>{new Date(item.updateAt).toLocaleString()}</Text>
          </View>
          <View style={styles.labelContainer}>
            {item.labelIds.map(labelId => {
              const label = labels.find(label => label.id === labelId);
              if (label) {
                return (
                  <View key={label.id} style={[styles.label, { backgroundColor: 'gray' }]}>
                    <Text style={styles.labelText}>{label.label}</Text>
                  </View>
                );
              }
              return null;
            })}
          </View>
          <Text style={styles.noteContent}>{item.content}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleRestoreAll}>
          <Text style={styles.buttonText}>Restore All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleEmptyTrash}>
          <Text style={styles.buttonText}>Empty Trash</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={localTrashNotes}
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
      <AlertModal
        open={alertVisible}
        title={alertConfig.title}
        message={alertConfig.message}
        showCancelButton={alertConfig.showCancelButton}
        showConfirmButton={alertConfig.showConfirmButton}
        cancelText="Cancel"
        confirmText="OK"
        onCancelPress={alertConfig.onCancelPress}
        onConfirmPress={alertConfig.onConfirmPress}
        onClose={() => setAlertVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    padding: 10,
    backgroundColor: COLOR.primaryRedHex,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
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
    color: COLOR.primaryWhiteHex,
  },
  createdAt: {
    color: COLOR.primaryWhiteHex,
  },
  emptyList: {
    textAlign: 'center',
    marginTop: 20,
  },
  actions: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: HEIGHT(2)
  },
  actionButton: {
    padding: 10,
    backgroundColor: COLOR.primaryRedHex,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  actionButtonText: {
    color: 'white',
    textAlign: 'center',
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
  colorIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});

export default TrashScreen;
