import axios from 'axios';

export default {
  getAreaListById(params) {
    return axios.post('/smart-webapi/webapi/area/queryAreaInfoByPid', params);
  },

  getResidentialById(params) {
    return axios.post(
      '/smart-webapi/webapi/area/queryResidentialByAreaId',
      params,
    );
  },
};
