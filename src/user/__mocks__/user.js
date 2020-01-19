import request from "./request";

export function getUserName(userID) {
  return request("/users/" + userID).then(user => user.name);
}

export default {
  getAuthenticated: () => ({
    age: 622,
    name: "Mock name"
  })
};
