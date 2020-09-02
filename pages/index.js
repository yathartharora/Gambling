import React, {Component} from 'react';
import Layout from '../Components/Layout';
import Newmatch from '../ethereum/NewMatch';
import {Card, Button} from 'semantic-ui-react';
import {Link} from '../routes';


class NewMatch extends Component {

    static async getInitialProps() {
        const matches = await Newmatch.methods.getDeployedContracts().call();
        //console.log(matches.length);
        return {matches};
    }

    renderMatches() {
        const items = this.props.matches.map(address => {
            return{
                header: (`${address.sender}`),
                description: (
                    <Link route={`/matches/${address.sender}`}>
                        <a>VIEW MATCH BET</a>
                    </Link>

                ),
                meta: (`${address.teamA} V/S ${address.teamB}`),
                fluid: true
            };
        });
        return <Card.Group items={items}></Card.Group>
    }

    render(){
        return(
            <Layout>
                <div>
                <Link route= "/newmatch">
                    <a>
                        <Button
                            content = 'Create a new Bet'
                            icon = "add"
                            floated = "right"
                            primary
                        />
                    </a>
                </Link>
                    
                    {this.renderMatches()}
                </div>
    
            </Layout>
    
        );
    }
}


export default NewMatch;
