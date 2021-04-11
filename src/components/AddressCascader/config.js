import Api from './Api';

export const COMMUNITY_TYPE = 3;

export function converterPrimary(arr, leafType) {
  return arr.map((item) => ({
    label: item.areaName,
    value: item.id,
    type: item.areaType,
    isLeaf: item.areaType === leafType,
  }));
}

export function converterSecondary(arr) {
  return arr.map((item) => ({
    label: item.residentialName,
    value: Number(item.residentialId),
    type: 4,
    isLeaf: true,
  }));
}

export function getApi(type) {
  if (type === COMMUNITY_TYPE) {
    return Api.getResidentialById;
  }

  return Api.getAreaListById;
}

export function getConverter(type) {
  if (type === COMMUNITY_TYPE) {
    return converterSecondary;
  }

  return converterPrimary;
}

export function getItemById(id, tree, data) {
  function recursion(arr, _id) {
    return arr.map((item) => {
      if (item.children) {
        return {
          ...item,
          children: recursion(item.children, _id),
        };
      }

      if (item.value === _id) {
        return {
          ...item,
          children: data,
        };
      }

      return { ...item };
    });
  }

  return recursion(tree, id);
}
