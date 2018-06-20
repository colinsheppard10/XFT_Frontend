import React, { Component } from 'react'
import { connect } from 'react-redux';
import AnimateHeight from 'react-animate-height';
import { Card, Icon, Image, Button, Transition, Grid, Segment, Input, Divider, Container } from 'semantic-ui-react'
import { Element } from 'react-scroll';
import { fetchTokenContract } from '../actions';


class ProposeBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            height: 0,
            buttonVisible: true,
            transferAddress: '',
            loading: false
        };

        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit = async event => {
        event.preventDefault();
        this.setState({ loading: true });
        const outputt = await this.submitTokenTransfer();
        this.setState({ loading: false });
        this.props.fetchTokenContract();
    };

    submitTokenTransfer = () => {
        return this.props.contracts.xFitToken.deployed()
            .then(instance => {
                return instance.transfer(
                    this.state.transferAddress,
                    5,
                    { from: this.props.contracts.accounts[0], gas: '1000000' }
                );
            }).then((message) => {
                console.log(message);
            }).catch(err => {
                console.log(err);
            })
    }

    toggle = () => {
        this.setState({
            height: this.state.height === 0 ? 'auto' : 0,
            buttonVisible: !this.state.buttonVisible
        })
    }

    render() {
        const { height } = this.state;

        return (
            <Element name="proposeBox" >
                <Grid >
                    <Grid.Column >
                        {this.state.buttonVisible && <Button onClick={this.toggle} primary size='huge'>
                            <Icon name='ethereum' />
                            Transfer Token
                        </Button>}
                        <Grid.Row>
                            <AnimateHeight
                                duration='1000'
                                height={height}
                            >
                                <div>
                                    <Icon onClick={this.toggle} className='colicon' fitted name='close' />
                                    <br />
                                </div>
                                <Input label='Wallet Address'
                                    fluid
                                    placeholder='Which wallet address will you transfer you token to?'
                                    style={{ padding: '.5em 0em' }} vertical
                                    value={this.state.transferAddress}
                                    onChange={event => this.setState({ transferAddress: event.target.value })}
                                />
                                <Button loading={this.state.loading} disabled={this.state.transferAddress == '' ? true : false}
                                    onClick={this.onFormSubmit} primary style={{ padding: '.5em .8em' }} vertical size='huge'>
                                    <Icon name='ethereum' />
                                    Submit Token Transfer</Button>
                            </AnimateHeight>
                        </Grid.Row>
                    </Grid.Column>
                </Grid>
            </Element>
        );
    }
}

function mapStateToProps(state) {
    return { contracts: state.contracts }
}
export default connect(mapStateToProps, { fetchTokenContract })(ProposeBox);
