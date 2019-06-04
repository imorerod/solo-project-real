import React, {Component} from 'react';
import {connect} from 'react-redux';
import mapReduxStateToProps from '../../modules/maxReduxStateToProps';

class ApprovedNames extends Component {
    render() {
        return(
            <p>{this.props.name}{this.props.number}</p>
        )
    }
}

export default connect(mapReduxStateToProps)(ApprovedNames);