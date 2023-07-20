const repo = require('../repository/artists.js');
const repoSong = require('../repository/songs.js');

const createArtist = async (req, res) => {
    try {
        const name = req.body.name;

        if (name === "") {
            res.status(400).json({
                status_code: 400,
                message: 'name cannot null string',
            });
            return;
        }

        if (name.length < 8) {
            res.status(400).json({
                status_code: 400,
                message: 'name cannot less than 8 character'
            });
            return;
        }
        
        if (name.length > 100) {
            res.status(400).json({
                status_code: 400,
                message: 'name cannot more than 100 character',
            });
            return;
        }

        const result = await repo.createArtist(name);

        res.status(201).json({
            status_code: 201,
            message: 'success creating artist',
            data: result,
        });
        return;
    } catch (error) {
        res.status(500).json({
            status_code: 500,
            message: 'error creating artist',
        });
        return;
    }
};

const getAllArtists = async (req, res) => {
    try {
        const result = await repo.getAllArtists();

        res.status(200).json({
            status_code: 200,
            message: 'success getting all artists',
            data: result,
        });
        return;
    } catch (error) {
        res.status(500).json({
            status_code: 500,
            message: 'error getting all artists',
        });
        return;
    }
};

const getArtistById = async (req, res) => {
    try {
        const id = req.params.id
        const result = await repo.getArtistById(id);

        res.status(200).json({
            status_code: 200,
            message: 'success getting artist by id',
            data: result,
        });
        return;
    } catch (error) {
        res.status(500).json({
            status_code: 500,
            message: 'error getting artist by id',
        });
        return;
    }
};

const editArtist = async (req, res) => {
    try {
        const id = req.params.id;
        const name = req.body.name;

        if (name === "") {
            res.status(400).json({
                status_code: 400,
                message: 'name cannot null string',
            });
            return;
        }

        if (name.length < 8) {
            res.status(400).json({
                status_code: 400,
                message: 'name cannot less than 8 character'
            });
            return;
        }
        
        if (name.length > 100) {
            res.status(400).json({
                status_code: 400,
                message: 'name cannot more than 100 character',
            });
            return;
        }

        const result = await repo.editArtist(name, id);
        res.status(200).json({
            status_code: 200,
            message: 'success updating artist',
            data: result,
        });
        return;
    } catch (error) {
        res.status(500).json({
            status_code: 500,
            message: 'error updating artist',
        });
        return;
    }
};

const deleteArtist = async (req, res) => {
    try {
        const id = req.params.id

        await repoSong.deleteSongByArtist(id)
        const result = await repo.deleteArtist(id);
        
        res.status(200).json({
            status_code: 200,
            message: 'success deleting artist',
            data: result,
        });
        return;
    } catch (error) {
        res.status(500).json({
            status_code: 500,
            message: error.message,
        });
        return;
    }
};

module.exports = {
    createArtist,
    getAllArtists,
    getArtistById,
    editArtist,
    deleteArtist,
}