export const actionCreator = (name, containerName) => ({
  [name]: {
    CALL: `app/${containerName}/${name}`,
    SUCCESS: `app/${containerName}/${name}_SUCCESS`,
    FAIL: `app/${containerName}/${name}_FAIL`,
  },
});
