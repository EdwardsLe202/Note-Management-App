// ManageLabels.js
import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { LabelsContext } from '../../components/LabelsContext';
import { COLOR, HEIGHT } from '../../theme/theme'; // Corrected the spelling of COLOR
import { AntDesign, Ionicons } from '@expo/vector-icons';

const ManageLabels = ({ route, navigation }) => {
  const { labels } = useContext(LabelsContext);
  const { selectedLabels = [], updateLabels } = route.params; // Ensure selectedLabels is defined and defaults to an empty array
  const [localSelectedLabels, setLocalSelectedLabels] = useState(selectedLabels);

  const toggleLabel = (labelId) => {
    setLocalSelectedLabels((prevSelected) => {
      if (prevSelected.includes(labelId)) {
        return prevSelected.filter((id) => id !== labelId);
      } else {
        return [...prevSelected, labelId];
      }
    });
  };

  const saveLabels = () => {
    updateLabels(localSelectedLabels);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Select Labels</Text>
      </View>
      <FlatList
        data={labels}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.labelItem,
              localSelectedLabels.includes(item.id) && styles.selectedLabel,
            ]}
            onPress={() => toggleLabel(item.id)}
          >
            <Text
              style={[
                styles.labelText,
                localSelectedLabels.includes(item.id) && styles.selectedLabelText,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.saveButton} onPress={saveLabels}>
        <AntDesign name="checkcircle" size={50} color={COLOR.secondaryYellowHex} />
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
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  labelItem: {
    padding: 10,
    borderRadius: HEIGHT(10),
    marginBottom: 10,
    backgroundColor: COLOR.primaryGreyHex,
    borderWidth: 1,
  },
  selectedLabel: {
    backgroundColor: COLOR.primaryBlue,
  },
  labelText: {
    color: COLOR.primaryBlackHex,
    alignSelf: 'center',
  },
  selectedLabelText: {
    color: COLOR.primaryWhiteHex,
  },
  saveButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    flexDirection: 'column',
    alignItems: 'flex-end',
    margin: HEIGHT(5.5),
    marginLeft: HEIGHT(34.4),
  },
  saveButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  button: {
    fontSize: 24,
    fontWeight: 'bold',
    flexDirection: 'column',
    paddingVertical: HEIGHT(5),
  },
  backButton: {
    position: 'absolute',
    bottom: HEIGHT(5),
    left: 0,
    right: 0,
    zIndex: 999,
  },
});

export default ManageLabels;
