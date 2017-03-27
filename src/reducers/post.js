export default (state = {post : "", isScheduled : false, postDate: {}, isEditing: false, editPost: null}, action) => {
  switch (action.type) {
    case 'POST_CHANGE':
      return {post: action.post, isScheduled: state.isScheduled, postDate: state.postDate, isEditing: state.isEditing, editPost: state.editPost}
    case 'IS_SCHEDULED_CHANGE':
      return {post: state.post, isScheduled: !state.isScheduled, postDate: state.postDate, isEditing: state.isEditing, editPost: state.editPost}
    case 'SCHEDULED_DATE_CHANGE':
      return {post: state.post, isScheduled: state.isScheduled, postDate: action.postDate, isEditing: state.isEditing, editPost: state.editPost}
    case 'SAVE':
      return {post: "", isScheduled: state.isScheduled, postDate: state.postDate, isEditing: false, editPost: state.editPost}
    case 'SUBMIT':
      return {post: "", isScheduled: state.isScheduled, postDate: state.postDate, isEditing: false, editPost: state.editPost}
    case 'EDIT_POST':
      console.log(action.editPost);
      return {post: action.editPost.message, isScheduled: state.isScheduled, postDate: state.postDate, isEditing: true, editPost: action.editPost}
    case 'SCHEDULE':
      return state
    default:
      return state
  }
}