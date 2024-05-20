//LabelScreen.js
import React, { useState } from 'react';
import { View, FlatList, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { LABELS } from '../../../data/dummy-data';
import LabelModal from './LabelModal';
import SearchBar from '../../components/SearchBar';

const LabelScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [filteredLabels, setFilteredLabels] = useState(LABELS);
  const [labels, setLabels] = useState(LABELS);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(null);

  const searchLabels = text => {
    setSearch(text);
    if (text) {
      setFilteredLabels(labels.filter(label => label.label.includes(text)));
    } else {
      setFilteredLabels(labels);
    }
  };

  const saveLabelHandler = (id, text) => {
    if (id) {
      if (text) {
        setLabels(currentLabels => currentLabels.map(label => label.id === id ? { ...label, label: text } : label));
      } else {
        setLabels(currentLabels => currentLabels.filter(label => label.id !== id));
      }
    } else {
      const newLabel = { id: `l${labels.length + 1}`, label: text };
      setLabels(currentLabels => [...currentLabels, newLabel]);
    }
    setFilteredLabels(labels);
  };

  const openModalHandler = label => {
    setSelectedLabel(label);
    setModalVisible(true);
  };

  const closeModalHandler = () => {
    setSelectedLabel(null);
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.labelContainer} onPress={() => openModalHandler(item)}>
      <Text>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SearchBar onSearch={searchLabels} />
      <FlatList
        data={filteredLabels}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No labels found</Text>}
      />
      <Button title="New Label" onPress={() => openModalHandler(null)} />
      <Button title="Go Back" onPress={() => navigation.goBack()} />
      <LabelModal
        visible={modalVisible}
        onClose={closeModalHandler}
        onSave={saveLabelHandler}
        initialLabel={selectedLabel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  labelContainer: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
});

export default LabelScreen;
