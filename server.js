const express = require('express')
const app = express();
const path = require('path');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
app.use(express.static('public'));
app.use(express.json());



const connectDB = require('./config/db');
connectDB();

// Cors
const corsOptions = {
    origin: process.env.ALLOWED_CLIENTS
}
app.use(cors(corsOptions));

// Template engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Routes
app.use('/api/files',require('./routes/files'));
app.use('/files', require('./routes/show'))
app.use('/files/download', require('./routes/download'));
// app.get('/', function(req,res,next){
//     res.render('home.ejs',require('./views/home.ejs'))
    
// })

app.get('/', (req, res) => res.render('home'));
// app.get('/copy-icon.svg', (req, res) => res.sendFile('./copy-icon.svg'));
// app.get('/undraw_upload.svg', (req, res) => res.sendFile('./undraw_upload.svg'));

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
})