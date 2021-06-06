const arc = require('@architect/functions');

exports.findUser = async function(email) {
    const data = await arc.tables();
    return data.users.query({
        KeyConditionExpression: 'email = :email',
        ExpressionAttributeValues: {
          ':email': email
        }
    });
}

const CREATE_USER_EVENT = 'user-registered';

exports.createUser = async function({ email, name }) {
    const data = await arc.tables();
    const response = await data.users.put({ email, name });

    await arc.queues.publish({
        name: CREATE_USER_EVENT,
        payload: { email }
    });

    return response;
}
