import React, {Component} from 'react';
import { connect } from 'react-redux';

class ApprovedPage extends Component {
  componentDidMount() {
    this.props.dispatch({type: 'GET_APPROVED_LIST'});
  }

  render() {
    return (
      <div>
        Hi
      </div>
    );
  }
}

const mapStateToProps = state => ({
  secrets: state.secrets,
  user: state.user,
});

export default connect(mapStateToProps)(ApprovedPage);
