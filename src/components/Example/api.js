import axios from "axios";

export const getAreaCenterPoint = (deptCode) =>
  axios.post("/zfzh-service/webapi/resourceMap/areaChildrenByDeptCode", {
    coordinateType: "gcj02",
    deptCode,
  });

export default {
  getAreaCenterPoint,
};
