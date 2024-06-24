import fs from 'fs';

import * as bencode from 'bencode';
import * as dgram from "node:dgram";
import * as buffer from "node:buffer";
import urlParse from 'url';

const torrentPath = 'puppy.torrent';

const torrent = bencode.decode(fs.readFileSync(torrentPath));
const url = urlParse.parse(torrent.announce.toString('utf-8'));

const socket: dgram.Socket = dgram.createSocket('udp4');
const myMessage: buffer.Buffer = Buffer.from('hello', 'utf-8');

// @ts-ignore
socket.send(myMessage, 0, myMessage.length, url.port, url.host, () => {
    console.log('message sent');
});

socket.on('message', (response) => {
    console.log('message received', response);
});

console.log(torrent.announce.toString('utf-8'));
