import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { NOTES, LABELS } from '../../../data/dummy-data';
import Note from '../../../models/Note';
import { COLOR, HEIGHT } from '../../theme/theme';
import { AntDesign, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import AlertModal from '../../components/AlertModal';

const NewNote = ({ navigation }) => {
  const [content, setContent] = useState('');
  const [showModal, setShowModal] = useState(false); // State để kiểm soát hiển thị modal
  const [selectedLabels, setSelectedLabels] = useState([]); // State để lưu các nhãn đã chọn

  const addNote = () => {
    if (content.trim() === '') {
      setShowModal(true); // Hiển thị modal nếu nội dung trống
      return;
    }
    const newNote = new Note(
      `n${NOTES.length + 1}`,
      null,
      selectedLabels,
      content,
      new Date(),
      false
    );
    NOTES.push(newNote);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <MaterialCommunityIcons name="keyboard-outline" style={styles.iconStyle} />
        <TextInput
          placeholder="Enter note content"
          value={content}
          onChangeText={setContent}
          style={styles.inputStyle}
        />
      </View>
      <View style={styles.labelContainer}>
        {LABELS.map(label => (
          <TouchableOpacity
            key={label.id}
            style={[
              styles.label,
              selectedLabels.includes(label.id) && styles.selectedLabel
            ]}
            onPress={() => {
              setSelectedLabels(prev =>
                prev.includes(label.id)
                  ? prev.filter(id => id !== label.id)
                  : [...prev, label.id]
              );
            }}
          >
          <Text style={styles.labelText}>{label.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Image
        source={require('../../../assets/editNote.png')}
        style={styles.imageStyle} />
      <View>
        <TouchableOpacity
          style={styles.checkButton}
          onPress={addNote}
        >
          <AntDesign name="checkcircle" size={50} color={COLOR.secondaryYellowHex} />
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <AlertModal
        open={showModal}
        message="Please fill the note content"
        title={<Ionicons name="notifications" size={40} color={COLOR.primaryRedHex} />}
        onClose={() => setShowModal(false)}
        onConfirmPress={() => {
          setShowModal(false);
        }}
        confirmText='Yes'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: HEIGHT(1),
  },
  background: {
    backgroundColor: COLOR.primaryGreyHex,
    height: HEIGHT(5),
    borderRadius: HEIGHT(1),
    marginHorizontal: HEIGHT(3),
    marginBottom: HEIGHT(3),
    borderColor: COLOR.primaryBlackHex,
    borderWidth: HEIGHT(0.1),
    marginTop: HEIGHT(4),
    flexDirection: 'row'
  },
  iconStyle: {
    fontSize: HEIGHT(4),
    alignItems: 'center',
    marginHorizontal: HEIGHT(1.5),
    marginTop: 3
  },
  inputStyle: {
    borderColor: COLOR.primaryBlackHex,
    fontSize: HEIGHT(2),
    flex: 1
  },
  checkButton: {
    position: 'absolute',
    paddingTop: HEIGHT(15),
    right: 20,
  },
  imageStyle: {
    height: 200,
    width: 200,
    justifyContent: 'center',
    marginTop: HEIGHT(10),
    marginLeft: HEIGHT(10)
  },
  labelContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: HEIGHT(2),
    paddingLeft: HEIGHT(2.3)
    
  },
  label: {
    borderRadius: 5,
    padding: 5,
    margin: 5,
    backgroundColor: COLOR.primaryGreyHex,
  },
  selectedLabel: {
    backgroundColor: COLOR.primaryBlue,
  },
  labelText: {
    color: COLOR.primaryBlackHex,
  },
});

export default NewNote;
