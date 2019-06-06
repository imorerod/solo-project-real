import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapReduxStateToProps from '../../modules/maxReduxStateToProps';

class ChildList extends Component {
  componentDidMount() {
    this.props.dispatch({type: 'GET_CHILD_LIST'});
//    this.props.dispatch({type: 'GET_NON_APPROVED' });
  }

    state = {
        newChild: {
            name: '',
            number: ''
        },
        newApproved: {
            name: '',
            number: '',
            childId: null
        },
        selectedChild: null,
        phoneNumbers: '',
//        nonApprovedNumbers: '',
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
            this.props.dispatch({type: 'GET_NON_APPROVED', payload: { id: event.target.dataset.id }});
            this.setState({
                selectedChild: value,
                newApproved: {
                    ...this.state.newApproved,
                    childId: event.target.dataset.id
                }
            });
        } else {
            this.setState({
                selectedChild: null
            });
        }
    }

    onFormChange = (dataname) => event => {
        this.setState({
            newApproved: {
                ...this.state.newApproved,
                [dataname] : event.target.value
            }
        });
    }

    addNewApproved = event => {
        event.preventDefault();
        this.props.dispatch({ type: 'ADD_APPROVED', payload: this.state.newApproved })
        this.setState({
            newApproved: {
                name: '',
                number: '',
            }
        });
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
                <form onSubmit={this.addNewApproved}>
                    <p>Add New Approved:</p>
                    <input type="text" onChange={this.onFormChange('name')} placeholder="Name" />
                    <input type="text" onChange={this.onFormChange('number')} placeholder="Number" />
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

        // const nonApproved = this.props.reduxState.phoneNumbersReducer.map((item, index) => {
        //     console.log(item);
        //     return (
        //         <div key={index}>
        //             <p>{item.number}</p>
        //             <p>{item.time}</p>
        //             <p>{item.reviewed}</p>
        //         </div>
        //     )
        // })

        if(this.state.selectedChild) {
            childView = (
                <div>
                    <p>Approved numbers go here:</p>
                    {phoneNumbers}
                    <p>Non-Approved numbers go here:</p>
                                        {/* {nonApproved} */}
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