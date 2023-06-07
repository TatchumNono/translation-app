# translation-app

## An app that transcribes and translate a users voice input

#### The repository is divided in two parts

- The mobile app in the translate folder
- The REST API in the backend folder

# Translate folder

### The android app was build using react native

## Components

---

## Record Button

#### Its is button that starts and stops the audio recording

#### This function returns a JSX button componenst that starts and stops the recording of the audio on the device

```javascript
RecordButton();
```

## Card

#### This component is used to display the transcription of the audio and the translation of the transcription

```javascript
Card({original, translation = '...'})
```

#### It takes as arguments the trasncripted text amd the translated text

## Helper functions

---

#### These functions are used by the RecordButton component

```javascript
onStartRecord();
```

#### Starts the recording of the audio

```javascript
onStopRecord();
```

#### Stops the recording of the audio

```javascript
Play();
```

#### A function that return a JSX button component that plays the audio just recorded

## API Fuctions

#### These function helps interact with the REST API

#### This function takes as parameter the path of the audio file just recorded and uploads it to the backend server

```javascript
uploadAudio(filepath);
```

#### This function transcribes the audio file that has just been uploaded

```javascript
transcribeAudio();
```
# Backend Folder

### Contains the backend REST API made with falsk and makes use of Whisper from Open AI to transcribe audio files

#### This route call a function that transribes an audio file

```python
@app.route('/transcribe/<filename>', methods=['GET'])
def transcribe(filename):
    filepath = UPLOAD_FOLDER + "\\" + filename
    
    model = whisper.load_model("small")
    result = model.transcribe(filepath, fp16=False)
```
#### This route uploads an audio file tto the server

```python
@app.route('/file-upload', methods=['POST'])
def upload_file():
```
