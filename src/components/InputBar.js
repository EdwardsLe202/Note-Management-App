import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HEIGHT, COLOR } from '../theme/theme';
import { AntDesign } from '@expo/vector-icons';


const InputBar = ({ addNote }) => {
  const [content, setContent] = useState('');

  return (
    <View style={styles.background}>
      <MaterialCommunityIcons name="keyboard-outline" style={styles.iconStyle} />
      <TextInput
        placeholder="Enter note content"
        value={content}
        onChangeText={setContent}
        style={styles.inputStyle}
      />
      <TouchableOpacity
        style={styles.checkButton}
        onPress={addNote}
      >
        <AntDesign name="checkcircle" size={50} color={COLOR.secondaryYellowHex} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
  }
});

export default InputBar;
