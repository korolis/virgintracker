var http = require('http');

const md5 = require('md5');
const moment = require('moment');
const fetch = require('node-fetch');

const devId = '3643';
const apiKey = '9000E434C7EC4F08B17366CFF610BDE9';

var express = require('express');
const { ENETUNREACH } = require('constants');
const { request } = require('express');
const { isContext } = require('vm');

var app = express();

var playerSearch;

var timestamp;

var response;
var url;

var sessionId;

var playerData = [];

function genSignature(method) {
    timestamp = moment.utc().format('YYYYMMDDHHmmss');
    return md5(devId + method + apiKey + timestamp);
}

async function getSessionId() {
    
    var sessionUrl = 'http://api.paladins.com/paladinsapi.svc/gethirezserverstatusJson/' + devId + '/' + genSignature('gethirezserverstatus') + '/' + sessionId + '/' + timestamp;
    response = await get_data(sessionUrl);
    console.log(sessionUrl);
    console.log("\nChecking last sessionId stored... ");

    if (response[0].ret_msg != 'Invalid session id.') {
        console.log("Valid: " + sessionId + '\n');
        return sessionId;
    }
    else {
        sessionUrl = 'http://api.paladins.com/paladinsapi.svc/createsessionJson/' + devId + '/' + genSignature('createsession') + '/' + timestamp;

        response = await get_data(sessionUrl);
        console.log("\nCreating new session.");
    
        if (response.ret_msg == 'Approved')
        {
            console.log("\nSession Id approved: '" + response.session_id + "'\n");
            return response.session_id;
        }
        else
        {
            console.log("\nFailed to get Session Id.\n");
        }  
    }
}

const get_data = async url => {
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
};

app.get('/player', async function(req, res){

    playerSearch = req.query.name.split(',');
    console.log(playerSearch);

    res.header('Access-Control-Allow-Origin', '*');

    sessionId = await getSessionId();

    console.log("Retrieving player data (/getplayer): ");
    for (const item of playerSearch){
        url = 'http://api.paladins.com/paladinsapi.svc/getplayerjson/' + devId + '/' + genSignature('getplayer') + '/' + sessionId + '/' + timestamp + '/' + item;
        response = await get_data(url);
        console.log(item);
        console.log(url);
 
        if (Object.keys(response).length === 0)
        {
            console.log('Player not found.\n');
            continue;
        }

        url = 'http://api.paladins.com/paladinsapi.svc/getplayerstatusjson/' + devId + '/' + genSignature('getplayerstatus') + '/' + sessionId + '/' + timestamp + '/'+ item;
        
        var statusResponse = await get_data(url);
        
        playerData.push({
            name : response[0].hz_player_name,
            level : response[0].Level,
            hours_played : response[0].HoursPlayed,
            wins : response[0].Wins,
            losses : response[0].Losses,
            title : response[0].Title,
            avatar_url : response[0].AvatarURL,
            status : statusResponse[0].status_string,
        });
    }

    res.json(playerData);

    playerSearch = [];
    playerData = [];
});

app.listen(5000);