import React, { Component } from 'react'
import { connect } from 'react-redux';
import AnimateHeight from 'react-animate-height';
import { Card, Icon, Image, Button, Transition, Grid, Segment, Input, Divider, Container } from 'semantic-ui-react'
import { Element } from 'react-scroll';
import { fetchTokenContract } from '../actions';
import $ from "jquery";
const google = window.google;


class ProposeBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            height: 0,
            buttonVisible: true,
            projectName: '',
            projectCost: '',
            projectAddress: '',
            userLat: 0,
            userLng: 0,
            mapLat: 40.777686,
            mapLng: -73.954209,
            mapsAPIKey: "AIzaSyAtaon07Te51VsOLEY9CfvQGESfZ6DZ2Pw"
        };

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.getLatLng = this.getLatLng.bind(this);
        // this.mapSetup = this.mapSetup.bind(this);
    }

    onFormSubmit = async event => {
        event.preventDefault();
        this.setState({ loading: true });
        const outputt = await this.submitProposeBoxRequest();
        this.setState({ loading: false });
        this.props.fetchTokenContract();
    };

    submitProposeBoxRequest = () => {
        debugger;
        return this.props.contracts.xFitTokenCrowdsale.deployed()
            .then(instance => {
                console.log('userLat: ' + this.state.userLat);
                console.log('userlng: ' + this.state.userLng);
                return instance.createProject(
                    this.state.projectAddress,
                    this.state.projectCost,
                    this.props.contracts.accounts[0],
                    this.state.projectName,
                    this.state.userLat.toString(),
                    this.state.userLng.toString(),
                    { from: this.props.contracts.accounts[0], value: '5', gas: '1000000' }
                )
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

    // google maps api setup
    componentDidMount() {
        debugger;
        var projectAddress = document.getElementById("project-address");
        var options = {
            types: ["establishment"]
        };
        debugger;
        console.log(projectAddress);
        var autocomplete = new google.maps.places.Autocomplete(projectAddress);
        var place = autocomplete.getPlace();

        google.maps.event.addListener(autocomplete, 'place_changed', () => {
            console.log("Address input completed");
            var variable = "some variable";
            var strAddress = autocomplete.getPlace().formatted_address;
            this.setState({ projectAddress: strAddress })
            this.getLatLng(strAddress).then((latLng) => {
                this.setState({
                    userLat: latLng.results[0].geometry.location.lat,
                    userLng: latLng.results[0].geometry.location.lng
                })
            })
        });
    }

    getLatLng(address) {
        var AddressStringToLatLng =
            `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${this.state.mapsAPIKey}`;
        var latLng = {};
        console.log(AddressStringToLatLng)

        return $.ajax({
            type: "GET",
            url: AddressStringToLatLng,
            dataType: "JSON",
            success: function (data) {
                if (data.status == "ZERO_RESULTS") {
                    console.log(data.status);
                } else {
                    return
                }
            },
            error: function (data) {
                console.log(data);
            }
        });
    }

    render() {
        const { height } = this.state;

        return (
            <Element name="proposeBox" >
                <Grid fill centered columns={2}>
                    <Grid.Column className='center aligned' style={{ padding: '1em 0em 4em 0em' }}>
                        {this.state.buttonVisible &&
                            <Button onClick={this.toggle} primary size='huge'>
                                <Icon name='ethereum' />
                                Propose Project
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
                                <Input label='Project Name___'
                                    fluid
                                    placeholder='How would you like people to refer to you box?'
                                    style={{ padding: '.5em 0em' }} vertical
                                    value={this.state.projectName}
                                    onChange={event => this.setState({ projectName: event.target.value })}
                                />
                                <Input id="project-address" label='Project Address'
                                    fluid
                                    placeholder='What is the street address of your box?'
                                    style={{ padding: '.5em 0em' }} vertical
                                    value={this.state.projectAddress}
                                    onChange={event => this.setState({ projectAddress: event.target.value })}
                                />
                                <Input label='Project Cost____'
                                    fluid
                                    placeholder='How much will it cost you build your box?'
                                    style={{ padding: '.5em 0em' }} vertical
                                    value={this.state.projectCost}
                                    onChange={event => this.setState({ projectCost: event.target.value })}
                                />
                                <Button loading={this.state.loading} disabled={this.state.projectCost == '' || this.state.projectName == '' || this.state.projectAddress == '' ? true : false}
                                    onClick={this.onFormSubmit} primary style={{ padding: '.5em .8em' }} vertical size='huge'>
                                    <Icon name='ethereum' />
                                    Submit Box Proposal</Button>
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
