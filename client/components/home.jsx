import React, {PropTypes} from "react";
// import {connect} from "react-redux";

export default class Home extends React.Component {
  render() {
    const props = this.props;
    const {checked, value} = props;
    return (
      <div>
        <h1>Hello</h1>
        <div>
          <h2>Could you tell us more about your room?</h2>
          <label>
            First Name
            <input
              type="text"
              placeholder="First Name"
              ref="firstName"
              name="firstName"
              invalidClassName="ui-error"
            />
          </label>
          <label>
            Last Name
            <input
              type="text"
              placeholder="Last Name"
              ref="lastName"
              name="lastName"
              invalidClassName="ui-error"
            />
          </label>
          <label>
            Email
            <input
              type="text"
              placeholder="email"
              ref="email"
              name="email"
              invalidClassName="ui-error"
            />
          </label>
          <label>
            Booked Room Code
            <select>
              <option value="QUEEN">QUEEN</option>
              <option value="KING">KING</option>
              <option value="SUITE">SUITE</option>
            </select>
          </label>
        </div>
      </div>
    );
  }
}
