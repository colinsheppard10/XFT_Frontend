import React, { Component } from 'react'
import { connect } from 'react-redux';
import AnimateHeight from 'react-animate-height';
import { Card, Icon, Image, Button, Transition, Grid, Segment, Input, Divider, Header } from 'semantic-ui-react'
import { Element } from 'react-scroll';
import TokenTransfer from './token_transfer';
import MetaMaskImage from "../images/metaMask.jpg";


class NotConnected extends Component {
    render() {
        return (
            <Card fluid centered>
                <Card.Content>
                    <Image centered src='https://s15.postimg.cc/7s34jtc7r/xfcoin.png' size='tiny' />
                    <Header as='h1' inverted>Get Connected To The Ethereum Network!</Header>
                    <Card.Description style={{ padding: '.5em 0em' }} vertical>
                        <Card fluid className='colcard' centered >
                            <h3 style={{ padding: '1em 2em' }}>X-Fit is not detecting a bridge to the Ethereum network in your browser.
                                The easiest way to get started is with MetaMask.
                           </h3>
                            <Image href='https://metamask.io/' target='_blank' centered src={MetaMaskImage} size='small' />
                            <h3><a href='https://metamask.io/' target='_blank'>Download MetaMask</a></h3>
                        </Card>
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }
}

export default NotConnected;