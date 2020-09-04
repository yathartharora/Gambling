const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());

const createMatch = require('../ethereum/build/CreateMatch.json');
const Gambling = require('../ethereum/build/Gambling.json');

let accounts;
let CreateMatch;
let gambling;
let GamblingAddress;

beforeEach(async() => {
    accounts = await web3.eth.getAccounts();


    CreateMatch = await new web3.eth.Contract(JSON.parse(createMatch.interface))
        .deploy({data: createMatch.bytecode})
        .send({from: accounts[0], gas: '3000000'});

    await CreateMatch.methods.createNewmatch("CSK","MI").send({
        from: accounts[0],
        gas: '3000000'
    });

    const addresses = await CreateMatch.methods.getDeployedContracts().call();

    GamblingAddress = addresses[0];

    gambling = await new web3.eth.Contract(JSON.parse(Gambling.interface), GamblingAddress);
});


describe('Gambling', () => {

    it('deploys a smart Contract', () => {
        assert.ok(CreateMatch.options.address);
        assert.ok(gambling.options.address);
    });

    it('Marks caller as the manager', async () => {
        const manager = await gambling.methods.manager().call();
        assert.equal(manager,accounts[0]);
    });

    it('Can contribute to team A', async () => {
        await gambling.methods.contributeTeam1().send({
            value: 0,
            from: accounts[0]
        });

        const bet = await gambling.methods.team1(0).call();
        assert.equal(accounts[0],bet);
    });
    

    it('Can contribute to team B', async () => {
        await gambling.methods.contributeTeam2().send({
            value: 0,
            from: accounts[1]
        });

        const bet = await gambling.methods.team2(0).call();
        assert.equal(accounts[1],bet);
    });


});
