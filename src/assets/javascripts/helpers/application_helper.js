import localForage from "localforage"

const getCurrentUser = async() => {
  return await localForage.getItem('currentUser')
}

const setCurrentUser = async(user) => {
  return await localForage.setItem('currentUser', user)
}

const removeCurrentUser = async() => {
  return await localForage.removeItem('currentUser')
}

const ApplicationHelper = {
  getCurrentUser,
  setCurrentUser,
  removeCurrentUser
}

export default ApplicationHelper;
