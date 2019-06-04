import React, {Component} from 'react';
import {connect} from 'react-redux';
import mapReduxStateToProps from '../../modules/maxReduxStateToProps';
import ApprovedNames from '../ApprovedNames/ApprovedNames';

class ApprovedPage extends Component {
    componentDidMount() {
        this.getApproved();
    }
    
        getApproved() {
        this.props.dispatch({
            type: 'GET_APPROVED_LIST',
        });
    }

    render() {
        return(
            <div>THIS IS THE APPROVED PAGE INFO
                <ul>
                    {this.props.reduxState.approvedReducer.map((name, index) => {
                        return (
                            <ApprovedNames key={name.id} item={name} />
                        );
                    })}
                </ul>
            </div>
        )
    }
}

export default connect(mapReduxStateToProps)(ApprovedPage);