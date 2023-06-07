import React from 'react';
import {useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {RecordContext} from '../context/Record';
import {onStartRecord, onStopRecord} from '../helpers/fxns';

/*! \Button that starts and stops the audio recording
 *
 *
 *  This function returns a button that starts and stops the recording of the audio on the device
 */
const RecordButton = () => {
  const {setData, record, setCardData} = useContext(RecordContext);

  const playHandler = async () => {
    !record.isRecording
      ? await onStartRecord(setData)
      : await onStopRecord(setData, setCardData);
  };

  return (
    <TouchableOpacity onPress={playHandler}>
      <View style={styles.recorderButton}>
        {record.isRecording ? (
          <Text>STOP</Text>
        ) : (
          <View style={styles.innerWhite}>{}</View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  recorderButton: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  innerWhite: {
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    backgroundColor: 'white',
  },
});

export default RecordButton;
