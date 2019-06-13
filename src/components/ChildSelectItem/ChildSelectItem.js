import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapReduxStateToProps from '../../modules/maxReduxStateToProps';
import Button from '@material-ui/core/Button';

class ChildSelectItem extends Component {
    selectChild = (event) => {
        this.props.selectChild({
            nameValue: this.props.item.name,
            id: this.props.item.child_id,
            childIndex: this.props.childIndex,
        })
    }

    render() {
        const isDisabled = this.props.selectedChild === this.props.item.name;
        
        return (
            <Button 
                variant="contained"
                color="primary"
                disabled={isDisabled}
                onClick={this.selectChild}
            >
                {this.props.item.name}
            </Button>

        )
    }
}


export default connect(mapReduxStateToProps)(ChildSelectItem);