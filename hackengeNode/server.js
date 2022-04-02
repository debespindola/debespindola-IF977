const express = require('express');
const { v4: uuid } = require('uuid');

const app = express();
app.use(express.json());

const songs = [];

const getSongById = (id) => {
  return songs.find((song) => song.id === id);
};
const getSongIndexById = (id) => {
  return songs.findIndex((song) => song.id === id);
};

// get all songs registered
app.get('/songs', (req, res) => {
  res.json(songs);
});

// get specific song
app.get('/songs/:id', (req, res) => {
  const { id: songId } = req.params;
  const song = getSongById(songId);

  if (!song) {
    return (
      res
        .status(404)
        .json('Sorry, this song was not found! 🙈')
    );
  }
  
  res.status(200).json(song);
});

// create a new song
app.post('/songs', (req, res) => {
  const { name, artist, album } = req.body;

  if (!(name && artist && album)) {
    return (
      res
        .status(400)
        .json(
          `Unable to create the song, there are missing fields. 
          Required name, artist, album of the song 🎶`
        )
    );
  }

  const newSong = {
    id: uuid(),
    name,
    artist,
    album,
  };
  songs.push(newSong);

  res.status(201).json(newSong);
});

// edit song
app.put('/songs/:id', (req, res) => {
  const { id: songId } = req.params;
  const song = getSongById(songId);

  if (!song) {
    return (
      res
        .status(404)
        .json('Sorry, this song was not found! 🙈')
    );
  }

  const { name, artist, album } = req.body;
  
  song.name = name || song.name;
  song.artist = artist || song.artist;
  song.album = album || song.album;

  res.status(200).json(song);
});

// delete song
app.delete('/songs/:id', (req, res) => {
  const { id: songId } = req.params;
  const songIndex = getSongIndexById(songId);

  if (songIndex === -1) {
    return (
      res
        .status(404)
        .json('Sorry, this song was not found! 🙈')
    );
  }
  songs.splice(songIndex, 1);
  
  res.status(200).json('Song deleted successfully! 🗑️');
});

app.listen(3000);
