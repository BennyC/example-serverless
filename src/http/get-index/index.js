const arc = require('@architect/functions');
const nunjucks = require('nunjucks');

const env = nunjucks.configure('.')
env.addFilter('asset', (str) => arc.static(str));

/**
 * Find a querystring parameter within an architect request object
 *
 * @param request
 * @param key
 * @param def
 */
const param = (request, key, def = null) => {
    const params = request.queryStringParameters ?? {};
    return params[key] ?? def;
}

exports.handler = arc.http.async(http);

async function http(request) {
    const html = nunjucks.render('index.html', { errors: request.session.errors })

    return {
        html,
    };
}
