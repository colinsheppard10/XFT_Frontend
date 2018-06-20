import React, { Component } from 'react'
import { connect } from 'react-redux';
import AnimateHeight from 'react-animate-height';
import { Card, Icon, Image, Button, Transition, Grid, Segment, Input, Divider } from 'semantic-ui-react';

class PinLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tokenName: '',
            tokenPin: '',
            height: 0
        }

        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    toggle = () => {
        this.setState({
            height: this.state.height === 0 ? 'auto' : 0,
        })
    }

    onFormSubmit = async event => {
        // event.preventDefault();
        // console.log(this.props.contracts);
        // // create a global store for loading
        // // this.setState({ loading: true, errorMessage: '' });
        // const outputt = await this.submitProposeBoxRequest();
    };

    submitProposeBoxRequest = () => {
        // return this.props.contracts.xFitTokenCrowdsale.deployed()
        //     .then(instance => {
        //         return instance.createProject(
        //             this.state.projectAddress,
        //             this.state.projectCost,
        //             this.props.contracts.accounts[0],
        //             this.state.projectName,
        //             '123',
        //             '456',
        //             { from: this.props.contracts.accounts[0], value: '5', gas: '1000000' }
        //         )
        //     }).then((message) => {
        //         console.log(message);
        //     }).catch(err => {
        //         console.log(err);
        //     })
    }

    render() {
        const { height } = this.state;
        if (!this.props.contracts.isBoxOwner) {
            return (
                <div></div>
            )
        }
        return (
            <Grid>
                <Grid.Column className='right aligned'>
                    <Button as='a' inverted={!this.props.fixed} onClick={this.toggle}>
                        Log in Members
                    </Button>
                    <AnimateHeight
                        duration='1000'
                        height={height}
                    >
                        <Grid.Row>
                            <Input
                                fluid
                                placeholder='Token Name'
                                style={{ padding: '.5em 0em' }} vertical
                                value={this.state.tokenName}
                                onChange={event => this.setState({ tokenName: event.target.value })}
                            />
                            <Input
                                fluid
                                placeholder='Token Pin'
                                style={{ padding: '0em 0em .5em 0em' }} vertical
                                value={this.state.tokenPin}
                                onChange={event => this.setState({ tokenPin: event.target.value })}
                            />
                            <Button disabled={this.state.tokenPin == '' || this.state.tokenPin == '' ? true : false}
                                onClick={this.onFormSubmit} primary style={{ padding: '.5em' }} fluid vertical size='huge'>Check-In Member</Button>
                        </Grid.Row>
                    </AnimateHeight>
                </Grid.Column>
            </Grid>
        );
    }
}

function mapStateToProps(state) {
    return { contracts: state.contracts }
}
export default connect(mapStateToProps)(PinLogin);
