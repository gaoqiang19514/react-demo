import axios from "axios";

export default {
  getAreaData: (areaCode) =>
    axios.post("/zfzh-service/webapi/resourceMap/areaChildrenByDeptCode", {
      coordinateType: "gcj02",
      deptCode: areaCode,
    }),
};
