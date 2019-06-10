import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapReduxStateToProps from '../../modules/maxReduxStateToProps';
import './ChildList.css';
import ReactDropdown from 'react-dropdown';
import './Dropdown.css';
import Button from '@material-ui/core/Button';
import AddChildForm from '../AddChildForm/AddChildForm';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';



const options = [
    'Yes',
    'No',
];


class ChildList extends Component {
  componentDidMount() {
    this.props.dispatch({type: 'GET_CHILD_LIST'});
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
        selectedApproved: null,
        phoneNumbers: '',
        nonApprovedNumbers: '',
        reviewed: false,
        show: false
    }

    showModal = () => {
        this.setState({ show: true });
        console.log('showModal firing!');
    };
    
    hideModal = () => {
        this.setState({ show: false });
    };


    changeReviewed = config => dropdownObj => {
        console.log('reviewed changed- dropdownObj:', dropdownObj);
        this.props.dispatch({type: 'UPDATE_REVIEWED', payload: {
                id: config.nonId,
                childId: config.childId,
                reviewed: dropdownObj === 'Yes' ? true : false,
            }
        });
        this.setState({
            reviewed: ''
        });    
    } 
    


    selectChild = (value) => event => {
        if(!this.state.selectedChild){
            // HERE WE WOULD WANT TO GET THE CURRENT CHILD PHONE NUMBERS.
            // YOU WILL NEED TO DISPATCH HERE TO GET THE LIST OF NUMBERS (APPROVED OR NOT)
            console.log('Child database id: ' , value.id);
            this.props.dispatch({type: 'GET_APPROVED', payload: { id: value.id }});
            this.props.dispatch({type: 'GET_NON_APPROVED', payload: { id: value.id }});
            this.setState({
                selectedChild: value.nameValue,
                newApproved: {
                    ...this.state.newApproved,
                    childId: value.id
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
                <Button key={index}
                        variant="contained"
                        onClick={this.selectChild({nameValue: 'name', id: item.child_id})}>
                    {item.name}
                </Button>
            )
        })

        const addNumberField = (
            <div>
                <form className="addField" onSubmit={this.addNewApproved}>
                    <p className="formHeader">Add New Approved</p>
                    <br /><input type="text" onChange={this.onFormChange('name')} placeholder="Name" />
                    <input type="text" onChange={this.onFormChange('number')} placeholder="Number" />
                    <input type="submit" value="Add"/>
                </form>
            </div>
        )

        let childView = <div></div>;

        const phoneNumbers = this.props.reduxState.phoneNumbersReducer.map((item, index) => {
            console.log(item);
            return (
                <div className="table-scroll">
                <table className="tableStyle">
                    <thead>
                        <tr>
                            <th>Approved Numbers</th>
                        </tr>
                        <tr>
                            <th>Name</th>
                            <th>Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{item.name}</td>
                            <td>{item.number}</td>
                        </tr>
                    </tbody>
                </table>
                </div>
            )
        })

        const nonApprovedNumbers = this.props.reduxState.nonApprovedReducer.map((non, index) => {
            console.log(non);
            return (
                <table className="tableStyle">
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Time</th>
                            <th>Reviewed?</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{non.number}</td>
                            <td>{non.time}</td>
                            <td>
                                <ReactDropdown
                                    options={options}
                                    onChange={this.changeReviewed({ nonId: non.non_approved_id, childId: non.child_id })}
                                    value={non.reviewed ? 'Yes' : 'No'}
                                    placeholder="No"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            )
        })
        let addChildForm = null;

        if(this.state.selectedChild) {
            childView = (
                <div className="childView">
                    {phoneNumbers}
                    {nonApprovedNumbers}
                    {addNumberField}
                </div>
            )
        }

        return (
            <div className="page">
                <h2>Children:</h2>
                <div>
                    {listArray} <Button variant="contained" onClick={this.showModal}>+ Child</Button>
                </div>
                <Dialog open={this.state.show} onClose={this.hideModal} >
                    <DialogContent>
                        <AddChildForm closeModal={this.hideModal} />
                    </DialogContent>
                </Dialog>

                {childView}
                {addChildForm}
            </div>
        );
    }
}


export default connect(mapReduxStateToProps)(ChildList);