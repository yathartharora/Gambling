import web3 from './web3';
import Gambling from './build/Gambling.json';


export default (address) => {
    return new web3.eth.Contract(JSON.parse(Gambling.interface),address);
};