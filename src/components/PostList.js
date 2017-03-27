import React, { Component, PropTypes } from 'react'
import Search from './Search'

class PostList extends Component {
  static propTypes = {
    hasManageAccess: PropTypes.bool.isRequired,
    publishedPosts: PropTypes.array.isRequired,
    unpublishedPosts: PropTypes.array.isRequired,
    currentPage: PropTypes.object.isRequired,
    search: PropTypes.string.isRequired,
    onSearchChange: PropTypes.func.isRequired,
    onEditPost: PropTypes.func.isRequired,
    onGetPublishedPosts: PropTypes.func.isRequired,
    onGetUnpublishedPosts: PropTypes.func.isRequired,
    getPublishedPosts: PropTypes.func.isRequired,
    getUnpublishedPosts: PropTypes.func.isRequired
  }

  render() {
    const { hasManageAccess, publishedPosts, unpublishedPosts, currentPage,
            search, onSearchChange, onEditPost, onGetPublishedPosts, onGetUnpublishedPosts,
             getPublishedPosts, getUnpublishedPosts} = this.props

    const getViewCount = (post) => {
        window.FB.api('/'+post.id+'/insights?metric=post_impressions_unique&period=lifetime&access_token='+currentPage.access_token,
        (response) => {
              response.data.values ?
                window.alert('Number of views: ' + response.data.values[0].value) : window.alert('The number of post views is unavailable');
          }
        );
    };

    const publishedListItems = publishedPosts.map((post) => {
        const text = post.message ? post.message : null;
        if (text && text.includes(search)) {
            return <li key={post.id}>{text}
                <button onClick={() => getViewCount(post)}>Get Current Number of Views</button>
                <button onClick={() => onEditPost(post)}>Edit Post</button>
                </li>;
        } else {
            return null;
        }
      }
    );
    const publish = (post) => {
          window.FB.api('/'+post.id+'?is_published=true&access_token='+currentPage.access_token, "POST",
          (response) => {
                getPublishedPosts(currentPage);
                getUnpublishedPosts(currentPage);
              }
          );
      }
    const unpublishedListItems = unpublishedPosts.map((post) => {
        const text = post.message ? post.message : post.story;
        if (text && text.includes(search)) {
            return <li key={post.id}>{text}
                        <button onClick={() => publish(post)}>Publish</button>
                   </li>
        } else {
            return null;
        }
      }
    );


    return ( hasManageAccess && currentPage.name ?
    <div>
      <Search
        search={search}
        onChange={onSearchChange}
        />
      <h2> Unpublished Posts </h2>
      <ul>{unpublishedListItems}</ul>
      <h2> Published Posts </h2>
      <ul>{publishedListItems}</ul>
    </div> : null
    )
  }
}

export default PostList
