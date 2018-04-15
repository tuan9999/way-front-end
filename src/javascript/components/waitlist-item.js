import React from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import Avatar from 'material-ui/Avatar';
import './waitlist-item.less';
import {notifyNewMessage} from '../stores/chatStore.js';
import {TransformMessages} from '../stores/chatStore.js';
import {newConnection} from '../stores/webSocketstore.js';
import openSocket from 'socket.io-client';


export default class WaitListItem extends React.Component {
  render() {

    let {
      interests,
      name,
      photo,
      timeLeft,
      hasChat,
      nonDeliveredChatCount,
      lastContact,
      onClick,
      onEndorse,
      address
    } = this.props;

    const isActionVisible = this.props.isActionVisible === false ? false : true;

    if (interests.trim() === '') {
      interests = "Just waiting";
    }
    if (name.trim() === '') {
      name = 'No name specified';
    }
    if (!photo) {
      photo = 'assets/avatar-placeholder.png';
    }

    const onClickHelper = (event) => {
      event.name = name;
      event.photo = photo;
      this.props.onClick(event);
    }

    // "timeLeft === undefined" means: this is the profile card
    let timeLeftText = '';
    let arrowClass = 'waitlist-item-invisible';
    if (timeLeft !== undefined) {
      if (timeLeft > 0) {
        timeLeftText = `${timeLeft} min`;
      }
      arrowClass = '';
    }
    let alreadyContactedClass = '';
    let alreadyContactedClassTwo = '';
    let notificationDot = '';
    if (lastContact > 0) {
      alreadyContactedClass = 'waitlist-item-already-contacted';
      alreadyContactedClassTwo = 'Unread Message'
      notificationDot = <div className="waitlist-item-notification-dot"></div>;
    }


    const chatBubblePicture = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
    const hasUnreadMessagesClass = nonDeliveredChatCount > 0 ? '' : 'waitlist-item-invisible';
    let chatBubble = <img id="waitlist-item-chatBubbleLink" src='assets/chat_bubble_black_192x192.png' />

    return (
      <div>
        <div className={'waitlist-item-parent ' + alreadyContactedClass}>
          <div className={'waitlist-item '} >

            <div className='waitlist-item-avatar'>
              <Avatar
                size={50}
                src={photo}
              />
            </div>

            <div className='waitlist-item-data'>
              <p className='waitlist-item-data-name'>
                {name}
              </p>
              <p className="waitlist-item-data-address">{address}</p>
              <p className="waitlist-item-data-backing">
                Backing <strong>20 GEEK </strong>
              </p>
            </div>




            {isActionVisible && <ul className='waitlist-item-actions'>

              <li><button onClick={onClickHelper} className='waitlist-item-button blue'> Meet </button> </li>
              <li><button className='waitlist-item-button green' onClick={() => {
                try {
                  onEndorse("0xe1ea7d39425f99897da0d25224ea58bdfb87981b", {
                    from: window.web3.eth.accounts ? window.web3.eth.accounts[0] : null,
                    gas: 0,
                    value: web3.toWei(0, 'ether')
                  }, (error, result) => {
                    console.log(result)
                    console.log(error)
                  });
                } catch (error) {
                  console.error(error);
                }
              }}> Endorse </button></li>
            </ul>}
          </div>
            <div className="waitlist-item-notification">
              <div>
                <p>

                  <TransformMessages />
                </p>
              </div>
            </div>

          <p className='waitlist-item-data-interests'>
            {interests}
          </p>

        </div>




     </div>
    );
  }
}
