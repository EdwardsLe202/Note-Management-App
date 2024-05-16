import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { NOTES } from '../../../data/dummy-data';

const EditNote = ({ route, navigation }) => {
  const { noteId } = route.params;
  const note = NOTES.find(n => n.id === noteId);
  const [content, setContent] = useState(note.content);

  const saveNote = () => {
    note.content = content;
    note.updateAt = new Date();
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
      <Button title="Save Note" onPress={saveNote} />
      <Button title="Delete Note" color="red" onPress={() => {
        NOTES.splice(NOTES.indexOf(note), 1);
        navigation.goBack();
      }} />
    </View>
  );
};

export default EditNote;
