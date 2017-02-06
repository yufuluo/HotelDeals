import React, {PropTypes} from "react";
import { browserHistory } from "react-router";
import { connect } from "react-redux";
import Checkbox from 'rc-checkbox';
import reduce from "../reducers";
import validator from "../util/validation";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {},
      validationError: "",
      serverError: "",
      showDeals: false,
      room: "QUEEN",
      language: "en",
      currency: "USD $"
    };
    this.value = {
      chosen: []
    };
  }

  _isValidInput(data) {
    return data.firstName &&
      data.lastName &&
      data.email &&
      data.price &&
      Object.keys(validator.errors).length === 0;
  }

  handleChangeRoom(event) {
    this.setState({room: event.target.value});
  }

  handleChangeLang(event) {
    this.setState({language: event.target.value});
  }

  handleChangeCurr(event) {
    this.setState({currency: event.target.value});
  }

  handleChcek(event) {
    this.value.chosen.push(event.target.name);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      firstName: this.refs.firstName.value.trim(),
      lastName: this.refs.lastName.value.trim(),
      email: this.refs.email.value.trim(),
      price: this.refs.price.value.trim(),
      room: this.state.room,
      language: this.state.language,
      currency: this.state.currency
    };

    if (this._isValidInput(data)) {
      fetch(`/deal?fn=${data.firstName}&ln=${data.lastName}&email=${data.email}&price=${data.price}&room=${data.room}&lg=${data.language}&cr=${data.currency}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }).then((res) => {
        return res.json();
      }).then((info) => {
        this.setState({info: info, showDeals: true});
      }).catch((err) => {
        this.setState({serverError: err.message || "There's an error in our server, please try again later."});
      });
    }
  }

  handleConfirm(event) {
    event.preventDefault();
    const conf = this.state.info;
    conf.chosen = this.value.chosen;
    const dispatch = this.props.dispatch;

    fetch("/confirm", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(conf)
    }).then((res) => {
      return res.json();
    }).then((data) => {
      // console.log(data);
      dispatch({type: "UPDATE_DATA", data});
      browserHistory.push("/confirmation");
    })
    .catch((err) => {
      this.setState({serverError: err.message || "There's an error in our server, please try again later."});
    });
  }

  _renderInput() {
    return(
      <div>
          {this.state.serverError && <h3 className="center warning">{this.state.serverError}</h3>}
          <div className="choose">
            <select value={this.state.language} onChange={this.handleChangeLang.bind(this)}>
              <option value="en">English</option>
              <option value="zh">简体中文</option>
              <option value="fr">Français</option>
              <option value="es">Español</option>
              <option value="de">Deutsche</option>
            </select>
          </div>
           <div className="choose">
            <select value={this.state.currency} onChange={this.handleChangeCurr.bind(this)}>
              <option value="USD $">USD $</option>
              <option value="EUR €">EUR €</option>
              <option value="GBP £">GBP £</option>
              <option value="AUD $">AUD $</option>
            </select>
          </div>
          <h2>{content[this.state.language].moreInfo}</h2>
          <label>
            {content[this.state.language].firstName}
            <input
              type="text"
              placeholder="First Name"
              ref="firstName"
              name="firstName"
              onChange={validator.isName}
            />
          </label>
          <label>
            {content[this.state.language].lastName}
            <input
              type="text"
              placeholder="Last Name"
              ref="lastName"
              name="lastName"
              onChange={validator.isName}
            />
          </label>
          <label>
            {content[this.state.language].email}
            <input
              type="text"
              placeholder="email"
              ref="email"
              name="email"
              onChange={validator.isEmail}
            />
          </label>
          <label>
            {content[this.state.language].room}
            <select value={this.state.room} onChange={this.handleChangeRoom.bind(this)}>
              <option value="QUEEN">{content[this.state.language].queen}</option>
              <option value="KING">{content[this.state.language].king}</option>
              <option value="SUITE">{content[this.state.language].suite}</option>
            </select>
          </label>
          <label>
            {content[this.state.language].price}
            <input
              type="text"
              placeholder={this.state.currency}
              ref="price"
              name="price"
              onChange={validator.isPrice}
            />
          </label>
          <button type="button" onClick={this.handleSubmit.bind(this)}>{content[this.state.language].submit}!</button>
        </div>
    );
  }

  _renderCheckBox() {
    return this.state.info.offers.map((choice) => (
      <p className="checkBox">
        <label>
          <Checkbox name={choice.item_id}
            onChange={this.handleChcek.bind(this)}
          />
          <img className="deal_pic" src={choice.image_url}/>
          <p className="desc">{choice.long_desc} </p>
          <p className="desc"><span className="only">{content[this.state.language].only}</span> {choice.price}</p>
        </label>
      </p>
    ));
  }

  _renderOffers() {
    return(
      <div>
        <h2>{content[this.state.language].deals} {this.state.currency}{this.state.info.price} {this.state.info.short_desc} {content[this.state.language].room2}!</h2>
        {this._renderCheckBox()}
      </div>
    );
  }

  _renderNoOffer() {
    return (
      <div>
        <h2>{content[this.state.language].noOffer}</h2>
        <h2>{content[this.state.language].noOffer2}</h2>
      </div>
    );
  }

  _renderDeals() {
    return (
      <div>
        <h2>{content[this.state.language].dear} {this.state.info.firstName} {this.state.info.lastName},</h2>
        {(this.state.info.offers.length > 0) ? this._renderOffers() : this._renderNoOffer()}
        <div>
          <button type="button" onClick={this.handleConfirm.bind(this)}>{content[this.state.language].confirm}!</button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div>
          {this.state.showDeals ? this._renderDeals() : this._renderInput()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Home);
