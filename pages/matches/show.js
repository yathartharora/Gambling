import React, {Component} from 'react';
import Gambling from '../../ethereum/gambling';
import Layout from '../../Components/Layout';
import { Form, Input, Button, Message, Table, Header } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';


class showmatch extends Component{


    static async getInitialProps(props){

        const gambling = Gambling(props.query.address);

        const totalTeam1 = await gambling.methods.totalMoneyTeam1().call();
        const totalTeam2 = await gambling.methods.totalMoneyTeam2().call();
        // const team1 = await gambling.methods.team1().call()
        // const team2 = await gambling.methods.team2().call()

        return {
            gambling,
            totalTeam1,
            totalTeam2
        };
    }


    state = {
        loading: false,
        contribute: '',
        errormessage: ''
    }

    // renderRow(){
    //     return this.props.team1.map(sender => {
    //         return ( <RequestRow
    //             address= {sender}
    //             />
    //         )
    //     })
    // }


    onSubmit = async (event) => {
        //event.preventDefault();
        this.setState({loading: true, errorMessage:''});
        
        try {
            const accounts = await web3.eth.getAccounts();
            console.log(accounts[0]);
            await gambling.methods.contributeTeam1().send({
                from:accounts[0],
                gas: '1000000'
            });
            
        } catch (error) {
            this.setState({errorMessage: error.message});
        }
        this.setState({loading:false});
    }


    onFinalize = async(event) => {
        event.preventDefault();
        this.setState({loading: true, errorMessage:''});
        
        try {
            const accounts = await web3.eth.getAccounts();
            console.log(accounts[0]);
            await gambling.methods.contributeTeam2().send({
                from:accounts[0],
                gas: '1000000'
            });
            
        } catch (error) {
            this.setState({errorMessage: error.message});
        }
        this.setState({loading:false});
    }

    render(){

        const {Header, Row, HeaderCell, Body} = Table;
        return(
            <Layout>
                <h3>Whom do you wanna put your money on?</h3>
                <div style={{float: "right"}}>
                    <h4>Total Money at stake for TEAM-A: {this.props.totalTeam1}</h4>
                    <h4>Total Money at stake for TEAM-B: {this.props.totalTeam2}</h4>    
                </div>
                <div>
                    <Input
                    value = {this.state.contribute}
                    onChange = {event => this.setState({contribute: event.target.value})}
                    /> 
                </div>
                
                <br></br>
                <div>
                    <Button
                        primary
                        loading={this.state.loading}
                        onClick={this.onSubmit}
                    >TEAM-A</Button>

                    <Button
                        secondary
                        loading={this.state.loading}
                        onClick= {this.onFinalize}
                    >TEAM-B</Button>
                </div>

                <h3>{'<<<<<<<<<<<'} - Recent Gamblers - {'>>>>>>>>>>>>>>>'}</h3>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>Address</HeaderCell>
                            <HeaderCell>Value</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        
                    </Body>
                </Table>
                
                
            </Layout>
        );
    }
}

export default showmatch;