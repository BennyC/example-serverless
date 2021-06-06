const arc = require('@architect/functions');

exports.handler = arc.queues.subscribe(handler);

async function handler(event) {
    console.log(event);
}