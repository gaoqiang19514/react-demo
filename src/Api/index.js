import axios from 'axios';

function getAreaData(query) {
  return axios.post('/system-service/api/area/listAreaInfoByPCode', query);
}

export default {
  getAreaData,
};
