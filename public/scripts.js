const fs = require('fs');

const delData = (path) => {
    fs.unlinkSync(path);
};

const randomNumber = () => {
    return Math.floor(Math.random()*80 + Math.random()*800 + Math.random()*8000);
};

module.exports = {
    "delData": delData,
    "randNum": randomNumber
};