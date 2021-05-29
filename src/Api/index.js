import axios from 'axios';

import points from './points.json';

function getAreaData(query) {
  return axios.post('/system-service/api/area/listAreaInfoByPCode', query);
}

function getCarData() {
  return new Promise((resolve) => {
    resolve(points);
  });
}

export default {
  getAreaData,
  getCarData,
};
