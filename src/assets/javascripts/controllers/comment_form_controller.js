import { Controller } from "stimulus"
import firebase from "../firebase"
import ApplicationHelper from "../helpers/application_helper"

export default class extends Controller {
  static targets = ["message"]

  async send() {
    let currentUser = await ApplicationHelper.getCurrentUser()
    if (currentUser) {
      let ref = await firebase.database().ref(`${window.location.pathname}/messages`)
      let text = this.messageTarget.value

      ref.push({uid: currentUser.uid, text: text})

      this.messageTarget.value = ""
    } else {
      let event = new CustomEvent("unauthorized")
      window.dispatchEvent(event)
    }
  }
}
