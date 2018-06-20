import React, { Component } from 'react'
import { connect } from 'react-redux';
import AnimateHeight from 'react-animate-height';
import { Card, Icon, Image, Button, Transition, Grid, Segment, Input, Divider, Header } from 'semantic-ui-react'
import { Element } from 'react-scroll';
import TokenTransfer from './token_transfer';

class TokenInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            height: 0,
            editing: false,
            nameEdit: props.contracts.tokenInfo.name,
            boxEdit: props.contracts.tokenInfo.box,
            pinEdit: props.contracts.tokenInfo.pin
        };
    }

    cancelEdit = () => {
        this.setState({
            nameEdit: this.props.contracts.tokenInfo.name,
            boxEdit: this.props.contracts.tokenInfo.box,
            pinEdit: this.props.contracts.tokenInfo.pin,
            editing: false
        })
    }

    submitEdit = () => {
        //Make call to blockChain here
    }

    render() {
        const { height } = this.state;
        return (
            <Card fluid centered>
                <Card.Content>
                    <Image centered src='https://s15.postimg.cc/7s34jtc7r/xfcoin.png' size='tiny' />
                    <Header as='h3' inverted>X-Fit Token Details For Wallet Address: {this.props.contracts.accounts[0]}</Header>
                    <Card.Description style={{ padding: '.5em 0em' }} vertical>
                        <Card className='colcard' centered >
                            {!this.state.editing && <Card.Description>Token Name: {this.props.contracts.tokenInfo.name}</Card.Description>}
                            {!this.state.editing && <Card.Description>Box Address: {this.props.contracts.tokenInfo.box}</Card.Description>}
                            {!this.state.editing && <Card.Description>Pin Login: {this.props.contracts.tokenInfo.pin}</Card.Description>}
                            {!this.state.editing && <Button size='small' basic color='teal' onClick={() => { this.setState({ editing: true }) }}>Edit Token Information</Button>}


                            {this.state.editing && <Input label='Token Name'
                                fluid
                                value={this.state.nameEdit}
                                onChange={event => this.setState({ nameEdit: event.target.value })}
                            />}
                            {this.state.editing && <Input label='Box Address'
                                fluid
                                value={this.state.boxEdit}
                                onChange={event => this.setState({ boxEdit: event.target.value })}
                            />}
                            {this.state.editing && <Input label='Pin Login____'
                                fluid
                                value={this.state.pinEdit}
                                onChange={event => this.setState({ pinEdit: event.target.value })}
                            />}
                            {this.state.editing &&
                                <Button.Group>
                                    <Button size='small' basic color='red' onClick={this.cancelEdit}>Cancel</Button>
                                    <Button size='small' basic color='teal' onClick={this.submitEdit}>Submit</Button>
                                </Button.Group>}

                        </Card>
                        <TokenTransfer />
                    </Card.Description>
                </Card.Content>
                {/* <Card.Content extra>
                    <a href={'https://rinkeby.etherscan.io/address/' + this.props.contracts.accounts[0]} target="_blank">
                        <Icon name='ethereum' />
                        Your Wallet Address: {this.props.contracts.accounts[0]}
                    </a>
                </Card.Content> */}
            </Card>
        );
    }
}

function mapStateToProps(state) {
    return { contracts: state.contracts }
}
export default connect(mapStateToProps)(TokenInfo);