// database postgres
const { Pool } = require('pg');

const conn = new Pool({
    user: 'your_username',
    host: 'localhost',
    database: 'your_database_name',
    password: 'your_password',
    port: '5432',
});

//automigrate
const createTableArtists =  () => {
    conn.query(
        'create table if not exists artists ( id serial primary key, name varchar(100) not null );'
    );
}
const createTableSongs = () => {
    conn.query(
        'create table if not exists songs ( id serial primary key, title varchar(100) not null, description varchar(255) not null, artist_id int, foreign key (artist_id) references artists (id) );'
    );
}

const createTablePlaylists = () => {
    conn.query(
        'create table if not exists playlists ( play_time int, song_id int, foreign key (song_id) references songs (id) );'
    );
}

// call automigrate function
createTableArtists();
createTableSongs();
createTablePlaylists();

conn.connect((err, client, release) => {
    if (err) {
        console.error('Error acquiring client', err);
        return;
    }
    console.log(`Connected to the database`);
    client.release();
});

module.exports = conn;