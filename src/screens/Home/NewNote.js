import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { NOTES } from '../../../data/dummy-data';
import Note from '../../../models/Note';

const NewNote = ({ navigation }) => {
  const [content, setContent] = useState('');

  const addNote = () => {
    const newNote = new Note(
      `n${NOTES.length + 1}`,
      null,
      [],
      content,
      new Date(),
      false
    );
    NOTES.push(newNote);
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
      <Button title="Save Note" onPress={addNote} />
    </View>
  );
};

export default NewNote;
