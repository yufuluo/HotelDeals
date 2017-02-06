import React from "react";
import logo from"../images/kuma_logo.jpg";
import kuma from"../images/kuma.jpg";
import face from"../images/girl-face.svg";
import linkedin from"../images/linkedin-logo.svg";
import { connect } from "react-redux";

class Header extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <div className="header">
          <img className="logo" src={logo}/>
          <img className="slogan" src={kuma}/>
          <a href="https://www.linkedin.com/in/qijun-kay-liu-9283ba34/"><img className="header_img_right" src={linkedin} alt="linkedin"/></a>
          <a href="https://www.linkedin.com/in/qijun-kay-liu-9283ba34/"><img className="header_img_right" src={face} alt="personal page"/></a>
          <h2 className="slogan">We Find the BEST Hotel Deals for You</h2>
        </div>
        <div className="content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Header);
