const repo = require('../repository/songs.js');
const repoArtist = require('../repository/artists.js');

const getAllSongs = async (req, res) => {
    try {
        const result = await repo.getAllSongs();

        res.status(200).json({
            status_code: 200,
            message: 'success getting all songs',
            data: result,
        });
        return;
    } catch (error) {
        res.status(500).json({
            status_code: 500,
            message: 'error getting all songs',
        });
        return;
    }
}

const getSongById = async (req, res) => {
    try {
        const id = req.params.id

        const result = await repo.getSongById(id);
        res.status(200).json({
            status_code: 200,
            message: 'success getting song by id',
            data: result,
        });
        return;
    } catch (error) {
        res.status(500).json({
            status_code: 500,
            message: 'error getting song by id',
        });
        return;
    }
}

const getListSongsByArtistId = async (req, res) => {
    try {
        const artist_id = req.params.artist_id

        const result = await repo.getListSongsByArtistId(artist_id);
        res.status(200).json({
            status_code: 200,
            message: 'success getting list song by artist id',
            data: result,
        });
        return;
    } catch (error) {
        res.status(500).json({
            status_code: 500,
            message: 'error getting list song by artist id',
        });
        return;
    }
}

const createSongs = async (req, res) => {
    try {
        const data = {
            title: req.body.title,
            description: req.body.description,
            artist_id: req.body.artist_id,
        }
    
        if (data.title === "" && data.description) {
            res.status(400).json({
                status_code: 400,
                message: 'title or description cannot null string',
            });
            return;
        }
    
        if (data.title > 100) {
            res.status(400).json({
                status_code: 400,
                message: 'title cannot more than 100 character',
            });
            return;
        }
    
        if (data.title < 8) {
            res.status(400).json({
                status_code: 400,
                message: 'title cannot less than 8 character',
            });
            return;
        }
    
        if (data.description > 255) {
            res.status(400).json({
                status_code: 400,
                message: 'description cannot more than 255 character',
            });
            return;
        }

        await repoArtist.getArtistById(data.artist_id)
        const result = await repo.createSongs(data.title, data.description, data.artist_id);

        res.status(201).json({
            status_code: 201,
            message: 'success creating song',
            data: result,
        });
        return;
    } catch (error) {
        res.status(500).json({
            status_code: 500,
            message: 'error creating song',
        });
        return;
    }
}

const editSong = async (req, res) => {
    try {
        const data = {
            id: req.params.id,
            title: req.body.title,
            description: req.body.description,
        }
    
        if (data.title === '' || data.description === '') {
            res.status(400).json({
                status_code: 400,
                message: 'title or description cannot null string'
            });
            return;
        }
    
        if (data.title < 8) {
            res.status(400).json({
                status_code: 400,
                message: 'title cannot less than 8 character'
            });
            return; 
        }
    
        if (data.title > 100) {
            res.status(400).json({
                status_code: 400,
                message: 'title cannot more than 100 character'
            });
            return;
        }
    
        if (data.description > 255) {
            res.status(400).json({
                status_code: 400,
                message: 'description cannot more than 255 character'
            });
            return;
        }

        const result = await repo.editSong(data.title, data.description, data.id);

        res.status(200).json({
            status_code: 200,
            message: 'success updating song',
            data: result,
        });
        return;
    } catch (error) {
        res.status(500).json({
            status_code: 500,
            message: 'error updating song',
        });
        return;
    }
}

const deleteSong = async (req, res) => {
    try {
        const id = req.params.id

        const result = await repo.deleteSong(id);
        res.status(200).json({
            status_code: 200,
            message: 'success deleting song',
            data: result,
        });
        return;
    } catch (error) {
        res.status(500).json({
            status_code: 500,
            message: 'error deleting song',
        });
        return;
    }
}

module.exports = {
    getAllSongs,
    getSongById,
    getListSongsByArtistId,
    createSongs,
    editSong,
    deleteSong,
}