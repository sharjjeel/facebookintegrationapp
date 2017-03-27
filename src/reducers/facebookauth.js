export default (state = {}, action) => {
  switch (action.type) {
    case 'PROFILE_LOG_IN_SUCCESS':
      return {logging_in : false, login_success: true, profileResponse : action.profileResponse, manageResponse : state.manageResponse}
    case 'PROFILE_LOG_IN_FAIL':
      return {logging_in: false, login_success : false, profileResponse : action.profileResponse, manageResponse : state.manageResponse}
    case 'MANAGE_LOG_IN_SUCCESS':
      return {logging_in : false, login_success: true, profileResponse : state.profileResponse, manageResponse : action.manageResponse}
    case 'MANAGE_LOG_IN_FAIL':
      return {logging_in: false, login_success : false, profileResponse : state.profileResponse, manageResponse : action.manageResponse}

    case 'LOGGING_IN':
      return {logging_in: true, login_success: state.login_success, profileResponse :state.response, manageResponse : state.manageResponse}
    default:
      return state
  }
}