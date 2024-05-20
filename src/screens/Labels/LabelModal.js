//LabelModal.js
import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';

const LabelModal = ({ visible, onClose, onSave, initialLabel }) => {
  const [labelText, setLabelText] = useState(initialLabel ? initialLabel.label : '');

  useEffect(() => {
    setLabelText(initialLabel ? initialLabel.label : '');
  }, [initialLabel]);

  const saveHandler = () => {
    if (labelText.trim().length > 0) {
      onSave(initialLabel ? initialLabel.id : null, labelText.trim());
    }
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <Text>{initialLabel ? 'Edit Label' : 'New Label'}</Text>
        <TextInput
          style={styles.input}
          value={labelText}
          onChangeText={setLabelText}
        />
        <View style={styles.buttonContainer}>
          <Button title="Save" onPress={saveHandler} />
          {initialLabel && (
            <Button title="Delete" color="red" onPress={() => onSave(initialLabel.id, '')} />
          )}
          <Button title="Cancel" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '80%',
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
});

export default LabelModal;
