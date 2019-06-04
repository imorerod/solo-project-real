import React, {Component} from 'react';
import {connect} from 'react-redux';
import mapReduxStateToProps from '../../modules/maxReduxStateToProps';

class ApprovedPage extends Component {
    render() {
        return(
            <div>¡¡ApprovedPage HERE!!</div>
        )
    }
}

export default connect(mapReduxStateToProps)(ApprovedPage);