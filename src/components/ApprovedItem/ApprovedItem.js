import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapReduxStateToProps from '../../modules/maxReduxStateToProps';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import '../ChildList/ChildList.css';

class ApprovedItem extends Component {

    deleteApproved = event => {
        this.props.dispatch({
            type: 'DELETE_APPROVED',
            payload: {
                childId: this.props.item.child_id,
                approvedId: this.props.item.approved_id
            }
        });
    }
    
    render (){
        return (
            <ListItem component="div" className="listDiv" button >
            <ListItemText primary={this.props.item.name} secondary= {this.props.item.number} />
            <ListItemSecondaryAction>
                <IconButton onClick={this.deleteApproved} edge="end" aria-label="Delete">
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
         </ListItem>
        );
    }
}

export default connect(mapReduxStateToProps)(ApprovedItem);