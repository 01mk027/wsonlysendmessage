const ws = require('ws');
const express = require('express');
const Promise = require('promise');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


function wsClientPromise(url)
{
const client = new ws(url);//Promise denesek???
return new Promise((resolve, reject) => {

  client.onerror = (message) => {
    reject({
        err: "Station is not available!"
    });
  }

  client.onopen = (e) => {
    resolve(client);
  }
})
}


const targetUrl = 'ws://3.84.233.180:5000';



//const w = new ws('ws://3.84.233.180:5000');
//w.onopen = () => w.send('SELAM');

app.get('/', (req, res, next) => {
  res.send('Dunauibarush');
});

app.post('/sendmessage', (req, res, next) => {
    let msgPw = req.body.password;
    if(msgPw === 12345)
    {    
        wsClientPromise(targetUrl).then(client => {
            client.send('Selamıaleykum');
            //client.onmessage = (message) => res.send(JSON.parse(message.data));
            client.close();
        }).catch(err => {
            console.log(err);
        });
    }
    else
    {
        res.sendStatus(401);
    }
})


app.listen(2020, () => {
    console.log('2020 is listening...');
});