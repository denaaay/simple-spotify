const repo = require('../repository/playlists.js');

const getPlaylist = async (req, res) => {
    try {
        const result = await repo.getPlaylist();

        res.status(200).json({
            status_code: 200,
            message: 'success getting playlists',
            data: result,
        });
        return;
    } catch (error) {
        res.status(500).json({
            status_code: 500,
            message: 'error getting playlists',
        });
        return;
    }
}

const addToPlaylist = async (req, res) => {
    try {
        const song_id = req.params.song_id;

        const result = await repo.addToPlaylist(song_id);
        res.status(201).json({
            status_code: 201,
            message: 'success adding to playlist',
            data: result,
        });
        return;
    } catch (error) {
        res.status(500).json({
            status_code: 500,
            message: 'error adding to playlist',
        });
        return;
    }
}

const playSongInPlaylist = async (req, res) => {
    try {
        const song_id = req.params.song_id;

        const result = await repo.playSongInPlaylist(song_id);
        res.status(201).json({
            status_code: 201,
            message: 'success playing song in playlist',
            data: result,
        });
        return;
    } catch (error) {
        res.status(500).json({
            status_code: 500,
            message: 'error playing song in playlist',
        });
        return;
    }
}

const deleteFromPlaylist = async (req, res) => {
    try {
        const song_id = req.params.song_id;

        const result = await repo.deleteFromPlaylist(song_id);
        res.status(200).json({
            status_code: 200,
            message: 'success deleting from playlist',
            data: result,
        });
        return;
    } catch (error) {
        res.status(500).json({
            status_code: 500,
            message: 'error deleting from playlist',
        });
        return;
    }
}

module.exports = {
    getPlaylist,
    addToPlaylist,
    playSongInPlaylist,
    deleteFromPlaylist,
}