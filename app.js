const express = require('express');
const app = express();

const artists = require('./controller/artists.js');
const songs = require('./controller/songs.js');
const playlists = require('./controller/playlists.js');

app.use(express.json());

app.get('/', (req, res) => {
    console.log('haloo world');
});

// artist handler
app.post('/create-artist', artists.createArtist);
app.get('/get-artists', artists.getAllArtists);
app.get('/get-artist/:id', artists.getArtistById);
app.put('/edit-artist/:id', artists.editArtist);
app.delete('/delete-artist/:id', artists.deleteArtist);

// song handler
app.post('/create-song', songs.createSongs);
app.get('/get-songs', songs.getAllSongs);
app.get('/get-song/:id', songs.getSongById);
app.get('/get-songs-by-artist/:artist_id', songs.getListSongsByArtistId);
app.put('/edit-song/:id', songs.editSong);
app.delete('/delete-song/:id', songs.deleteSong);

// playlist handler
app.get('/get-playlists', playlists.getPlaylist);
app.post('/add-to-playlist/:song_id', playlists.addToPlaylist);
app.put('/play-song-in-playlist/:song_id', playlists.playSongInPlaylist);
app.delete('/delete-from-playlist/:song_id', playlists.deleteFromPlaylist)

// start server
app.listen(3000, () => {
    console.log('Server berjalan di port 3000');
});