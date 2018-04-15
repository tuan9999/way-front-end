import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from '../components/avatar';
import { trackPageView } from '../util/google-analytics';
import TermsAndPolicy from '../components/terms-and-policy';
import InfoBox from '../components/infobox';
import { Grid, Row, Col } from 'react-bootstrap';
import ImageSelection from '../components/image-selection-modal';
import { showModal } from '../stores/profileImageStore';
import { loadUserData, updateUserData, editUserData, isOnboarded } from '../stores/userStore';
import './profile.less';
import { Web3Provider } from 'react-web3';
import Web3Component, { initContract, selectedAccount } from '../components/Web3Component'
import { isLoggedIn } from '../stores/accountStore';


class Profile extends React.Component {

  constructor(props) {
    super(props);
    if (!isLoggedIn()) {
      this.props.history.push('/register');
    }

    if (this.props.location) {
      const path = this.props.location.pathname;
      trackPageView(path);
    }

    const userId = sessionStorage.getItem('userId');
    const usernameFromPath = _.get(this.props.match, 'params.username');
    if (!usernameFromPath && (props.username || userId)) {
      this.props.history.push(`/profile/${props.username || userId}`);
    }

    this.props.loadUserData(usernameFromPath);


    this.onSave = this.onSave.bind(this);
    this.onChanged = this.onChanged.bind(this);
    this.onImageClick = this.onImageClick.bind(this);
    this.refreshProfile = this.refreshProfile.bind(this);
    this.onLogout = this.onLogout.bind(this);

    this.state = {
      name: this.props.name,
      email: this.props.email,
      username: this.props.username,
      interests: this.props.interests
    };
  }

  componentWillReceiveProps(props) {
    const usernameFromPath = _.get(this.props.match, 'params.username');
    if (props.username && props.username != usernameFromPath) {
      this.props.history.push(`/profile/${props.username}`);
    }
  }

  refreshProfile() {
    const userId = sessionStorage.getItem('userId');
    this.props.loadUserData(userId);
  }

  onChanged(e) {
    let obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  }

  onImageClick() {
    this.props.openModal();
  }


  onChangeImage(e) {
    console.log(e);
  }

  onLogout() {
    sessionStorage.clear();
    localStorage.clear();
    this.props.history.push(`/`);
    location.reload();
  }

  onSave(e) {
    // this for test Save button
    this.props.history.push(`/waitlist`);
    if (!this.props.isRegisteredUser) {
      this.props.history.push(`/waitlist`);
    }

    const userId = sessionStorage.getItem('userId');
    const data = {
      name: this.state.name,
      interests: this.state.interests
    };
    this.props.updateUserData(userId, data);
  }

  render() {
    const { username, name, interests, photo, waytcoins } = this.props;

    const photoUrl = photo || 'assets/avatar-placeholder.png';
    const imageSelectionModal = this.props.showModal ?
      <ImageSelection onUpload={this.refreshProfile} /> : null;

    const logoutButton = this.props.isRegisteredUser ? (
      <div className='profile-button profile-button-logout'>
        <RaisedButton
          onClick={this.onLogout}
          buttonStyle={{ border:' 1px solid darkred' }}
          backgroundColor='white'
          label='logout'
        />
      </div>
    ) : null;

    const balance = (
      <div>
        <NavLink to='/challenge'>
          <span className='profile-waytcoin-symbol'>
            <img src='/assets/waytcoin-symbol.png' />
          </span>
        </NavLink>
        {waytcoins}
      </div>
    );

    const backing = (
          <div>
              <span className='profile-waytcoin-symbol'>
                <img src='/assets/waytcoin-symbol.png' />
              </span>
            {waytcoins}
          </div>
        );


    return (


      <Grid className="profile">
        <Row>
          <Col sm={12}>
            <Avatar
              src={photoUrl}
              onClick={this.onImageClick}
              displayPlus={true}
            />
            {imageSelectionModal}
          </Col>
        </Row>
        <p> </p>
        <Row>
          <Col sm={12}>
            <h3><strong>{username}</strong></h3>

            <div className="profile-eth-adress">
              <h6> Your ETH-Adress: </h6>
              <Web3Provider>
                <Web3Component />
              </Web3Provider>
            </div>
            Your balance: {balance}
            <p></p>
            Your backing: {backing}
          </Col>
        </Row>
        <p></p>
        <Row>
          <Col sm={12}>
            <TextField
              name="name"
              defaultValue={name}
              hintText="Name"
              onChange={this.onChanged}
              fullWidth={true}
            />
            <TextField
              name="interests"
              defaultValue={interests}
              hintText="Interest"
              onChange={this.onChanged}
              fullWidth={true}
            />


          </Col>
        </Row>

          <div className='profile-button profile-button-save'>
            <RaisedButton
              onClick={this.onSave}
              backgroundColor='#00cf70'
              label={this.props.isRegisteredUser ? 'Save' : 'Register'}
            />
          </div>
        <p></p>
        <Row>
          <Col sm={12}>
            <div>
              {logoutButton}
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state.user.data);
  return {
    ...state.user.data,
    isRegisteredUser: !!state.user.data.username,
    showModal: state.profileImage.showModal
  };
};

const mapDispatchToProps = dispatch => ({
  loadUserData: (userId) => dispatch(loadUserData(userId)),
  updateUserData: (userId, data) => dispatch(updateUserData(userId, data)),
  openModal: () => dispatch(showModal(true))
});


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
