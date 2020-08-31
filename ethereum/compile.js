const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const buildPath = path.resolve(__dirname,'build');

fs.removeSync(buildPath);

const Gamblingpath = path.resolve(__dirname,'contracts','Gambling.sol');

const source = fs.readFileSync(Gamblingpath,'utf8');

const output = solc.compile(source,1).contracts;

fs.ensureDirSync(buildPath);

for (let c in output) {
    fs.outputJSONSync(
        path.resolve(buildPath, c.replace(':','') + '.json'),
        output[c],
    );
}