const fs = require('fs');
const path = require('path');

const CimpressTranslationsClient = require('cimpress-translations').CimpressTranslationsClient;

const log = require("./helpers").log;

const downloadTranslations = async (token, params) => {

    let translationClient = new CimpressTranslationsClient(null, `Bearer ${token}`);

    log(`Retrieving service ${params.applicationId} description...`);
    const description = await translationClient.describeService(params.applicationId);

    log(`Retrieving service ${params.applicationId} description... DONE. Found languages: ${JSON.stringify(description.languages.map((s) => s.blobId))}`);
    const languagePromises = [];
    const translations = {};
    description.languages.forEach((lang) => {
        log(`Retrieving language translation for ${lang.blobId}`);
        languagePromises.push(
            translationClient.getLanguageBlob(params.applicationId, lang.blobId)
                .then((blob) =>translations[blob.blobId] = blob.data )
        );
    });

    await Promise.all(languagePromises);

    if (!fs.existsSync(path.dirname(params.translationsFile))) {
        log('Creating translations folder...');
        fs.mkdirSync(path.dirname(params.translationsFile));
    }

    log(`Storing translations into ${params.translationsFile}`);
    fs.writeFileSync(params.translationsFile, JSON.stringify(translations, null, 4));
};

module.exports.downloadTranslations = downloadTranslations;