import web3 from './web3';
import Match from './build/CreateMatch.json';

const instance = new web3.eth.Contract(JSON.parse(Match.interface),'0x2e2cbae8deac96a25c31737696046cf5bc7423dd');


export default instance;