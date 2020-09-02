import React, {Component} from 'react';
import Layout from '../../Components/Layout'
import { Form, Button, Input, Message } from 'semantic-ui-react';
import newmatch from '../../ethereum/NewMatch';
import web3 from '../../ethereum/web3';
import {Link, Router} from '../../routes'; 

class CreateNewMatch extends Component {

    state = {
        teama : '',
        teamb: '',
        errorMessage: '',
        loading: false
    };


    onSubmit = async(event) => {
        event.preventDefault();
        this.setState({loading: true, errorMessage:''});
        
        try {
            const accounts = await web3.eth.getAccounts();
            console.log(accounts[0]);
            await newmatch.methods.createNewmatch(this.state.teama,this.state.teamb).send({
                from:accounts[0],
                gas: '1000000'
            });
            
        } catch (error) {
            this.setState({errorMessage: error.message});
        }
        this.setState({loading:false});
    }

    render(){
        return(
            <Layout>
                <h3>Create a new Bet for a Match</h3>
                <Form onSubmit={this.onSubmit}>
                    <Form.Field>
                        <label>Team-A</label>
                        <Input 
                          value = {this.state.teama}
                          onChange = {event => this.setState({teama: event.target.value})}
                        />

                        <label>Team-B</label>
                        <Input 
                          value = {this.state.teamb}
                          onChange = {event => this.setState({teamb: event.target.value})}
                        />
                    </Form.Field>

                    <Message error header="Oops" content = {this.state.errorMessage} />
                    <Button primary loading={this.state.loading}>
                        Create
                    </Button>
                </Form>
            </Layout>
        )
    }
}


export default CreateNewMatch;
