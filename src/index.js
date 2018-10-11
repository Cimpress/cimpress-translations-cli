#!/usr/bin/env node

require("regenerator-runtime/runtime");

const program = require('commander');

const packageInfo = require('../package');

const getAccessToken = require("./tools/accessToken").getAccessToken;
const downloadTranslations = require("./tools/translations").downloadTranslations;
const printError = require("./tools/helpers").printError;
const log = require("./tools/helpers").log;

program
    .version(packageInfo.version)
    .option('-a, --application-id <id>', 'Cimpress Translation Application ID (as defined in https://translations.cimpress.io')
    .option('-c, --client-id <id>', 'Auth0 Client ID')
    .option('-s, --client-secret <secret>', 'Auth0 Client Secret')
    .option('-t, --translations-file <filepath>', 'File where a single file with all languages is created.')
    .parse(process.argv);

program.on('--help', () => {});

if (!program.applicationId || !program.clientId || !program.clientSecret || !program.translationsFile) {
    printError('Not all required parameters have been provided');
    program.outputHelp();
    process.exit(1);
}

async function exec() {

    log('Retrieving Auth0 token...');
    const token = await getAccessToken(program.clientId, program.clientSecret);

    await downloadTranslations(token, program);
}

exec().catch((e) => {
        printError(e);
        process.exit(1);
    });