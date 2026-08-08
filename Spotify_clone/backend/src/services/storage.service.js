const {ImageKit} = require('@imagekit/nodejs');

const ImagekitClient = new ImageKit({
    privateKey:process.env.IMAGEKIT_URI
})

async function uploadFile(file) {
    const result = await ImagekitClient.files.upload({
        file,
        fileName:"music_" + Date.now(),
        folder:"spotify_clone/music"
    })
    return result;
}

module.exports = uploadFile