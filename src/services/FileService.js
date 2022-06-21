import http from "../http-common";
import axios from "axios";


class FileService {

    uploadFile(formData, submitId) {

        return http.post("/files/" + submitId, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        });
      }

      
      getFiles() {
        return http.get("/files");
      }


      getFilesBySubmitIds(submitIds) {
        return axios.post("http://localhost:8080/api/v1/files/ids", 
        submitIds);
      }

}

export default new FileService();