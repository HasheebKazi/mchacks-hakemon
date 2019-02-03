const path = require('path');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

// util imports
const utils = require("./public/scripts");

// create server
const app = express();
// configure server
// app.set('view engine', 'ejs');
app.set('views', 'views');

// routes imports

// global middle ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// const inputs = [];

// routes
app.post('/msg', (req, res, next) => {
    // const twiml = new MessagingResponse();
  
    // twiml.message('The Robots are coming! Head for the hills!');
  
    // res.writeHead(200, {'Content-Type': 'text/xml'});
    // res.end(twiml.toString());

    console.log(req.body);
    var msgFrom = req.body.From;
    var msgBody = req.body.Body;

    if ( msgBody === '1') {
        // inputs.push({ "player_1": msgFrom});
        fs.writeFileSync('./data/player_1.json', JSON.stringify({ "player": msgFrom, "order": "1"}));

        // console.log(inputs);
    } else if ( msgBody === '2') {
        fs.writeFileSync('./data/player_2.json', JSON.stringify({ "player_2": msgFrom, "order": "2"}));
        // inputs.push({ "player_2": msgFrom});
        // console.log(inputs);
    } else if ( msgBody === 'a' || msgBody === 'b' || msgBody === 'c' || msgBody === 'A' || msgBody === 'B' || msgBody === 'C') {
        const num = utils.randNum();
        fs.writeFileSync('./data/moves.json', JSON.stringify({ "number": msgFrom, "input": msgBody.toLowerCase(), "auth": num}));
    } else {
        // console.log('Error invalid input.');
        // console.log(msgBody);
        res.redirect('/');
    }
});

app.get('/admin/del', (req, res) => {
    utils.delData("./data/player_1.json");
    utils.delData("./data/player_2.json");
    utils.delData("./data/moves.json");
    res.redirect('/');
});

app.use('/', (req, res, next) => {
    console.log(req);
});
// app.use(shopRoutes);

// error routes
// app.use(errorController.get404);

// start server;
app.listen(3000);
    // res.send(`
    //     <Response>    
    //         <Message>
    //             Hello ${msgFrom}. You said: ${msgBody}
    //         </Message>
    //     </Response>
    // `)p