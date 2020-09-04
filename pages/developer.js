import React, {Component} from 'react'
import { Button, Icon, Card } from 'semantic-ui-react'
import Layout from '../Components/Layout';


const description = [
    'There is nothing special that you need to know about me.',
    'Another ordinary Human from and oridanry planet you come across daily.',
  ].join(' ')

class ButtonExampleSocial extends Component{

    render(){
        return(
            <Layout>
                <div>
                    <Card>
                        <Card.Content header="About Me" />
                        <Card.Content description={description} />
                        <Card.Content extra>
                            <Icon name="user" />3rd year Undergrad
                        </Card.Content>
                    </Card>
                </div>
                <div style={{marginTop:'10px'}}>
                    <a href="https://www.facebook.com/yatharth.arora.52/">
                        <Button colo="facebook">
                            <Icon name="facebook" /> Facebook
                        </Button>
                    </a>
                    
                    <a href="https://twitter.com/YatharthArora8">
                        <Button colo="twitter">
                            <Icon name="twitter" /> Twitter
                        </Button>
                    </a>

                    <a href="https://www.linkedin.com/in/yatharth-a-389663128/">
                        <Button colo="linkedin">
                            <Icon name="linkedin" /> LinkedIn
                        </Button>
                    </a>
                    <a href="https://www.instagram.com/yathartharora_/">
                        <Button colo="instagram">
                            <Icon name="instagram" /> Instagram
                        </Button>
                    </a>
                    <a>
                        <Button colo="youtube">
                            <Icon name="youtube" /> YouTube
                        </Button>
                    </a>
                </div>

            </Layout>
        )
    }

}

 

export default ButtonExampleSocial
