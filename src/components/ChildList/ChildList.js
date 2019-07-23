import React, { Component } from 'react';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import mapReduxStateToProps from '../../modules/maxReduxStateToProps';
import ReactDropdown from 'react-dropdown';
import ChildSelectItem from '../ChildSelectItem/ChildSelectItem';
import ApprovedList from '../ApprovedList/ApprovedList';
import './ChildList.css';
import './Dropdown.css';
// Material UI
import Button from '@material-ui/core/Button';
import AddChildForm from '../AddChildForm/AddChildForm';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

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

    selectChild = (value) => {
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
        console.log('selectChild - value.nameValue: ', value.nameValue);
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
        this.props.dispatch({
            type: 'ADD_APPROVED',
            payload: this.state.newApproved
        })
        this.setState({
            newApproved: {
                ...this.state.newApproved,
                name: '',
                number: '',
            }
        });
    }

    render() {
        const listArray = this.props.reduxState.childListReducer.map((item, index) => {
            return (
                <ChildSelectItem
                    item={item}
                    key={index}
                    selectChild={this.selectChild}
                    selectedChild={this.state.selectedChild}
                    childIndex={index}
                />
            )
        })

        const addNumberField = (
                <form className="addField" onSubmit={this.addNewApproved}>
                    <span className="formHeader">Add New Approved:</span>
                    <input type="text"
                        value={this.state.newApproved.name}
                        onChange={this.onFormChange('name')}
                        placeholder="Name"
                    />
                    <NumberFormat
                        format="(###) ###-####"
                        value={this.state.newApproved.number}
                        onChange={this.onFormChange('number')}
                        mask="_"
                        placeholder="Number"
                    />
                    <input type="submit" value="Add"/>
                </form>
        )

        let childView = <div></div>;


        const nonApprovedNumbers = this.props.reduxState.nonApprovedReducer.map((non, index) => {
            console.log(non);
            return (
                <div key={index}>
                    <table className="tableStyle">
                        <thead>
                            <tr>
                                <th>Number</th>
                                <th>Time</th>
                                <th>Reviewed?</th>
                                {/* // saved for later => click button to add from non to approved
                                <th>Approve?</th> */}
                            </tr>
                        </thead>
                            <tbody>
                                <tr>
                                    {/* NEED TO FIGURE OUT HOW TO MAKE IT INSTANTLY GOOGLE THE NUMBER ON A CLICK
                                    <td>
                                        <a 
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href="http://www.google.com/search?q={non.number}">
                                            {non.number}
                                        </a>
                                    </td> */}
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
                                    {/* <td><button>Approve</button></td> */}
                                </tr>
                            </tbody>
                    </table>
                </div>
            )
        })

        if(this.state.selectedChild) {
            childView = (
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Typography
                                color="secondary"
                                variant="h5"
                                component="h3">
                                Approved Numbers:
                        </Typography>
                            {addNumberField}
                            <div className="apprListContainer">
                                <ApprovedList />
                            </div>
                    </Grid>
                    <Grid item xs={12}>
                    <div className="vr vr_x2">
                        <Typography
                                color="secondary"
                                variant="h5"
                                component="h3">
                                Incoming Non-Approved Numbers:
                        </Typography>
                    </div>
                                {nonApprovedNumbers}
                    </Grid>
                </Grid>
            )
        }

        return (
            <Container maxWidth={'md'}>
                <div className="vr vr_x3">
                    <h1 className="bodyFont">Kids:</h1>
                        {listArray} <Button variant="contained" onClick={this.showModal}>+ Kid </Button>
                    </div>
                <div>
                    <Dialog open={this.state.show} onClose={this.hideModal} >
                        <DialogContent>
                            <AddChildForm closeModal={this.hideModal} />
                        </DialogContent>
                    </Dialog>
                </div>
                    {childView}
            </Container>
        );
    }
}

export default connect(mapReduxStateToProps)(ChildList);