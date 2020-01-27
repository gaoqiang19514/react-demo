function getUsers(interval) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(interval);
      if (interval === 2000) {
        reject({
          status: "error",
          data: interval
        });
      } else {
        resolve({
          status: "success",
          data: interval
        });
      }
    }, interval);
  }).catch(error => error);
}

export default { getUsers };
