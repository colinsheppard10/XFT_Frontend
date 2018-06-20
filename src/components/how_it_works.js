import React, { Component } from 'react'
import { Segment, Container, Header, Button, Divider, Icon } from 'semantic-ui-react'
import { Element } from 'react-scroll';

export default class HowItWorks extends Component {
    render() {
        return (
            <Element name="howItWorks" >
                <Segment textAlign='center' style={{ padding: '2em 25em' }} vertical>
                    <h2>How it Works</h2>
                    <h3>X-FIT Coins can be purchased easily & securely via MetaMask. Coins will sponsor a seed fund to proliferate new X-FIT
                      boxes in the NYC area. One coin grants you a lifetime membership to these gyms.
                    </h3>
                    <Button onClick={this.toggle} primary size='huge'>
                        <Icon name='cloud download' /> Download White Paper
                    </Button>
                </Segment>
            </Element>
        )
    }
}


