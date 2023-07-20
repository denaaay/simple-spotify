// database postgres
const { Pool } = require('pg');

const conn = new Pool({
    user: 'denaaay',
    host: 'localhost',
    database: 'spotify3',
    password: '1377',
    port: '5432',
});

//automigrate
const createTableArtists = async () => {
    try {
        await conn.query(
            'create table if not exists artists ( id serial primary key, name varchar(100) not null );'
        );
    } catch (error) {
        console.log(`error creating table : ${error.message}`);
    }
}
const createTableSongs = async () => {
    try {
        await conn.query(
            'create table if not exists songs ( id serial primary key, title varchar(100) not null, description varchar(255) not null, artist_id int, foreign key (artist_id) references artists (id) );'
        );
    } catch (error) {
        console.log(`error creating table : ${error.message}`);
    }
}

const createTablePlaylists = async () => {
    try {
        conn.query(
            'create table if not exists playlists ( play_time int, song_id int, foreign key (song_id) references songs (id) );'
        );
    } catch (error) {
        console.log(`error creating table ${error.message}`);
    }
}

// automigrate function
async function automigrate() {
    await createTableArtists();
    await createTableSongs();
    await createTablePlaylists();
}

// call automigrate function
automigrate();

conn.connect((err, client, release) => {
    if (err) {
        console.error('Error acquiring client', err);
        return;
    }
    console.log(`Connected to the database`);
    client.release();
});

module.exports = conn;