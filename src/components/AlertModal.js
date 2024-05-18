import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLOR, FONTFAMILY, FONTSIZE, HEIGHT, WIDTH } from '../theme/theme';

const AlertModal = ({
  open,
  title,
  titleColor = COLOR.primaryBlackHex,
  message,
  showCancelButton = false,
  showConfirmButton = true,
  cancelText = 'NO',
  confirmText = 'YES',
  confirmButtonColor = COLOR.secondaryYellowHex,
  cancelButtonColor = COLOR.primaryPinkBGHex,
  onCancelPress,
  onConfirmPress,
  onClose,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={open}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.Container} onTouchEnd={onClose}>
        <View onTouchEnd={(e) => e.stopPropagation()} style={styles.AlertContainer}>
          {title ? (
            <View style={styles.TittleRow}>
              <TouchableOpacity style={styles.ButtonLeft}></TouchableOpacity>
              <View style={styles.TittleBar}>
                <Text
                  style={[styles.TittleText, { color: titleColor }]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {title}
                </Text>
              </View>
              <TouchableOpacity onPress={onClose} style={styles.ButtonRight}>
                <AntDesign
                  name="close"
                  size={WIDTH(6)}
                  color={COLOR.primaryBlackHex}
                />
              </TouchableOpacity>
            </View>
          ) : null}

          <View style={{ marginTop: title ? 0 : HEIGHT(3) }}>
            <Text style={styles.MessageText}>{message}</Text>
          </View>
          <View
            style={[
              styles.ButtonRow,
              {
                justifyContent:
                  showCancelButton && showConfirmButton ? 'space-between' : 'center',
              },
            ]}
          >
            {showCancelButton ? (
              <TouchableOpacity
                onPress={onCancelPress}
                style={[
                  styles.Button,
                  {
                    backgroundColor: cancelButtonColor,
                  },
                ]}
              >
                <Text style={styles.ButtonText}>{cancelText}</Text>
              </TouchableOpacity>
            ) : null}
            {showConfirmButton ? (
              <TouchableOpacity
                onPress={onConfirmPress}
                style={[
                  styles.Button,
                  {
                    backgroundColor: confirmButtonColor,
                  },
                ]}
              >
                <Text style={styles.ButtonText}>{confirmText}</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  Container: {
    height: HEIGHT(100),
    width: WIDTH(100),
    backgroundColor: '#00000090',
    justifyContent: 'flex-end',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    overflow: 'hidden',
    bottom: 0,
  },
  AlertContainer: {
    backgroundColor: COLOR.primaryWhiteHex,
    borderRadius: HEIGHT(3),
    width: WIDTH(85),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    position: 'absolute',
    alignItems: 'center',
    bottom: HEIGHT(40),
    paddingBottom: HEIGHT(2),
    gap: HEIGHT(3),
  },
  TittleRow: {
    display: 'flex',
    width: WIDTH(85),
    paddingHorizontal: WIDTH(3),
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: HEIGHT(1.5)
  },
  ButtonRight: {
    width: WIDTH(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonLeft: {
    width: WIDTH(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  TittleBar: {
    width: WIDTH(59),
    alignItems: 'center',
  },
  TittleText: {
    textAlign: 'center',
    fontSize: FONTSIZE(3),
    fontFamily: FONTFAMILY.Bold,
    width: WIDTH(59),
  },
  MessageText: {
    textAlign: 'center',
    fontSize: FONTSIZE(2.5),
    width: WIDTH(60),
    fontFamily: FONTFAMILY.ExtraBold,
    color: COLOR.primaryBlackHex,
  },
  ButtonRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: WIDTH(75),
  },
  Button: {
    width: WIDTH(33),
    height: HEIGHT(7),
    borderRadius: HEIGHT(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonText: {
    textAlign: 'center',
    fontSize: FONTSIZE(2.2),
    fontFamily: FONTFAMILY.Bold,
    color: COLOR.primaryWhiteHex,
  },
});

export default AlertModal;
