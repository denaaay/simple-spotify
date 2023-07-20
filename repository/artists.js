const conn = require('../database.js');

const createArtist = async (name) => {
    return new Promise ((resolve, reject) => {
        conn.query(
            'insert into artists (name) values ($1) returning *',
            [name],
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.rows);
                }
            }
        );
    });
};

const getAllArtists = async () => {
    return new Promise ((resolve, reject) => {
        conn.query(
            'select * from artists',
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.rows);
                }
            }
        );
    });
};

const getArtistById = async (id) => {
    return new Promise ((resolve, reject) => {
        conn.query(
            'select * from artists where id = $1',
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
};

const editArtist = async (name, id) => {
    return new Promise ((resolve, reject) => {
        conn.query(
            'update artists set name = $1 where id = $2 returning *',
            [name, id],
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.rows)
                }
            }
        );
    });
};

const deleteArtist = async (id) => {
    return new Promise ((resolve, reject) => {
        conn.query(
            'delete from artists where id = $1 returning *',
            [id],
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.rows);
                }
            }
        );
    });
};

module.exports = {
    createArtist,
    getAllArtists,
    getArtistById,
    editArtist,
    deleteArtist,
}