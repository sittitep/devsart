import { Controller } from "stimulus"
import ApplicationHelper from "../helpers/application_helper"

export default class extends Controller {
  static targets = ["wrapper", "avatar"]

  connect() {
    (async() => {
      let currentUser = await ApplicationHelper.getCurrentUser()
      if (currentUser) {
        this.setUserProfile(currentUser)
      }
    })()
  }

  setUserProfile(user) {
    if (event.constructor.name == "CustomEvent") {
      user = user.detail
    }
    this.wrapperTarget.classList.remove("hidden")
    this.avatarTarget.src = user.avatar
  }

  unsetUserProfile() {
    this.wrapperTarget.classList.add("hidden")
    this.avatarTarget.removeAttribute("src")
  }
}
