import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapReduxStateToProps from '../../modules/maxReduxStateToProps';

class AddChildForm extends Component {
    state = {
        newChild: {
            name: '',
            number: ''
        },
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
            this.props.closeModal();
        }
    
        handleChange = (dataname) => event => {
            this.setState({
                newChild: {
                    ...this.state.newChild,
                    [dataname] : event.target.value
                }
            });
        }
    

    render (){
        return (
            <form className="addField" onSubmit={this.addNewChild}>
                <p className="formHeader">Add New Child</p>
                    <br /><input type='text' value={this.state.newChild.name}
                                        onChange={this.handleChange('name')}
                                        placeholder="Name"/>
                    <input type='text' value={this.state.newChild.number}
                                        onChange={this.handleChange('number')}
                                        placeholder="Phone Number"/>
                    <input type='submit' value='Add' />
                </form>
            );
    }
}

export default connect(mapReduxStateToProps)(AddChildForm);