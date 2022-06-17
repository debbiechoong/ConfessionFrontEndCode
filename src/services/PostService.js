import axios from 'axios';

// where the posts live
const POST_API_BASE_URL = 'http://localhost:8080/api/v1/posts';

class PostService {

    getPosts() {
        return axios.get(POST_API_BASE_URL);
    }

    getPendingPosts() {
        return axios.get(POST_API_BASE_URL + '/pending');
    }

    getSubmitId() {
        return axios.get(POST_API_BASE_URL + '/submitId');
    }

    submitPost(newPost) {
        return axios.post(POST_API_BASE_URL, newPost);
    }

    publishPost(submitId) {
        return axios.post(POST_API_BASE_URL + '/' + submitId);
    }

    getPostById(postId) {
        return axios.get(POST_API_BASE_URL + '/' + postId);
    }

    deletePost(postId) {
        return axios.delete(POST_API_BASE_URL + '/' + postId);
    }

    removeBatch(id) {
        return axios.delete(POST_API_BASE_URL + '/' + id + '/_batch/');
    }

    searchPosts(keywords) {
        return axios.get(POST_API_BASE_URL + '/_search/' + keywords);
    }

}

export default new PostService()