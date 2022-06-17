import axios from 'axios';

const DISPLAYID_API_BASE_URL = 'http://localhost:8080/api/v1/displayId';

class DisplayIdService {

    getDisplayId() {
        return axios.get(DISPLAYID_API_BASE_URL);
    }

    addDisplayId(displayId) {
        return axios.post(DISPLAYID_API_BASE_URL, displayId)
    }
}

export default new DisplayIdService()