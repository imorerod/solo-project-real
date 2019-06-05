import React, { Component } from 'react';
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
        },
        selectedChild: null,
        phoneNumbers: ''
    }

    handleChange = (dataname) => event => {
        this.setState({
            newChild: {
                ...this.state.newChild,
                [dataname] : event.target.value
            }
        });
    }

    addNewChild = event => {
        event.preventDefault();
        this.props.dispatch({ type: 'ADD_NEW_CHILD', payload: this.state.newChild })
        this.setState({
            newChild: {
                name: '',
                number: '',
            }
        });
    }

    selectChild = (value) => event => {
        if(!this.state.selectedChild){
            // HERE WE WOULD WANT TO GET THE CURRENT CHILD PHONE NUMBERS.
            // YOU WILL NEED TO DISPATCH HERE TO GET THE LIST OF NUMBERS (APPROVED OR NOT)
            console.log('Child database id: ' , event.target.dataset.id);
            this.props.dispatch({type: 'GET_APPROVED', payload: { id: event.target.dataset.id }});
            this.setState({
                selectedChild: value
            });
        } else {
            this.setState({
                selectedChild: null
            });
        }
    }

    onFormChange = (value) => event => {
        console.log('hi');
    }

    submitForm = event => {
        event.preventDefault();
        console.log('also hi');
    }

    render() {
        const listArray = this.props.reduxState.childListReducer.map((item, index) => {
            return (
                <button key={index} data-id={item.child_id} onClick={this.selectChild('name')}>
                    {item.name}
                </button>
            )
        })

        const addNumberField = (
            <div>
                <form onSubmit={this.submitForm}>
                    <input type="text" onChange={this.onFormChange("approved")} placeholder="Approved Number" />
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )

        let childView = <div></div>;

        const phoneNumbers = this.props.reduxState.phoneNumbersReducer.map((item, index) => {
            console.log(item);
            return (
                <div key={index}>
                <p >{item.name}</p>
                <p>{item.number}</p>
                </div>
            )

        })

        if(this.state.selectedChild) {
            childView = (
                <div>
                    <p>Numbers go here:</p>
                    {phoneNumbers}
                    {addNumberField}
                </div>
            )
        }


        return (
            <div>
                <h2>Children:</h2>
                {listArray}
                {childView}
                <h5>Add New Child</h5>
                <form onSubmit={this.addNewChild}>
                    <input type='text' value={this.state.newChild.name}
                                        onChange={this.handleChange('name')}
                                        placeholder="Name"/>
                    <input type='text' value={this.state.newChild.number}
                                        onChange={this.handleChange('number')}
                                        placeholder="Phone Number"/>
                    <input type='submit' value='Add New Child' />
                </form>
            </div>
        );
    }
}


export default connect(mapReduxStateToProps)(ChildList);