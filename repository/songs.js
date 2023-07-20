const conn = require('../database.js');

const getAllSongs = async () => {
    return new Promise ((resolve, reject) => {
        conn.query(
            'select * from songs order by id asc',
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

const getSongById = async (id) => {
    return new Promise ((resolve, reject) => {
        conn.query(
            'select * from songs where id = $1',
            [id],
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

const getListSongsByArtistId = async (artist_id) => {
    return new Promise ((resolve, reject) => {
        conn.query(
            'select id, title, description from songs where artist_id = $1 order by id asc',
            [artist_id],
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

const createSongs = async (title, description, artist_id) => {
    return new Promise ((resolve, reject) => {
        conn.query(
            'insert into songs (title, description, artist_id) values ($1, $2, $3) returning *',
            [title, description, artist_id],
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.rows[0]);
                }
            }
        );
    });
};

const editSong = async (title, description, id) => {
    return new Promise ((resolve, reject) => {
        conn.query(
            'update songs set title = $1, description = $2 where id = $3 returning *',
            [title, description, id],
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

const deleteSong = async (id) => {
    return new Promise ((resolve, reject) => {
        conn.query(
            'delete from songs where id = $1 returning *',
            [id],
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.rows);
                }
            }
        );
    })
}

const deleteSongByArtist = async (artist_id) => {
    return new Promise ((resolve, reject) => {
        conn.query(
            'delete from songs where artist_id = $1',
            [artist_id],
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );
    });
}

module.exports = {
    getAllSongs,
    getSongById,
    getListSongsByArtistId,
    createSongs,
    editSong,
    deleteSong,
    deleteSongByArtist,
}