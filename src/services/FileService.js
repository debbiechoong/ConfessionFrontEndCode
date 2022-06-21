import axios from 'axios';

const POST_API_BASE_URL = 'http://localhost:8080/api/v1/files';

class FileService {

    uploadFile(file) {
        return axios.post(POST_API_BASE_URL, file)
    }

}

export default new FileService();