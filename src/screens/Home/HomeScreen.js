// HomeScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { NOTES } from '../../../data/dummy-data.js';
import SearchBar from '../../components/SearchBar.js';

const HomeScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [filteredNotes, setFilteredNotes] = useState(NOTES);

  const searchNotes = text => {
    setSearch(text);
    if (text) {
      setFilteredNotes(NOTES.filter(note => note.content.includes(text)));
    } else {
      setFilteredNotes(NOTES);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <SearchBar onSearch={searchNotes} />
      <FlatList
        data={filteredNotes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('EditNote', { noteId: item.id })}>
            <Text>{item.content}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>Please add a new note</Text>}
      />
      <TouchableOpacity
        style={{ position: 'absolute', bottom: 20, right: 20, backgroundColor: 'blue', padding: 10 }}
        onPress={() => navigation.navigate('NewNote')}
      >
        <Text style={{ color: 'white' }}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
