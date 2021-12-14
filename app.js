const path = require('path')

const express = require('express');
const ytdl = require('ytdl-core');

const app = express()


app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})


app.post('/youtube', (req,res) => {
    const url = req.body.url

    ytdl.getBasicInfo(url).then(info =>{
        const title = info.videoDetails.title
        res.header('Content-Disposition', `attachement; filename=${title}.mp4`)

        ytdl(url, {
            quantity: 'highest',
            format: 'mp4'
        }).pipe(res)
    })
    .catch(err => console.log(err))
})


app.listen(8080, () => console.log("Puerto en uso: 8080"))