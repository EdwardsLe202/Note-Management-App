import React, { useState, useRef } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { NOTES, LABELS, COLORS } from '../../../data/dummy-data';
import { Entypo, FontAwesome, Ionicons, MaterialCommunityIcons, Feather, AntDesign } from '@expo/vector-icons';
import { COLOR, HEIGHT } from '../../theme/theme';
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { StatusBar } from 'expo-status-bar';

const EditNote = ({ route, navigation }) => {
  const { noteId, updateNotes } = route.params || {}; 
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
  const snapPoints = ["45%"];

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
              const label = LABELS.find(label => label.id === labelId);
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
        <Image
          source={require('../../../assets/pencil.png')}
          style={styles.imageStyle} />
        <View>
          <TouchableOpacity
            style={styles.checkButton}
            onPress={saveNote}
          >
            <AntDesign name="checkcircle" size={50} color={COLOR.secondaryYellowHex} />
          </TouchableOpacity>
        </View>

        <View style={styles.BottomSheetStyle}>
          <StatusBar style="auto" />
        </View>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backgroundStyle={{ borderRadius: 50 }}
        >
          <View style={styles.bottomSheetContent}>
            <View style={styles.colorSelector}>
              <View style={styles.colorSelectorHeader}>
                <Feather name="edit-2" size={25} color="black" />
                <Text style={styles.bottomSheetSubtitle}>Select Color:</Text>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.colorOptions}>
                {COLORS.map((clr) => (
                  <TouchableOpacity key={clr} onPress={() => changeColor(clr)} style={[styles.colorCircle, { backgroundColor: clr }]} />
                ))}
              </ScrollView>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('ManageLabels', { labels, updateLabels })} style={styles.manageLabelsButton}>
              <View style={styles.manageLabelsContent}>
                <Feather name="tag" size={25} color={COLOR.primaryBlackHex} />
                <Text style={styles.manageLabelsText}>Manage Labels</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={deleteNote} style={styles.deleteButton}>
              <View style={styles.deleteButtonContent}>
                <Feather name="trash-2" size={25} color={COLOR.primaryBlackHex} />
                <Text style={styles.deleteButtonText}>Delete Note</Text>
              </View>
            </TouchableOpacity>
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: HEIGHT(3),
    marginTop: HEIGHT(5),
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: HEIGHT(2),
    paddingLeft: HEIGHT(10),
    
  },
  bookmarkButton: {
    marginLeft: HEIGHT(1)
  },
  editButton: {
    marginRight: HEIGHT(9)
  },
  labelContainer: {
    marginBottom: 20,
  },
  labelTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  labels: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  label: {
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 8,
    marginRight: 5,
    marginBottom: 5,
    backgroundColor: 'gray',
  },
  labelText: {
    color: 'white',
  },
  button: {
    flexDirection: 'row',
    paddingBottom: HEIGHT(2),
  },
  titleStyle: {
    textAlign: 'center',
    fontSize: 20,
  },
  background: {
    backgroundColor: COLOR.primaryGreyHex,
    height: HEIGHT(5),
    borderRadius: HEIGHT(1),
    marginHorizontal: HEIGHT(0.7),
    marginBottom: HEIGHT(3),
    borderColor: COLOR.primaryBlackHex,
    borderWidth: HEIGHT(0.1),
    marginTop: HEIGHT(2),
    flexDirection: 'row',
  },
  iconStyle: {
    fontSize: HEIGHT(4),
    alignItems: 'center',
    marginHorizontal: HEIGHT(1.5),
    marginTop: 3,
  },
  inputStyle: {
    borderColor: COLOR.primaryBlackHex,
    fontSize: HEIGHT(2),
    flex: 1,
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: HEIGHT(10),
    backgroundColor: COLOR.primaryBlue,
  },
  checkButton: {
    position: 'absolute',
    paddingTop: HEIGHT(13),
    right: 20,
  },
  BottomSheetStyle: {
    backgroundColor: COLOR.secondaryGreyHex,
  },
  imageStyle: {
    height: HEIGHT(30),
    width: HEIGHT(30),
    justifyContent: 'center',
    marginTop: HEIGHT(6),
    marginLeft: HEIGHT(6)
  },
  bottomSheetContent: {
    padding: 20,
  },
  bottomSheetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  colorSelector: {
    marginBottom: 20,
  },
  colorSelectorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  bottomSheetSubtitle: {
    fontSize: HEIGHT(2),
    marginLeft: 10,
    marginVertical: 20
  },
  colorOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  colorCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 5,
  },
  manageLabelsButton: {
    marginBottom: 20,
    marginVertical: 20
  },
  manageLabelsContent: {
    flexDirection: 'row',
    alignItems: 'center',
   
  },
  manageLabelsText: {
    color: COLOR.primaryBlackHex,
    fontSize: HEIGHT(2),
    marginLeft: 10,
    
  },
  deleteButton: {
    marginBottom: 20,
    marginVertical: 20
  },
  deleteButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: COLOR.primaryBlackHex,
    fontSize: HEIGHT(2),
    marginLeft: 10,
  },
});

export default EditNote;
