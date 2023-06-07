import axios from 'axios';

const host = '192.168.40.177';

/*! \Test function
 *
 *
 *  this function makes a request to the backend REST API to make sure it works
 */
export const Test = async () => {
  const options = {
    method: 'GET',
    url: `http://${host}:5000/`,
  };

  const response = await axios.request(options);

  console.log(response.data);

  return response.data;
};

/*! \Upload audio function
 *
 *
 *  This function takes the path of the audio file as parameter and uploads it to the server
 */
export const uploadAudio = async filePath => {
  console.log('...uploading');
  const form = new FormData();

  form.append('file', {
    uri: filePath,
    name: 'sound.mp4',
    type: 'audio/mpeg',
  });

  const options = {
    method: 'POST',
    url: `http://${host}:5000/file-upload`,
    headers: {
      'Content-Type':
        'multipart/form-data; boundary=---011000010111000001101001',
    },
    data: form,
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      console.log('Done Uploading');
    })
    .catch(function (error) {
      console.error(error);
    });
};

/*! \Transcription function
 *
 *
 *  This function transcribes  the audio file that was uploaded
 */
export const transcribeAudio = async fileName => {
  console.log('...transcribing');
  const options = {
    method: 'GET',
    url: `http://${host}:5000/transcribe/${fileName}`,
  };

  const response = await axios.request(options);

  console.log(response.data);

  return response.data;
};

/*! \Delete function
 *
 *
 *  This function takes a parameter the name of the file to be deleted and deletes it
 */
export const deleteFile = async fileName => {
  const options = {
    method: 'DELETE',
    url: `http://${host}:5000/delete_file`,
    params: {filename: fileName},
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};
