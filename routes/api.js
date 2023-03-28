const express = require("express");
const multer = require("multer");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config()
const router = express.Router();
const upload = multer();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY


const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
});

async function transcribe(buffer) {
    const openai = new OpenAIApi(configuration);
    const response = await openai.createTranscription(
        buffer, // The audio file to transcribe.
        "whisper-1", // The model to use for transcription.
        undefined, // The prompt to use for transcription.
        'json', // The format of the transcription.
        1, // Temperature
        'en' // Language
    )
    return response;
}


router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "index.html"));
});


router.post("/", upload.any('file'), (req, res) => {
    audio_file = req.files[0];
    buffer = audio_file.buffer;
    buffer.name = audio_file.originalname;
    const response = transcribe(buffer);
    response.then((data) => {
        res.send({ 
            type: "POST", 
            transcription: data.data.text,
            audioFileName: buffer.name
        });
    }).catch((err) => {
        res.send({ type: "POST", message: err });
    });
});

module.exports = router