import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import { Card, Icon } from 'semantic-ui-react'

const AnyReactComponent = ({ text }) => {
    return (
        <h4 color='red'>
            <Icon name='ethereum' size='big' color='red' />
            {text}
        </h4>
    )
}

class SimpleMap extends Component {
    static defaultProps = {
        center: {
            lat: 40.7352516,
            lng: -73.9952961
        },
        zoom: 12
    };

    render() {
        return (
            <div style={{ padding: '1em 1em' }}>
                <Card className='colcard' fluid style={{ padding: '1em 1em', height: '65vh', width: '85vw', margin: "auto" }} centered>
                    <GoogleMapReact
                        defaultCenter={this.props.center}
                        defaultZoom={this.props.zoom}
                    >
                        {this.props.contracts.projects.map((index) => {
                            debugger;
                            const project = index.args;
                            return (
                                <AnyReactComponent
                                    lat={project.lat}
                                    lng={project.lng}
                                    text={project.name}
                                />
                            );
                        })}
                        {/* <Legend /> */}
                    </GoogleMapReact>
                </Card >
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { contracts: state.contracts }
}
export default connect(mapStateToProps)(SimpleMap);
