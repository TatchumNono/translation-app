import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {uploadAudio, transcribeAudio, deleteFile} from '../api';
import {Button} from 'react-native';
import {getData} from '../helpers/dictionary';

const audioRecorderPlayer = new AudioRecorderPlayer();

const path = 'file:////data/user/0/com.translate/cache/sound.mp4';

/*! \Starts the recording of the audio
 *
 *
 *  Starts the recording of the audio
 */
export const onStartRecord = async setData => {
  const result = await audioRecorderPlayer.startRecorder();
  audioRecorderPlayer.addRecordBackListener(e => {
    setData({
      isRecording: true,
      recordSecs: e.currentPosition,
      recordTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
    });
    return;
  });
  console.log(result);
};

/*! \Stops the recording of the audio
 *
 *
 *  Stops the recording of the audio
 */
export const onStopRecord = async (setData, setCardData) => {
  await audioRecorderPlayer.stopRecorder();
  audioRecorderPlayer.removeRecordBackListener();
  setData({
    isRecording: false,
    recordTime: 0,
  });
  await uploadAudio(path);
  const transcription = await transcribeAudio('sound.mp4');
  const translation = await getData(transcription.message);
  console.log(translation);
  setCardData({
    transcription: transcription.message,
    translation: translation,
  });
  //await deleteFile('sound.mp4');
};

/*! \Plays the audio just recorded
 *
 *
 *  A function that return a button that plays the audio just recorded
 */
export const Play = () => {
  const onStartPlay = async () => {
    console.log('onStartPlay');
    const msg = await audioRecorderPlayer.startPlayer(path);
    audioRecorderPlayer.setVolume(1.0);
    console.log('Message -> ', msg);
    audioRecorderPlayer.addPlayBackListener(e => {
      if (e.current_position === e.duration) {
        console.log('finished');
        audioRecorderPlayer.stopPlayer();
      }
    });
  };

  return <Button onPress={onStartPlay} title="Play" />;
};
