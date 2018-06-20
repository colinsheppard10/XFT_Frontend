import React, { Component } from 'react'
import { Segment, Container, Header, Button, Divider, Icon } from 'semantic-ui-react'
import { Element } from 'react-scroll';

export default class About extends Component {
    render() {
        return (
            <Element name="about" >
                <Segment className='colabout' inverted textAlign='center' style={{ padding: '2em 25em' }} vertical>
                    <h2>About the Mission</h2>

                    <h3>The X-FIT token will fund the development of a seed fund to proliferate new X-FIT “boxes.” Each owner of the token
                      will have a life-time membership at any and all boxes that use the funds that come from the pool. The price of
                      the memberships ($3314) reflect the DCF of 5 years of the non-adjusted membership payments being around $200,
                      discounted at 70%.
            </h3>
                    <h3>The funds raised will be used to proliferate X-FITs throughout the world by providing excited entrepreneurs with
                      critical initial funds to start their box. The first one is intended to be in Upper Manhattan in NYC, but all
                      future prospects will be decided by those who buy the coin via a voting mechanism built into the smart contract
  associated with their coin.</h3>
                </Segment>
            </Element>
        )
    }
}


