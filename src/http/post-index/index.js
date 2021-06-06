const arc = require('@architect/functions');
const { findUser, createUser } = require('@architect/shared/users');
const yup = require('yup');

const schema = yup.object()
    .shape({
        name: yup.string().required('A name is required.'),
        email: yup.string()
            .email()
            .required('An email is required.')
            .test('checkEmail', 'You\'ve already registered with this email address.', async (value) => {
                const result = await findUser(value);
                return result.Items.length === 0;
            })
    });

/**
 * Build an object of errors from a Yup ValidationError.inner
 *
 * @param {yup.ValidationError} err
 * @returns
 */
function buildSessionErrors(err) {
    const errors = {};
    err.inner.forEach((e) => {
        errors[e.path] = e.errors.shift();
    });

    return errors;
}

exports.handler = arc.http.async(http);

async function http(request) {
    try {
        const result = await schema.validate(request.body, { abortEarly: false });
        await createUser(result);
    } catch (err) {
        console.error(err);
        return {
            location: request.headers.origin,
            session: { errors: buildSessionErrors(err) }
        };
    }

    return {
        location: '/registered',
        session: {
            errors: null
        }
    };
}