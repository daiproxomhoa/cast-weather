export const reducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case "ADD_USER_DATA":
      return addNewItem(state, payload.data);
    default:
      return state;
  }
};
function addNewItem(state, data) {
  return {
    ...state,
    userData: data,
  };
}
