import { Controller } from "stimulus"
import firebase from "../firebase"
import ApplicationHelper from "../helpers/application_helper"

export default class extends Controller {
  static targets = ["message"]

  // async send() {
  //   let currentUser = await ApplicationHelper.getCurrentUser()
  //   if (currentUser) {
  //     let ref = await firebase.database().ref(`${window.location.pathname}/messages`)
  //     let message = this.messageTarget.value

  //     ref.push({uid: currentUser.uid, message: message})
  //   } else {
  //     let event = new CustomEvent("unauthorized")
  //     window.dispatchEvent(event)
  //   }
  // }
  async connect() {
    let ref = await firebase.database().ref(`${window.location.pathname}/messages`)
    let snap = await ref.once("value")
    let messages = snap.val()

    Object.keys(messages).forEach(key => {
      (async () => {
        let message = messages[key]
        let dom = await this._buildMessage(message.uid, message.text)
        
        this.element.append(dom)
      })()
    })
  }

  async _buildMessage(uid, text){
    let ref = await firebase.database().ref(`users/${uid}`)
    let snap = await ref.once("value")
    let user = snap.val()

    let template = document.querySelector('#comment-message');

    let clone = template.content.cloneNode(true);

    let img = clone.querySelector("img");
    img.src = user.avatar

    let span = clone.querySelectorAll("span");
    span[0].textContent = user.name;
    span[1].textContent = text;

    return clone;
  }
}
