const approvedReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_APPROVED':
            return action.payload;
        default:
            return state;
    }
}

export default approvedReducer;