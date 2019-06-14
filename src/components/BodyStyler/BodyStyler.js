import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import './BodyStyler.css';
import { connect } from 'react-redux';
import mapReduxStateToProps from '../../modules/maxReduxStateToProps';

class BodyStyler extends Component {
    updateBgStyling = (location, action) => {
        const locHash = location.pathname;
  
        if (locHash && locHash.indexOf('home') !== -1) {
            document.body.classList.add('bgHome');
            document.body.classList.remove('bgList');
        } else if (locHash && locHash.indexOf('list') !== -1) {
            document.body.classList.add('bgList');
            document.body.classList.remove('bgHome');
        } else {
            document.body.classList.add('bgDefault');
            document.body.classList.remove('bgHome');
            document.body.classList.remove('bgList');
        }

        // if (!this.props.reduxState.user.id){
        //     this.props.history.push('/home');
        // }
    }

    componentWillMount() {
        console.log('componentWillMount');
        console.log('history: ', this.props.history);
        this.updateBgStyling(this.props.history.location);
        this.unlisten = this.props.history.listen(this.updateBgStyling);
    }
  
    componentWillUnmount() {
      this.unlisten();
    }

    render() {
        return (
            <>
            </>
        );
    }
}

export default connect(mapReduxStateToProps)(withRouter(BodyStyler)) ;