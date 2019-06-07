const nonApprovedReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_NON_APPROVED':
            return action.payload;
        default:
            return state;
    }
}

export default nonApprovedReducer;