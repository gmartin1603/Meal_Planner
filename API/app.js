const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');
const router = express.Router();
const fs = require('fs');
const Recipies = './data.json';
const port = 9000;

let app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(bodyParser.urlencoded(
    { extended: false }
));
app.use(bodyParser.json());
app.use('/', router);


router.get('/API/recipes', (req, res) => {    
    let data = fs.readFileSync(Recipies);
    console.log("The data sent");
    res.send(data);
    
})



router.post('/Post', (req, res) => {
    let data = JSON.stringify(req.body);
    saveData(data);
    res.sendStatus(200);
})




const saveData = (data) => {
    try {
        express.json(data);
        const currentList = fs.readFilesync(Recipies);
        currentList.unshift(data);
        fs.writeFileSync(currentList);
    } catch (err) {
        console.log(err);
    }

}

app.listen(port, () => console.log(`Server running at http://localhost:${port}`))