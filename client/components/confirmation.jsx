import React from "react";
import { connect } from "react-redux";

class Confirmation extends React.Component {

  _renderChosen(){
    return(
      <div>
        {this.props.chosen.map((c) => (
            <p className="desc">
              {c.short_desc}
            </p>))}
      </div>
    );
  }

  _renderNoChosen(){
    return(
      <div>
        <p className="desc">{content[this.props.language].noSelected}</p>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h2>{content[this.props.language].hello}, {this.props.firstName} {this.props.lastName}! {content[this.props.language].confirmation}</h2>
        <p className="desc"><span className="bold">{content[this.props.language].email}:</span> {this.props.email}</p>
        <p className="desc"><span className="bold">{content[this.props.language].price}:</span> {this.props.currency}{this.props.price}</p>
        <p className="desc"><span className="bold">{content[this.props.language].room}:</span> {this.props.room}</p>
        <p className="desc"><span className="bold">{content[this.props.language].selected}:</span></p>
        {(this.props.chosen.length > 0) ? this._renderChosen() : this._renderNoChosen()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Confirmation);
