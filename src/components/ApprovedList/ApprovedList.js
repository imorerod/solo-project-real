import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapReduxStateToProps from '../../modules/maxReduxStateToProps';
import ApprovedItem from '../ApprovedItem/ApprovedItem';

class ApprovedList extends Component {

    render (){
        const phoneNumbers = this.props.reduxState.phoneNumbersReducer.map((item, index) => {
            console.log(item);
            return (
                <ApprovedItem key={index} item={item} />
            )
        })
        return (
            <div>
                {phoneNumbers}
            </div>
            );
    }
}

export default connect(mapReduxStateToProps)(ApprovedList);