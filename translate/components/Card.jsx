import {View, Text, StyleSheet} from 'react-native';

/*! \Card components
 *
 *
 *  Displays the transcription of the audio and the translation of the transcription
 */
const Card = ({original, translation = '...'}) => {
  return (
    <View style={styles.cardContent}>
      <Text>Original: {original}</Text>
      <Text>Translation: {translation}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContent: {
    height: 90,
    width: 300,
    backgroundColor: 'pink',
    padding: 10,
    borderRadius: 6,
    color: 'black',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    marginTop: 5,
  },
});

export default Card;
