import React from 'react';
import { auth } from './../firebase.js';

function Footer () {
  return (
    <React.Fragment>
      <div className="footer">
        <span className="footer-text"><h4>{auth.currentUser? `Signed in as ${auth.currentUser.email}` : "Signed Out"}&emsp;. . .&emsp;Call ahead at 1 (800) 555-9098&emsp;. . .&emsp;visit us at 316 N Sunset Blvd&emsp;. . .&emsp;{auth.currentUser? `Signed in as ${auth.currentUser.email}` : "Signed Out"}&emsp;. . .&emsp;Call ahead at 1 (800) 555-9098&emsp;. . .&emsp;visit us at 316 N Sunset Blvd&emsp;. . .&emsp;</h4></span>
      </div>  
    </React.Fragment>
  );
}

export default Footer;