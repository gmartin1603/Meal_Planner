const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');
const router = express.Router();
const fs = require('fs');
const Recipies = './data.json';
const port = 3000;

let app = express();
app.use(bodyParser.urlencoded(
    { extended: false }
));
app.use(bodyParser.json());
app.use('/', router);

router.get('/', (req, res) => {    
    getData(req);
    res.sendStatus(200);
    
})

router.post('/', (req, res) => {
    let data = JSON.stringify(req.body);
    saveData(data);
    res.sendStatus(200);
})

const getData = (data) => {
    let rawdata = fs.readFileSync(Recipies);
    let recipies = JSON.parse(rawdata);
    console.log(recipies.id);
    return {
        recipies
    }
}


const saveData = (data) => {
    try {
        express.json(data);
        fs.writeFileSync('\data.json', data);
    } catch (err) {
        console.log(err);
    }

}

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))