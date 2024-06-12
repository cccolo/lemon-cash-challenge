import * as React from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {BLACK, BLACK_500, BRILLIANT_BLUE, WHITE} from '../../const/colors';

type Props = {
  message: string;
  modalVisible: boolean;
  onClose: () => void;
};

export const Alert: React.FC<Props> = ({message, modalVisible, onClose}) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={onClose}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{message}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={onClose}>
              <Text style={styles.textStyle}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: BLACK_500,
  },
  modalView: {
    margin: 20,
    backgroundColor: WHITE,
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 40,
    padding: 10,
    elevation: 2,
    minWidth: '100%',
  },
  buttonClose: {
    backgroundColor: BRILLIANT_BLUE,
  },
  textStyle: {
    color: WHITE,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
