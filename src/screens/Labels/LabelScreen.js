// LabelScreen.js
import React, { useState } from 'react';
import { View, FlatList, Text, Button } from 'react-native';
import { LABELS } from '../../../data/dummy-data';
import Label from '../../../models/Label';
import SearchBar from '../../components/SearchBar';

const LabelScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [filteredLabels, setFilteredLabels] = useState(LABELS);

  const addLabel = () => {
    const newLabel = new Label(`l${LABELS.length + 1}`, search);
    LABELS.push(newLabel);
    setFilteredLabels([...LABELS]);
    setSearch('');
  };

  const searchLabels = text => {
    setSearch(text);
    if (text) {
      setFilteredLabels(LABELS.filter(label => label.label.includes(text)));
    } else {
      setFilteredLabels(LABELS);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <SearchBar onSearch={searchLabels} />
      <Button title="Add Label" onPress={addLabel} />
      <FlatList
        data={filteredLabels}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Text>{item.label}</Text>
        )}
        ListEmptyComponent={<Text>No labels found</Text>}
      />
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default LabelScreen;
