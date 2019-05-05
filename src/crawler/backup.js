
const express = require('express');
const router = express.Router();
const request = require('request');
const jsdom = require("jsdom");
const iconv  = require('iconv-lite');
const { JSDOM } = jsdom;
const  fs = require('fs');
const htmlMock = require('./crawler/mock')


const app = express();

let requestOptions  = { method: 'GET', uri: 'https://www.linguee.com.br/portugues-ingles/search?source=auto&query=casa',encoding: null};

 function teste (funcao) {
    
         request(requestOptions, (error, response, body) =>{
        
        retorno = iconv.decode(body, 'iso-8859-1');

        fs.writeFile('text.txt', retorno, function(err, data) {
            
          });
        return funcao(false, retorno)
    })
}



router.get('/', (require, response) => {
     let resp =   teste()
     teste((err, data) => {
        return response.send(data)
     })
    console.log(htmlMock)
    response.send(htmlMock)
})

module.exports = router;