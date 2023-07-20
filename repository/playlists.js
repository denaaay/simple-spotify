const conn = require('../database.js');

const getPlaylist = async () => {
    return new Promise ((resolve, reject) => {
        conn.query(
            'select songs.id, songs.title, artists.name as artist, playlists.play_time from playlists join songs on songs.id = playlists.song_id join artists on artists.id = songs.artist_id order by playlists.play_time desc',
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.rows);
                }
            }
        );
    });
}

const addToPlaylist = async (song_id) => {
    return new Promise ((resolve, reject) => {
        conn.query(
            'insert into playlists (play_time, song_id) values (0, $1) returning *',
            [song_id],
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.rows[0]);
                }
            }
        );
    });
}

const playSongInPlaylist = async (song_id) => {
    return new Promise ((resolve, reject) => {
        conn.query(
            'update playlists set play_time = play_time + 1 where song_id = $1 returning *',
            [song_id],
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.rows[0]);
                }
            }
        );
    });
}

const deleteFromPlaylist = async (song_id) => {
    return new Promise ((resolve, reject) => {
        conn.query(
            'delete from playlists where song_id = $1 returning *',
            [song_id],
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.rows[0]);
                }
            }
        );
    });
}

module.exports = {
    getPlaylist,
    addToPlaylist,
    playSongInPlaylist,
    deleteFromPlaylist,
}