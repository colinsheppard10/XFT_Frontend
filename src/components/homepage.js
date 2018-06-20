import React, { Component } from 'react';
import { connect } from 'react-redux';
import './homepage.css';
import About from './about';
import HowItWorks from './how_it_works';
import ProposeBox from './propose_box';
import BuyToken from './token_buy';
import PinLogin from './pin_login';
import { Link, Element } from 'react-scroll';
import { fetchTokenContract } from '../actions';
import AnimateHeight from 'react-animate-height';
import GoogleMap from './google_map';
import NotConnected from './not_connected';
import {
  Container,
  Header,
  Menu,
  Segment,
  Visibility,
} from 'semantic-ui-react';

const HomepageHeading = ({ mobile, connectedToBlockChain }) => (
  <Container text>
    <Header
      as='h1'
      content='X-FIT COIN'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'heavy',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
    <Header
      as='h2'
      content='Your token to a lifetime of fitness.'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
    {connectedToBlockChain == 'Connected' && <BuyToken />}
    {connectedToBlockChain == 'NotConnected' && <NotConnected />}
  </Container>
)

class Homepage extends Component {
  componentDidMount() {
    this.props.fetchTokenContract();
  }

  state = {
    activeItem: 'buyToken'
  }

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { children } = this.props
    const { connectedToBlockChain } = this.props.contracts
    const { fixed, activeItem } = this.state

    if (!connectedToBlockChain) {
      return <div></div>
    }

    return (
      <div>
        <Visibility once={false} onBottomPassed={this.showFixedMenu} onBottomPassedReverse={this.hideFixedMenu}>
          <Segment className="colheading" inverted textAlign='center' style={{ minHeight: 700, padding: '1em 0em' }} vertical>
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
              className="colborder"
            >
              <Container>
                <Link to="buyToken" spy={true} smooth={true} duration={500}>
                  <Menu.Item className="coltext" name='buyToken' as='a' active={activeItem === 'buyToken'} onClick={this.handleItemClick} >Buy Token</Menu.Item>
                </Link>

                <Link to="proposeBox" spy={true} smooth={true} duration={500}>
                  <Menu.Item className="coltext" name='proposeBox' as='a' active={activeItem === 'proposeBox'} onClick={this.handleItemClick}>Propose Box</Menu.Item>
                </Link>

                <Link to="about" spy={true} smooth={true} duration={500}>
                  <Menu.Item className="coltext" name='about' as='a' active={activeItem === 'about'} onClick={this.handleItemClick}>About</Menu.Item>
                </Link>

                <Link to="howItWorks" spy={true} smooth={true} duration={500}>
                  <Menu.Item className="coltext" name='howItWorks' as='a' active={activeItem === 'howItWorks'} onClick={this.handleItemClick}>How It Works</Menu.Item>
                </Link>
                <Menu.Item position='right'>
                  <PinLogin fixed={fixed} />
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading connectedToBlockChain={connectedToBlockChain} />
          </Segment>
        </Visibility>
        {connectedToBlockChain == 'Connected' && <GoogleMap />}
        {connectedToBlockChain == 'Connected' && <ProposeBox />}
        <About />
        <HowItWorks />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { contracts: state.contracts }
}
export default connect(mapStateToProps, { fetchTokenContract })(Homepage);
