import React, { Component } from 'react'

import Form from './Form'
import PostList from './PostList'

class PostLoginPage extends Component {

  render() {
    const {store} = this.props;
    const profileResponse = store.getState().facebookauth.profileResponse;
    const manageResponse = store.getState().facebookauth.manageResponse;

    const getPages = () => {
        window.FB.api('/me/accounts', (response) => store.dispatch({type: 'GOT_PAGES', listOfPages: response.data}));
    }
    const responseFacebook = (manageResponse) => {
        if (manageResponse.error) {
            store.dispatch({type: 'MANAGE_LOG_IN_FAIL', manageResponse});
        } else {
            store.dispatch({type: 'MANAGE_LOG_IN_SUCCESS', manageResponse});
            getPages();
        }
    }


    const hasManageAccess = manageResponse && manageResponse.status === "connected"
    console.log(store.getState())

    const onGetPublishedPosts=(response) => store.dispatch({type: 'GOT_PUBLISHED_POSTS', published_posts: response.data})
    const onGetUnpublishedPosts=(response) => store.dispatch({type: 'GOT_UNPUBLISHED_POSTS', unpublished_posts: response.data})
    const getPublishedPosts =
        (page) => window.FB.api('/'+page.id+'/posts?access_token='+page.access_token, (response) => {
                onGetPublishedPosts(response);
            }
        );

    const getUnpublishedPosts =
        (page) => window.FB.api('/'+page.id+'/promotable_posts?access_token='+page.access_token+'&is_published=false', (response) => {
                  console.log(response)
                  onGetUnpublishedPosts(response);
              }
        );
    return (
      <div>
          Welcome {profileResponse.name}
          <br/>
          {!hasManageAccess ?
                <button onClick={() =>
                    window.FB.login(responseFacebook,
                        {scope: 'manage_pages,publish_pages,publish_actions,pages_show_list'})}>
                    Click here to allow this app higher permissions and get your pages
                 </button> : null}

          <Form
            hasManageAccess={hasManageAccess}
            value={store.getState().post.post}
            scheduled={store.getState().post.isScheduled}
            listOfPages={store.getState().list.listOfPages}
            postDate={store.getState().post.postDate}
            onPostChange={(event) => store.dispatch({post: event.target.value, type: 'POST_CHANGE' })}
            onIsScheduledChange={(event) => store.dispatch({type: 'IS_SCHEDULED_CHANGE' })}
            onScheduledDateChange={(date) => store.dispatch({postDate: date._d, type: 'SCHEDULED_DATE_CHANGE' })}
            onSubmit={() => store.dispatch({ type: 'SUBMIT' })}
            onSave={() => store.dispatch({ type: 'SAVE' })}
            onSchedule={() => store.dispatch({ type: 'SCHEDULE' })}
            onCurrentPageClick={(page) => store.dispatch({currentPage: page, type: 'SELECT_PAGE' })}
            onGetPublishedPosts={onGetPublishedPosts}
            onGetUnpublishedPosts={onGetUnpublishedPosts}
            getPublishedPosts={getPublishedPosts}
            getUnpublishedPosts={getUnpublishedPosts}
            currentPage={store.getState().list.currentPage}
            isEditing={store.getState().post.isEditing}
            editPost={store.getState().post.editPost}
          />
          <PostList
            onGetPublishedPosts={onGetPublishedPosts}
            onGetUnpublishedPosts={onGetUnpublishedPosts}
            getPublishedPosts={getPublishedPosts}
            getUnpublishedPosts={getUnpublishedPosts}
            hasManageAccess={hasManageAccess}
            currentPage={store.getState().list.currentPage}
            listOfPages={store.getState().list.listOfPages}
            publishedPosts={store.getState().list.published_posts}
            unpublishedPosts={store.getState().list.unpublished_posts}
            search={store.getState().list.search}
            onEditPost={(post) => store.dispatch({ type: 'EDIT_POST', editPost: post })}
            onSearchChange={(event) => store.dispatch({search: event.target.value, type: 'SEARCH_VALUE_CHANGE' })}
            />
      </div>
    )
  }
}

export default PostLoginPage
