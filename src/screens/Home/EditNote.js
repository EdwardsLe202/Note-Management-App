//EditNote.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NOTES, LABELS } from '../../../data/dummy-data';
import { FontAwesome } from '@expo/vector-icons';
import { COLOR } from '../../theme/theme';

const EditNote = ({ route, navigation }) => {
  const { noteId, updateNotes } = route.params || {}; // Safely access noteId and updateNotes
  const note = NOTES.find(n => n.id === noteId);

  if (!note) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Note not found!</Text>
      </View>
    );
  }

  const [content, setContent] = useState(note.content);
  const [isBookmarked, setIsBookmarked] = useState(note.isBookmarked);

  

  const toggleBookmark = () => {
    setIsBookmarked(prevState => !prevState);
  };

  const saveNote = () => {
    note.content = content;
    note.isBookmarked = isBookmarked;
    note.updateAt = new Date();
    updateNotes(); // Call the callback to update the notes in HomeScreen
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Enter note content"
        value={content}
        onChangeText={setContent}
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />
      <View style={styles.labelContainer}>
        <Text style={styles.labelTitle}>Labels:</Text>
        <View style={styles.labels}>
          {note.labelIds.map(labelId => {
            const label = LABELS.find(label => label.id === labelId);
            return (
              <View key={label.id} style={[styles.label, { backgroundColor: 'gray' }]}>
                <Text style={styles.labelText}>{label.label}</Text>
              </View>
            );
          })}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={toggleBookmark} style={styles.bookmarkButton}>
          <FontAwesome name="bookmark" size={24} color={isBookmarked ? COLOR.primaryRedHex : 'gray'} />
        </TouchableOpacity>
        <Button title="Save Note" onPress={saveNote} />
      </View>
      <Button title="Delete Note" color="red" onPress={() => {
        NOTES.splice(NOTES.indexOf(note), 1);
        updateNotes(); // Call the callback to update the notes in HomeScreen
        navigation.goBack();
      }} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  bookmarkButton: {
    padding: 10,
  },
  labelContainer: {
    marginBottom: 20,
  },
  labelTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  labels: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  label: {
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 8,
    marginRight: 5,
    marginBottom: 5,
    backgroundColor: 'gray',
  },
  labelText: {
    color: 'white',
  },
});

export default EditNote;
