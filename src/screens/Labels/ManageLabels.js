import React from 'react';
import { View, Text, Button } from 'react-native';
import { LABELS } from '../../..//data/dummy-data';

const ManageLabels = ({ navigation }) => {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      {LABELS.map(label => (
        <View key={label.id} style={{ marginBottom: 10 }}>
          <Text>{label.label}</Text>
        </View>
      ))}
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default ManageLabels;
