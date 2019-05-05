const express = require('express');
const router = express.Router();
const request = require('request');

const iconv  = require('iconv-lite');

const  fs = require('fs');
const htmlMock = require('./mock');
const axios = require('axios');
const ManipulaDOM = require('./ManipulaDom')

const app = express();

router.post('/teste',(request, response) => {
    lingueeRequest((err, data) => {
        
        let obj = new ManipulaDOM(data);
        return response.send(obj.plainText);
    }, request.body);
})



const lingueeRequest = async (funcao, formContent) => {
    let requestOptions  = {
        encoding: null,
        method: 'GET',
        url: `https://www.linguee.com.br/${formContent.translateFrom}-${formContent.translateTo}/search?source=auto&query=${formContent.stringTranslate}`,
        responseType: 'arraybuffer'
    };
    let response = await axios(requestOptions);
        return funcao(null, response.data);

}



module.exports = router;