// HomeScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { NOTES, LABELS, COLORS } from '../../../data/dummy-data.js';
import SearchBar from '../../components/SearchBar.js';
import { FontAwesome } from '@expo/vector-icons';
import { COLOR, HEIGHT } from '../../theme/theme.js';
import { AntDesign } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [filteredNotes, setFilteredNotes] = useState(NOTES);
  const [searchResult, setSearchResult] = useState(true);


  const searchNotes = text => {
    const lowercaseText = text.toLowerCase(); 
    setSearch(text);
    if (text) {
      const filtered = NOTES.filter(note => note.content.toLowerCase().includes(lowercaseText)); 
      setFilteredNotes(filtered);
      setSearchResult(filtered.length > 0);
    } else {
      setFilteredNotes(NOTES);
      setSearchResult(true);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); 
  };

  
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('EditNote', { noteId: item.id })}>
      <View style={styles.noteContainer}>
        <View>
          <View style={styles.timeContainer}>
            <View style={[styles.colorIndicator, { backgroundColor: item.color || 'gray' }]}></View>
            <Text style={styles.createdAt}>{formatDate(item.updateAt)}</Text>
          </View>
          <View style={styles.labelContainer}>
            {item.labelIds.map(labelId => {
              const label = LABELS.find(label => label.id === labelId);
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
        <View style={styles.bookmarkContainer}>
          {item.isBookmarked && <FontAwesome name="bookmark" size={24} color={COLOR.primaryRedHex} />}
        </View>
      </View>
    </TouchableOpacity>
  );
  

  return (
    <View style={styles.container}>
      <SearchBar onSearch={searchNotes} />
      {searchResult ? ( 
        <FlatList
          data={filteredNotes}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={styles.emptyList}>Please Add A New Note</Text>}
        />
      ) : (
        <Text style={styles.emptyList}>Note Not Found</Text>
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('NewNote')}
      >
        <AntDesign name="pluscircle" size={50} color={COLOR.secondaryYellowHex} />
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
    marginBottom: HEIGHT(2),
    backgroundColor: COLOR.primaryBlue,
    padding: HEIGHT(2.5),
    borderRadius: HEIGHT(2),

  },
  noteContent: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLOR.primaryWhiteHex
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
  createdAt: {
    color: COLOR.primaryWhiteHex,
  },
  importance: {
    fontWeight: 'bold',
  },
  emptyList: {
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: HEIGHT(7),
    right: 20,
    padding: 10,
 
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
    flexWrap: 'wrap'
  }
});

export default HomeScreen;