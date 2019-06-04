import React, {Component} from 'react';
import { connect } from 'react-redux';

class ApprovedPage extends Component {
  componentDidMount() {
    this.props.dispatch({type: 'GET_APPROVED_LIST'});
  }

  render() {
    return (
      <div>
        <p>This person is on my list <b>{this.props.approved.name}</b></p>
        <p>This is their number: <b>{this.props.approved.number}</b></p>
        <ul>
          {this.props.secrets.map(secret => (
            <li>
              Clearance: {secret.secrecy_level} | Content: {secret.content}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  secrets: state.secrets,
  user: state.user,
});

export default connect(mapStateToProps)(ApprovedPage);
