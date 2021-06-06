const arc = require('@architect/functions');
const { getRandomQuote } = require('@architect/shared/quotes');

exports.handler = arc.http.async(handler);

async function handler(request) {
    return {
        cacheControl: 'public, max-age=86400',
        json: {
            ok: true,
            quote: getRandomQuote(),
        },
    };
}