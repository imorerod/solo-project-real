import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import { connect } from 'react-redux';
import mapReduxStateToProps from '../../modules/maxReduxStateToProps';

class ChildList extends Component {
  componentDidMount() {
    this.props.dispatch({type: 'GET_CHILD_LIST'});
  }

    state = {
        newChild: {
            name: '',
            number: ''
        }
    }

    // handleNameChange = event => {
    //     console.log('event happended')
    //     this.setState({
    //         newPlant: {
    //             ...this.state.newPlant,
    //             name: event.target.value,
    //         }
    //     });
    // }

    // addNewPlant = event => {
    //     event.preventDefault();
    //     this.props.dispatch({ type: 'POST_PLANT', payload: this.state.newPlant })
    //     this.setState({
    //         newPlant: {
    //             id: this.state.newPlant.id + 1,
    //             name: '',
    //         }
    //     });
    // }

    render() {
        // const listArray = this.props.reduxState.childListReducer.map((item, index) => {
        //     return (
        //         <button key={index} data-id={item.id} onClick={this.onTagClick}>
        //             {item.name}
        //         </button>
        //     )
        // })



        return (
            <div>
                {/* <h3>Add New Child</h3>
                <form >
                    <input type='text' value={this.state.newChild.name} onChange={this.handlChange} />
                    <input type='text' value={this.state.newChild.number} onChange={this.handleChange} />
                    <input type='submit' value='Add New Child' />
                </form> */}
                List
            </div>
        );
    }
}


export default connect(mapReduxStateToProps)(ChildList);