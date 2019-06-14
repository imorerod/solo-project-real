import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapReduxStateToProps from '../../modules/maxReduxStateToProps';
import ApprovedItem from '../ApprovedItem/ApprovedItem';
import List from '@material-ui/core/List';

class ApprovedList extends Component {

    render (){
        const phoneNumbers = this.props.reduxState.phoneNumbersReducer.map((item, index) => {
            console.log(item);
            return (
                <ApprovedItem key={index} item={item} />
            )
        })
        return (
            <List component="div">
                {phoneNumbers}
            </List>
            );
    }
}

export default connect(mapReduxStateToProps)(ApprovedList);