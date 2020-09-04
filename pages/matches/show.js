import React, {Component} from 'react';
import Gambling from '../../ethereum/gambling';
import Layout from '../../Components/Layout';
import { Icon, Input, Button, Message, Table, Header, Form } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import RequestRow from '../../Components/requestRow';
import {Link, Router} from '../../routes';


class showmatch extends Component{


    static async getInitialProps(props){

        const gambling = Gambling(props.query.address);

        const totalTeam1 = await gambling.methods.totalMoneyTeam1().call();
        const totalTeam2 = await gambling.methods.totalMoneyTeam2().call();
        const team1 = await gambling.methods.gamblersTeam1().call()
        const team2 = await gambling.methods.gamblersTeam2().call()
        const {address} = props.query;
        const complete = await gambling.methods.complete().call()

        return {
            address,
            totalTeam1,
            totalTeam2,
            team1,
            team2,
            complete
        };
    }


    state = {
        loading: false,
        contribute: '',
        errorMessage: '',
        visible: true,
        loading1: false,
        contribute1: '',
        errorMessage1: '',
        loading2: false,
        visible: false,
        errorMessage2: '',
        winner2: ''

    }


    renderTeam1(){
        return this.props.team1.map(sender => {
            return ( <RequestRow
                address= {sender}
                />
            )
        })
    }

    renderTeam2(){
        return this.props.team2.map(sender => {
            return( <RequestRow
                address = {sender}
                />)
        })
    }


    onSubmit = async (event) => {
        event.preventDefault();
        const gambling = Gambling(this.props.address);
        {this.setState({loading: true, errorMessage:''})};
        
        try {
            const accounts = await web3.eth.getAccounts();
            console.log(accounts[0]);
            await gambling.methods.contributeTeam1().send({
                from:accounts[0],
                value: this.state.contribute
            });
            
            Router.pushRoute(`/matches/${this.props.address}`)
        } catch (error) {
            this.setState({errorMessage: error.message});
        }
        this.setState({loading:false});
    }


    onFinalize = async(event) => {
        event.preventDefault();
        const gambling = Gambling(this.props.address);
        this.setState({loading1: true, errorMessage1:''});
        console.log(this.props.totalTeam2);
        try {
            const accounts = await web3.eth.getAccounts();
            console.log(accounts[0]);
            await gambling.methods.contributeTeam2().send({
                from:accounts[0],
                value: this.state.contribute1
            });
            Router.pushRoute(`/matches/${this.props.address}`)
        } catch (error) {
            this.setState({errorMessage1: error.message});
        }
        this.setState({loading1:false});
    }

    onWinner = async(event) => {
        event.preventDefault();
        const gambling = Gambling(this.props.address);

        this.setState({loading2: true, errorMessage2:''});
        try {
            const accounts = await web3.eth.getAccounts();
            console.log(accounts[0]);
            await gambling.methods.Winner(this.state.winner2).send({
                from:accounts[0],
                gas: '1000000'
            });
            Router.pushRoute(`/matches/${this.props.address}`)
        } catch (error) {
            this.setState({errorMessage2: error.message});
        }
            this.setState({loading2:false, visible:true});
    }
    

    render(){

        const {Header, Row, HeaderCell, Body} = Table;
        return(
            <Layout>
                <h3>Enter the amount of wei and click on the team you want to bet your money on.</h3>
                <div style={{float: "right"}}>
                    <h4>Total Money at stake for TEAM-A: {this.props.totalTeam1}</h4>
                    <h4>Total Money at stake for TEAM-B: {this.props.totalTeam2}</h4>    
                </div>
                <div>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Field>
                        <Input
                            label="wei"
                            labelPosition="right"
                            value = {this.state.contribute}
                            onChange = {event => this.setState({contribute: event.target.value})}
                         /> 
                        </Form.Field>
                        <Message error header="Oops" content = {this.state.errorMessage} />
                        <Button
                            primary
                            loading={this.state.loading}
                            disabled={this.props.complete}
                    > <Icon name="handshake" />TEAM-A</Button>
                    </Form>


                    <Form onSubmit={this.onFinalize}>
                        <Form.Field>
                        <Input
                            label="wei"
                            labelPosition="right"
                            value = {this.state.contribute1}
                            onChange = {event => this.setState({contribute1: event.target.value})}
                         /> 
                        </Form.Field>
                        <Message error header="Oops" content = {this.state.errorMessage1} />
                        <Button
                        secondary
                        loading={this.state.loading1}
                        disabled={this.props.complete}
                    > <Icon name="handshake" />TEAM-B</Button>
                    </Form>
                    
                </div>
                
                <br></br>
                <div>
                    

                    
                </div>

                <h3>{'<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<'} - Recent Gamblers - {'>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>'}</h3>

                <div style={{float:"left"}}>
                    <Table>
                        <Header>
                            <Row>
                                <HeaderCell>Team-A Bets</HeaderCell>
                            </Row>
                        </Header>
                        <Body>
                            {this.renderTeam1()}
                        </Body>
                    </Table>
                </div>

                <div style={{float:"right"}}>
                    <Table>
                        <Header>
                            <Row>
                                <HeaderCell>Team-B Bets</HeaderCell>
                            </Row>
                        </Header>
                        <Body>
                            {this.renderTeam2()}
                        </Body>
                    </Table>
                </div>

                <div style={{float:"right", marginRight: '45px'}}>
                <Form onSubmit={this.onWinner}>
                    <Form.Field>
                    <Input 
                        value= {this.state.winner2}
                        onChange = {event => this.setState({winner2: event.target.value})}
                    />
                    </Form.Field>
                    <Message error header="Oops" content = {this.state.errorMessage2} />
                    <Button primary loading={this.state.loading2}> WINNER </Button>
                </Form>
                </div>
                
            </Layout>
        );
    }
}

export default showmatch;