// Converts an array of objects into an object
// with keys of their passed keyField (ex: id)
export const arrayToObject = (array, keyField) =>
  array.reduce((obj, item) => {
    obj[item[keyField]] = item;
    return obj;
  }, {});
