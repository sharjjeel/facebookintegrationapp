import React, { Component, PropTypes } from 'react'
import Datetime from 'react-datetime'

class Form extends Component {
  static propTypes = {
    hasManageAccess: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
    scheduled: PropTypes.bool.isRequired,
    postDate: PropTypes.object.isRequired,
    onPostChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onIsScheduledChange: PropTypes.func.isRequired,
    onScheduledDateChange: PropTypes.func.isRequired,
    onSchedule: PropTypes.func.isRequired,
    listOfPages: PropTypes.array.isRequired,
    onCurrentPageClick: PropTypes.func.isRequired,
    onGetPublishedPosts: PropTypes.func.isRequired,
    onGetUnpublishedPosts: PropTypes.func.isRequired,
    getPublishedPosts: PropTypes.func.isRequired,
    getUnpublishedPosts: PropTypes.func.isRequired,
    currentPage: PropTypes.object.isRequired,
    isEditing: PropTypes.bool.isRequired,
    editPost: PropTypes.object.isRequired
  }

  render() {
    const { value, onPostChange, onSubmit, scheduled, postDate,
            onSave, onIsScheduledChange, onScheduledDateChange, onSchedule,
            listOfPages, onCurrentPageClick, onGetPublishedPosts, onGetUnpublishedPosts,
            currentPage, hasManageAccess, isEditing, editPost, getUnpublishedPosts, getPublishedPosts } = this.props


    const edit = (post) => {
              window.FB.api('/'+post.id, "POST", { 'message' : value, "access_token" : currentPage.access_token},
              (response) => {
                      getPublishedPosts(currentPage);
                      getUnpublishedPosts(currentPage);
                  }
              );
          }

    const submit = () => {
          if (isEditing) {
                edit(editPost);
                onSubmit();
          } else {
              window.FB.api('/'+currentPage.id+'/feed?message='+value+"&access_token="+currentPage.access_token, 'post', (response) => {
                      onSubmit();
                      getPublishedPosts(currentPage);
                  }
              );
          }
      }

    const save = () => {
          window.FB.api('/'+currentPage.id+'/feed?published=false&message='+value+"&access_token="+currentPage.access_token, 'post', (response) => {
                  onSave();
                  getUnpublishedPosts(currentPage);
              }
          );
      }

    const pageChange = (page) => {
        onCurrentPageClick(page);
        getPublishedPosts(page);
        getUnpublishedPosts(page);
    }

    const pagesListItems = listOfPages.map((page) =>
      <li key={page.name}> <button onClick={() => pageChange(page)}> {page.name} </button> </li>
    );

    return ( hasManageAccess ?
    <div>
        <h2> Select a page </h2>
        <ol> {pagesListItems}</ol>
        <h3> {currentPage.name ? 'Currently managing ' + currentPage.name : null } </h3>
        <h5> {isEditing ? 'Currently editing post with ID: ' + editPost.id : null } </h5>
        {isEditing ? <button onClick={()=> onSave()}>Cancel</button> : null}
        {currentPage.name ?
        <div>
            <form>
                <br/>
                <label>
                  Message:
                  <input type="text" name="post" value={value} onChange={onPostChange}/>
                </label>
                <br/>
                <br/>

                {scheduled ?
                <div>
                <label>
                 Time:
                </label>
                <Datetime onChange={onScheduledDateChange}/>
                </div>
                 : null}
            </form>
            <button onClick={() => submit()}>
                Submit
            </button>
            <button onClick={() => save()} disabled={isEditing}>
                  Save
            </button>
        </div> : null }
    </div> : null
    )
  }
}

export default Form
