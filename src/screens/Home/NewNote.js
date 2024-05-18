import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet , TouchableOpacity, Image} from 'react-native';
import { NOTES } from '../../../data/dummy-data';
import Note from '../../../models/Note';
import { COLOR, HEIGHT } from '../../theme/theme';
import { AntDesign , MaterialCommunityIcons, Ionicons} from '@expo/vector-icons';
import AlertModal from '../../components/AlertModal';


const NewNote = ({ navigation }) => {
  const [content, setContent] = useState('');
  const [showModal, setShowModal] = useState(false); // State để kiểm soát hiển thị modal

  const addNote = () => {
    if (content.trim() === '') {
      setShowModal(true); // Hiển thị modal nếu nội dung trống
      return;
    }
    const newNote = new Note(
      `n${NOTES.length + 1}`,
      null,
      [],
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
    paddingTop: HEIGHT(30),
    right: 20,
  },
  imageStyle: {
    height: 200,
    width: 200,
    justifyContent: 'center',
    marginTop: HEIGHT(10),
    marginLeft: HEIGHT(10)
  },
});

export default NewNote;
