import React from 'react';
import { NavLink } from 'react-router-dom';
import './footer.less';

export default class Footer extends React.Component {

  render() {
    const isInChat = this.props.location.pathname.includes('chat');
    if(isInChat) {
      return null;
    }

    return (
      <div className="footer">
        <div className='footer-content'>
          <span>
            Copyright © Way 2018&emsp;
          </span>
          <div>
            <span>
              <div>
                <NavLink to='/legalnotice'>Legal Notice</NavLink>&emsp;
              </div>
              <div>
                <NavLink to='/feedback'>Feedback</NavLink>
              </div>
            </span>
          </div>
        </div>
      </div>
    );
  }

}
