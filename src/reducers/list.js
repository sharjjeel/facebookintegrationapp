export default (state = {search: "", listOfPages: [], currentPage: {}, published_posts : [], unpublished_posts: []}, action) => {
  switch (action.type) {
    case 'LOADING_POSTS':
      return {search: state.search, loading : true,
        published_posts : state.published_posts,
        unpublished_posts : state.unpublished_posts,
        listOfPages: state.listOfPages, currentPage: state.currentPage}
    case 'GOT_UNPUBLISHED_POSTS':
      return {search: state.search, loading : false,
        published_posts : state.published_posts,
        unpublished_posts : action.unpublished_posts,
        listOfPages: state.listOfPages, currentPage: state.currentPage}
    case 'GOT_PUBLISHED_POSTS':
      return {search: state.search, loading : false,
        published_posts : action.published_posts,
        unpublished_posts : state.unpublished_posts,
        listOfPages: state.listOfPages, currentPage: state.currentPage}
    case 'SEARCH_VALUE_CHANGE':
      return {search: action.search, loading : false,
        published_posts : state.published_posts,
        unpublished_posts : state.unpublished_posts,
        listOfPages: state.listOfPages, currentPage: state.currentPage}
    case 'SELECT_PAGE':
      return {search: state.search, loading : false,
        published_posts : state.published_posts,
        unpublished_posts : state.unpublished_posts,
        listOfPages: state.listOfPages, currentPage: action.currentPage}
    case 'GOT_PAGES':
      return {search: state.search, loading : false,
        published_posts : state.published_posts,
        unpublished_posts : state.unpublished_posts,
        listOfPages: action.listOfPages, currentPage: state.currentPage}
    default:
      return state
  }
}