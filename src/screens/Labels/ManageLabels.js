import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { LABELS } from '../../../data/dummy-data';

const ManageLabels = ({ route, navigation }) => {
  const { labels, updateLabels } = route.params;
  const [selectedLabels, setSelectedLabels] = useState(labels);

  const toggleLabel = (labelId) => {
    setSelectedLabels((prevSelected) => {
      if (prevSelected.includes(labelId)) {
        return prevSelected.filter((id) => id !== labelId);
      } else {
        return [...prevSelected, labelId];
      }
    });
  };

  const saveLabels = () => {
    updateLabels(selectedLabels);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Labels</Text>
      <FlatList
        data={LABELS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.labelItem,
              selectedLabels.includes(item.id) && styles.selectedLabel,
            ]}
            onPress={() => toggleLabel(item.id)}
          >
            <Text style={styles.labelText}>{item.label}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.saveButton} onPress={saveLabels}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  labelItem: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: 'gray',
  },
  selectedLabel: {
    backgroundColor: 'blue',
  },
  labelText: {
    color: 'white',
  },
  saveButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 5,
  },
  saveButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default ManageLabels;
