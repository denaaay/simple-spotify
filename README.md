# Simple Spotify

## database postgresql

please set up your database with your configuration.

open file database.js and change value with your postgresql configuration.

```
    const conn = new Pool({
        user: 'your_username',
        host: 'localhost',
        database: 'your_db_name',
        password: 'your_password',
        port: '5432',
    });
```

## artists

artist handler can handle crud for artists table in database.

you can make new artist, get all artists, get artist by id, update artist by id, and delete artist by id

## songs

songs handler can handle crud for songs table in database.

you can make new song with artist input by artist id, get all songs, get song by id, get list songs by artist id, edit song by id, and delete song by id

## playlists

playlist handler can handle crud for playlists table in database.

you can add new song to playlist, get all data in playlist, play song in playlist, and delete song from playlist.

## documentation

for documentation you can visit this link to use the api in postman

- https://documenter.getpostman.com/view/24743050/2s946idXDv 

### Code by GG3FSGP0303_Deni Fahrony