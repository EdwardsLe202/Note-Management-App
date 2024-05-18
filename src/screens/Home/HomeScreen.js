// HomeScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { NOTES, LABELS, COLORS } from '../../../data/dummy-data.js';
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

  
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('EditNote', { noteId: item.id })}>
      <View style={styles.noteContainer}>
        <View>
          <Text style={styles.noteContent}>{item.content}</Text>
          {/* {item.labels && (
            <View style={styles.labelContainer}>
              {item.labels.map(labelId => {
                const label = LABELS.find(label => label.id === labelId);
                if (label) {
                  return (
                    <View key={label.id} style={[styles.label, { backgroundColor: COLORS[LABELS.indexOf(label)] }]}>
                      <Text style={styles.labelText}>{label.name}</Text>
                    </View>
                  );
                }
              })}
            </View>
          )} */}
          <Text style={styles.createdAt}>
            {item.createdAt ? `Created on: ${item.createdAt.toLocaleString()}` : 'Created on: Unknown'}
          </Text>
        </View>
        <Text style={[styles.importance, { color: item.isImportant ? 'red' : 'black' }]}>
          {item.isImportant ? 'Important' : ''}
        </Text>
      </View>
    </TouchableOpacity>
  );
  

  return (
    <View style={styles.container}>
      <SearchBar onSearch={searchNotes} />
      <FlatList
        data={filteredNotes}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyList}>Please add a new note</Text>}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('NewNote')}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  noteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  noteContent: {
    fontSize: 18,
    fontWeight: 'bold',
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
    color: 'white',
  },
  createdAt: {
    color: 'gray',
  },
  importance: {
    fontWeight: 'bold',
  },
  emptyList: {
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 25,
  },
  addButtonText: {
    color: 'white',
    fontSize: 24,
  },
});

export default HomeScreen;
