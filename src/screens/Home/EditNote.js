import React, { useState, useRef, useContext } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { NOTES, COLORS } from '../../../data/dummy-data';
import { Entypo, FontAwesome, Ionicons, MaterialCommunityIcons, Feather, AntDesign } from '@expo/vector-icons';
import { COLOR, HEIGHT } from '../../theme/theme';
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { StatusBar } from 'expo-status-bar';
import { LabelsContext } from '../../components/LabelsContext';

const EditNote = ({ route, navigation }) => {
  const { noteId, updateNotes } = route.params || {}; 
  const { labels: availableLabels } = useContext(LabelsContext);
  const note = NOTES.find(n => n.id === noteId);

  if (!note) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Note not found!</Text>
      </View>
    );
  }

  const [content, setContent] = useState(note.content);
  const [isBookmarked, setIsBookmarked] = useState(note.isBookmarked);
  const [color, setColor] = useState(note.color || '#FFFFFF'); // Default to white if no color
  const [labels, setLabels] = useState(note.labelIds);

  const toggleBookmark = () => {
    setIsBookmarked(prevState => !prevState);
  };

  const changeColor = (newColor) => {
    setColor(newColor);
  };

  const updateLabels = (newLabels) => {
    setLabels(newLabels);
  };

  const deleteNote = () => {
    const noteIndex = NOTES.findIndex(n => n.id === noteId);
    if (noteIndex !== -1) {
      NOTES.splice(noteIndex, 1);
      updateNotes(); 
      navigation.goBack();
    }
  };

  const saveNote = () => {
    note.content = content;
    note.isBookmarked = isBookmarked;
    note.color = color;
    note.labelIds = labels;
    note.updateAt = new Date();
    updateNotes(); 
    navigation.goBack();
  };

  const bottomSheetModalRef = useRef(null);
  const snapPoints = ["100%"];

  const handlePresentModal = () => {
    bottomSheetModalRef.current?.present();
  };

  return (
    <BottomSheetModalProvider>
      <View style={[styles.container, { backgroundColor: color }]}>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        </View>
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
          <Text style={styles.labelTitle}>Labels:</Text>
          <View style={styles.labels}>
            {labels.map(labelId => {
              const label = availableLabels.find(label => label.id === labelId);
              return (
                <View key={label.id} style={[styles.label, { backgroundColor: 'gray' }]}>
                  <Text style={styles.labelText}>{label.label}</Text>
                </View>
              );
            })}
          </View>
        </View>
        <View style={styles.bottomMenu}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={toggleBookmark} style={styles.bookmarkButton}>
              <FontAwesome name="bookmark" size={40} color={isBookmarked ? COLOR.primaryRedHex : COLOR.primaryWhiteGreyHex} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePresentModal} style={styles.editButton}>
              <FontAwesome name="edit" size={40} color={COLOR.secondaryYellowHex} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.saveButton}>
          <Button title="Save Note" onPress={saveNote} color={COLOR.primaryRedHex} />
        </View>
        <View style={styles.deleteButton}>
          <TouchableOpacity onPress={deleteNote} style={styles.deleteButtonContainer}>
            <Feather name="trash-2" size={40} color="black" />
          </TouchableOpacity>
        </View>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backgroundStyle={styles.modalBackground}
        >
          <View style={styles.modalContentContainer}>
            <Text style={styles.modalTitle}>Choose a Color:</Text>
            <View style={styles.colorPalette}>
              {COLORS.map(color => (
                <TouchableOpacity
                  key={color}
                  onPress={() => changeColor(color)}
                  style={[styles.colorOption, { backgroundColor: color }]}
                />
              ))}
            </View>
            <Text style={styles.modalTitle}>Edit Labels:</Text>
            <View style={styles.labelsContainer}>
              {availableLabels.map(label => (
                <TouchableOpacity
                  key={label.id}
                  onPress={() => {
                    const newLabels = labels.includes(label.id)
                      ? labels.filter(id => id !== label.id)
                      : [...labels, label.id];
                    updateLabels(newLabels);
                  }}
                  style={[styles.labelOption, { backgroundColor: labels.includes(label.id) ? 'gray' : 'lightgray' }]}
                >
                  <Text>{label.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: HEIGHT(6),
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputStyle: {
    fontSize: 22,
    color: COLOR.primaryWhiteGreyHex,
    textAlign: 'center',
  },
  iconStyle: {
    fontSize: 50,
    color: COLOR.primaryWhiteGreyHex,
  },
  backButton: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: HEIGHT(2),
  },
  button: {
    flexDirection: 'row',
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: HEIGHT(5),
    paddingBottom: HEIGHT(2),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '40%',
  },
  bookmarkButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    paddingBottom: HEIGHT(3),
  },
  deleteButton: {
    position: 'absolute',
    bottom: HEIGHT(4),
    right: HEIGHT(3),
  },
  deleteButtonContainer: {
    padding: 10,
    backgroundColor: COLOR.primaryRedHex,
    borderRadius: 5,
  },
  modalBackground: {
    backgroundColor: COLOR.primaryRedHex,
  },
  modalContentContainer: {
    flex: 1,
    padding: HEIGHT(2),
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: HEIGHT(2),
    color: COLOR.primaryWhiteHex,
  },
  colorPalette: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: HEIGHT(2),
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 5,
  },
  labelContainer: {
    padding: HEIGHT(2),
  },
  labelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: HEIGHT(1),
    color: COLOR.primaryWhiteHex,
  },
  labels: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  label: {
    borderRadius: 5,
    padding: 5,
    margin: 2,
  },
  labelText: {
    color: COLOR.primaryWhiteHex,
  },
  labelsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  labelOption: {
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
});

export default EditNote;
