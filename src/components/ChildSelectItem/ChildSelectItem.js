import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapReduxStateToProps from '../../modules/maxReduxStateToProps';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import '../ChildList/ChildList.css';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#465E76',
      },
    },
  });

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
            <MuiThemeProvider theme={theme}>

            <Button 
                variant="contained"
                color="primary"
                disabled={isDisabled}
                onClick={this.selectChild}
            >
                {this.props.item.name}
            </Button>
            </MuiThemeProvider>

        )
    }
}


export default connect(mapReduxStateToProps)(ChildSelectItem);