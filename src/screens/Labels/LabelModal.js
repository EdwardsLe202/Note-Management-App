import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HEIGHT, COLOR } from '../../theme/theme';

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

  const deleteHandler = () => {
    onSave(initialLabel.id, '');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.titleStyle}>{initialLabel ? 'Edit Label' : 'New Label'}</Text>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="keyboard-outline" style={styles.iconStyle} />
            <TextInput
              placeholder="Enter label"
              value={labelText}
              onChangeText={setLabelText}
              style={styles.inputStyle}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonSave} onPress={saveHandler}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            {initialLabel && (
              <TouchableOpacity style={styles.buttonDelete} onPress={deleteHandler}>
                <Text style={[styles.buttonText, styles.deleteButtonText]}>Delete</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.buttonCancel} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: HEIGHT(2),
    padding: HEIGHT(2),
  },
  titleStyle: {
    fontSize: HEIGHT(3),
    fontWeight: 'bold',
    marginBottom: HEIGHT(2),
    textAlign: 'center',
    paddingVertical: 10
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: HEIGHT(2),
    backgroundColor: COLOR.primaryGreyHex,
    borderRadius: HEIGHT(1),
    padding: HEIGHT(1),
    borderColor: COLOR.primaryBlackHex,
    borderWidth: HEIGHT(0.1),
  },
  iconStyle: {
    fontSize: HEIGHT(4),
    marginRight: HEIGHT(1.5),
  },
  inputStyle: {
    flex: 1,
    fontSize: HEIGHT(2),
    borderColor: COLOR.primaryBlackHex,
  },
  buttonContainer: {
    marginHorizontal: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10
  },
  // button: {
  //   backgroundColor: COLOR.secondaryYellowHex,
  //   padding: HEIGHT(1),
  //   borderRadius: HEIGHT(0.5),
  //   marginHorizontal: HEIGHT(1),
  //   alignItems: 'center',
  // },
  buttonSave:{
    backgroundColor: COLOR.secondaryYellowHex,
    padding: HEIGHT(2),
    borderRadius: HEIGHT(2),
    marginLeft: 0
  },
  buttonDelete: {
    backgroundColor: COLOR.secondaryYellowHex,
    padding: HEIGHT(2),
    borderRadius: HEIGHT(2),
    marginLeft: 0
  },
  buttonCancel: {
    backgroundColor: COLOR.secondaryYellowHex,
    padding: HEIGHT(2),
    borderRadius: HEIGHT(2),
    marginLeft: 0
  },
  buttonText: {
    fontSize: HEIGHT(2),
    color: COLOR.primaryBlackHex,
  },
  deleteButtonText: {
    color: COLOR.primaryRedHex,
  },
});

export default LabelModal;
