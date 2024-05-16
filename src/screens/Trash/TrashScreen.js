import React from 'react';
import { View, FlatList, Text, Button, TouchableOpacity } from 'react-native';
import { TRASH, NOTES } from '../../../data/dummy-data';

const TrashScreen = ({ navigation }) => {
  const restoreNote = (note) => {
    TRASH.splice(TRASH.indexOf(note), 1);
    NOTES.push(note);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={TRASH}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Text>{item.content}</Text>
            <Button title="Restore" onPress={() => restoreNote(item)} />
          </View>
        )}
        ListEmptyComponent={<Text>Trash is empty</Text>}
      />
      <Button title="Empty Trash" color="red" onPress={() => {
        TRASH.length = 0;
        navigation.goBack();
      }} />
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default TrashScreen;
