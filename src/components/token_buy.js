import React, { Component } from 'react'
import { connect } from 'react-redux';
import AnimateHeight from 'react-animate-height';
import { Card, Icon, Image, Button, Transition, Grid, Segment, Input, Divider } from 'semantic-ui-react'
import { Element } from 'react-scroll';
import TokenInfo from './token_info';
import { fetchTokenContract } from '../actions';


class BuyToken extends Component {
    constructor(props) {
        super(props);

        this.state = {
            height: 0,
            buttonVisible: true,
            gyms: [],
            selectedBox: '',
            tokenName: '',
            loading: false
        };

        this.onTokenNameInputChange = this.onTokenNameInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onTokenNameInputChange(event) {
        this.setState({ tokenName: event.target.value })
    }

    onFormSubmit = async event => {
        // show model to lock whole screen
        event.preventDefault();
        this.setState({ loading: true });
        const output = await this.submitBuyTokenRequest();
        this.setState({ loading: false });
        this.props.fetchTokenContract();
    }

    submitBuyTokenRequest = () => {
        return this.props.contracts.xFitTokenCrowdsale.deployed()
            .then(instance => {
                return instance.buyxFitToken(
                    this.props.contracts.accounts[0],
                    this.state.selectedBox,
                    this.state.tokenName,
                    { from: this.props.contracts.accounts[0], value: '5', gas: '1000000' });
            }).then(message => {
                console.log(message);
            }).catch(err => {
                console.error(err);
            });
        // return this.props.contracts.xFitToken.deployed()
        //     .then(instance => {
        //         return instance.updatePinOwner(
        //             '0x45A06CA078B3eB8e047ca09dfeA874ba9cCEd08a',
        //             '0x474aD01A8Ab12a1804B9b77EA3f32D8ae96e9d58',
        //             { from: this.props.contracts.accounts[0], gas: '1000000' });
        //     }).then(message => {
        //         console.log(message);
        //     }).catch(err => {
        //         console.error(err);
        //     });
    }

    toggle = () => {
        this.setState({
            height: this.state.height === 0 ? 'auto' : 0,
            buttonVisible: !this.state.buttonVisible
        });
    };

    render() {
        const { height } = this.state;
        // this is the check to see if the currently logged in account is a token holder
        if (this.props.contracts.tokenTransfers.transfers[this.props.contracts.accounts[0].toLowerCase()]) {
            return (
                <Element name="buyToken" >
                    <TokenInfo />
                </Element>
            );
        }
        return (
            <Element name="buyToken" >
                {this.state.buttonVisible && <Button onClick={this.toggle} primary size='huge'>
                    <Icon name='ethereum' />Buy Token
                </Button>}
                <AnimateHeight
                    duration={800}
                    height={height}
                >
                    <div>
                        <Icon onClick={this.toggle} className='colicon' fitted name='close' />
                        <br />
                    </div>
                    <Card fluid centered>
                        <Card.Content>
                            <Image centered src='https://s15.postimg.cc/7s34jtc7r/xfcoin.png' size='tiny' />
                            <Divider horizontal>Step 1: Provide a name</Divider>
                            <Card.Description style={{ padding: '.5em 0em' }} vertical>
                                <Input label='Name' fluid placeholder='You will use this name to identify youself at your X-Fit box'
                                    value={this.state.tokenName}
                                    onChange={this.onTokenNameInputChange}
                                />
                                <Divider horizontal>Step 2: Choose X-Fit Box</Divider>
                                <Grid columns='equal'>
                                    <Grid container columns={3}>

                                        {this.props.contracts.projects.map((index) => {
                                            const project = index.args;
                                            return (

                                                <Grid.Column key={project.location}>
                                                    <GymBox
                                                        isSelected={project.location == this.state.selectedBox}
                                                        onBoxSelect={selectedBox => this.setState({ selectedBox })}
                                                        project={project} />
                                                </Grid.Column>

                                            );
                                        })}

                                    </Grid>
                                </Grid>
                                <Button loading={this.state.loading} disabled={this.state.selectedBox == '' || this.state.tokenName == '' ? true : false}
                                    onClick={this.onFormSubmit} primary size='huge'>Purchase Token</Button>
                            </Card.Description>
                        </Card.Content>
                    </Card>
                </AnimateHeight>
            </Element>
        );
    }
}

const GymBox = (props) => {
    return (
        <Segment compact className={props.isSelected ? 'colselectbox' : ''} onClick={() => props.onBoxSelect(props.project.location)}>
            <p>{'Box Name: ' + props.project.name}</p>
            <p>{'Box Location: ' + props.project.location}</p>
            <p>{'Cost to Build Box: $' + props.project.cost.c[0] + ',000'}</p>
        </Segment>
    );
};

function mapStateToProps(state) {
    return { contracts: state.contracts }
}
export default connect(mapStateToProps, { fetchTokenContract })(BuyToken);