var devcert = require('devcert');
var PACKAGE = require('../package.json');
var fs = require('fs');
var notice = function () {
    console.log('The operating system needs your password to authorize the certificate authority.');
    console.log('Details: https://github.com/davewasmer/devcert');
};
var exists = function () {
    var key = __dirname + '/certs/tls.key';
    try {
        return fs.existsSync(key);
    } catch (err) {
        console.log(err);
        return false;
    }
};
var ui = {
    getWindowsEncryptionPassword: async (input) =>
        new Promise((resolve, reject) => resolve('asdf')),
    warnChromeOnLinuxWithoutCertutil: async (input) =>
        new Promise((resolve, reject) => resolve('asdf')),
    closeFirefoxBeforeContinuing: async () => console.log('Close Firefox before continuing.'),
    startFirefoxWizard: async (certificateHost) => console.log(certificateHost),
    firefoxWizardPromptPage: async (certificateURL) => console.log(certificateHost),
    waitForFirefoxWizard: async () => true,
};

if (!exists()) {
    notice();
}

(async function () {
    devcert
        .certificateFor(PACKAGE.name + '.local')
        .then(function ({ key, cert }) {
            fs.writeFileSync(__dirname + '/certs/tls.key', key);
            fs.writeFileSync(__dirname + '/certs/tls.cert', cert);
        })
        .catch(console.error)
        .finally(() => console.log('Certificates created.'));
})();
