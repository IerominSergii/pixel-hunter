export default (state, userName) => {
  if (typeof userName !== `string`) {
    throw new Error(`userName should be string type`);
  }

  return Object.freeze(Object.assign({}, state, {name: userName}));
};
