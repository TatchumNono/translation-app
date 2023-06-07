import {View, Text, StyleSheet, ScrollView} from 'react-native';
import RecordButton from './components/RecordButton';
import Card from './components/Card';
import {useState, useEffect} from 'react';
import {RecordContext} from './context/Record';
import {Play} from './helpers/fxns';
//import {Test} from './api';
import {setStoreData} from './helpers/dictionary';

/*! \Main function of the app
 *
 *
 *  Contains all other components of the app
 */
const Home = () => {
  const [record, setData] = useState({
    recordSecs: 0,
    recordTime: 0,
    isRecording: false,
  });

  const [cardData, setCardData] = useState({
    transcription: '',
    translation: '',
  });

  useEffect(() => {
    (async () => {
      await setStoreData();
    })();
  }, []);

  return (
    <RecordContext.Provider value={{record, setData, setCardData}}>
      <View style={styles.mainContainer}>
        <View style={styles.textContainer}>
          <Text style={{color: '#000'}}>{record.recordTime}</Text>
          <Play />
        </View>

        <View style={styles.cardContainer}>
          <ScrollView>
            {cardData.transcription === '' ? null : (
              <Card original={cardData.transcription} />
            )}
          </ScrollView>
        </View>

        <View style={styles.recorderButtonContainer}>
          <RecordButton />
        </View>
      </View>
    </RecordContext.Provider>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
  },
  textContainer: {
    height: '10%',
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 30,
  },
  cardContainer: {
    height: '70%',
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  recorderButtonContainer: {
    height: '20%',
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
