
// eslint-disable-next-line
const log = (m,a) => console.log('[translations-cli]', m, a || '');

// eslint-disable-next-line
const error = (m,a) => console.error('[translations-cli]', m, a || '');

const printError = (e) => {

    let printed = false;
    if (e && e.message) {
        error('Message: ', e.message);
        printed = true;
    }

    if (e && e.response) {
        error('Response status: ', e.response.status + ' ' + e.response.statusText);
        printed = true;
    }

    if (!printed) {
        error(e)
    }
};

module.exports = {
    log,
    printError
};
