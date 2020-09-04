import React,{Component } from 'react';
import {Card} from 'semantic-ui-react';
import Layout from '../Components/Layout';

class About extends Component {

    renderCards() {
        const items = [
            {
                header: 'Manager',
                meta: 'Match manager',
                description: 'The Manager is responsible for creating the match. Only the manager can decalre the Winner as of now. After further improvements in the project this will be automated soon!',
                style: {overflowWrap: 'break-word'}
            },
            {
                header: 'About Project',
                meta: 'Solidity smart contract',
                description: 'A decentralized and trusted betting application. Try your luck by investing money for your favourite team in ta given match. The winning team are guaranteed to win more then their base amount invested.',
            },
            {
                header: 'Yatharth Arora',
                meta: 'Project Developer',
                description: 'You can drop an email at yathartharora1999@gmail.com for further queries or reach me at my Twitter handle: @YatharthArora8 ',
            },
            {
                header: 'Tools and Libraries',
                meta: '',
                description: 'The Frontend has been developed using Next.js and the smart contract has been written in Solidity. Further the Project makes use of MetaMask and runs on Ropsten Test Network'
            },
            {
                header: 'Version',
                meta: 'Versioning sucks',
                description: '{web3: 1.0.0-beta.26} , {next:^4.1.4} , {react: 16.3.1} , {Solidity:^0.4.25} , {ganache-cli:^6.1.1} , {mocha:^^8.1.1}'
            }
        ];
        return <Card.Group items={items} />;
    }


    render(){
        return(
            <Layout>
                {this.renderCards()}
            </Layout>
        );
    }
}

export default About; 