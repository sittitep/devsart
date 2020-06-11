import { Controller } from "stimulus"
import firebase from "../firebase"
import ApplicationHelper from "../helpers/application_helper"

export default class extends Controller {
  static targets = ["message"]

  async connect() {
    let ref = await firebase.database().ref(`${window.location.pathname}/messages`)
    
    ref.orderByChild("timestamp").on('child_added', async snap => {
      let message = await snap.val()
      let dom = await this._buildMessage(snap.key, message.uid, message.text)

      this.element.append(dom)
    })
  }

  async _buildMessage(key, uid, text){
    let ref = await firebase.database().ref(`users/${uid}`)
    let snap = await ref.once("value")
    let user = snap.val()

    let template = document.querySelector('#comment-message')

    let clone = template.content.cloneNode(true)
    let div = clone.querySelector("div")

    div.id = key

    let img = clone.querySelector("img")
    img.src = user.avatar

    let span = clone.querySelectorAll("span")
    span[0].textContent = user.name
    span[1].textContent = text

    return clone
  }
}
