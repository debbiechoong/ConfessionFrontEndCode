import axios from 'axios';

// where the posts live
const POST_API_BASE_URL = 'http://localhost:8080/api/v1/posts';

// Connect to spring boot APIs
class PostService {

    // Get all posts
    getPosts() {
        return axios.get(POST_API_BASE_URL);
    }

    // Get pending post
    getPendingPosts() {
        return axios.get(POST_API_BASE_URL + '/pending');
    }

    // Get latest submit id
    getSubmitId() {
        return axios.get(POST_API_BASE_URL + '/submitId');
    }

    // Posting new post created by user (to queue)
    submitPost(newPost) {
        return axios.post(POST_API_BASE_URL, newPost);
    }

    // Post new post (by admin to database)
    publishPost(submitId) {
        return axios.post(POST_API_BASE_URL + '/' + submitId);
    }

    // Get single post for viewing
    getPostById(postId) {
        return axios.get(POST_API_BASE_URL + '/' + postId);
    }

    // Delete post by admin
    deletePost(postId) {
        return axios.delete(POST_API_BASE_URL + '/' + postId);
    }

    // Batch removal by admin (passing in starting post)
    removeBatch(id) {
        return axios.delete(POST_API_BASE_URL + '/' + id + '/_batch/');
    }

    // Seach post by keywords or data or id
    searchPosts(keywords) {
        return axios.get(POST_API_BASE_URL + '/_search/' + keywords);
    }

}

export default new PostService()