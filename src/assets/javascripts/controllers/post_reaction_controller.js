import { Controller } from "stimulus"
import firebase from "../firebase"
import ApplicationHelper from "../helpers/application_helper"

export default class extends Controller {
  static targets = ["heartButton", "heartCount"]

  connect() {
    (async() => {
      let currentUser = await ApplicationHelper.getCurrentUser()
      if (currentUser) {
        let ref = await firebase.database().ref(`users/${currentUser.uid}/${window.location.pathname}`)
        let snap = await ref.once('value')
        let value = Object.assign({}, snap.val())

        if (value["heart"]) {
          this._giveHeart()
        } else {
          this._takeHeart()
        }
      }

      let ref = await firebase.database().ref(window.location.pathname)
      let snap = await ref.once('value')
      let value = Object.assign({}, snap.val())

      this.heartCountTarget.textContent = value["heartCount"] || 0
    })()
  } 

  toggleHeart() {
    let count
    (async() => {
      let currentUser = await ApplicationHelper.getCurrentUser()
      if (currentUser) {
        let ref = await firebase.database().ref(`users/${currentUser.uid}/${window.location.pathname}`)
        let snap = await ref.once('value')
        let value = Object.assign({}, snap.val())

        if (this.heartButtonTarget.dataset["toggle"] == "false") {
          this._giveHeart()
          this.heartCountTarget.textContent = parseInt(this.heartCountTarget.textContent) + 1
          value["heart"] = true
          count = 1
        } else {
          this._takeHeart()
          this.heartCountTarget.textContent = parseInt(this.heartCountTarget.textContent) - 1 
          value["heart"] = false
          count = -1
        }
        
        ref.set(value);

        let postRef = await firebase.database().ref(`${window.location.pathname}`)
        snap = await postRef.once('value')
        value = Object.assign({}, snap.val())

        postRef.set({heartCount: (value["heartCount"] || 0) + count})
      } else {
        let event = new CustomEvent("unauthorized")
        window.dispatchEvent(event)
      }
    })()
  }

  _giveHeart() {
    this.heartButtonTarget.classList.remove("text-red-600", "bg-white")
    this.heartButtonTarget.classList.add("text-white", "bg-red-600")
    this.heartButtonTarget.dataset["toggle"] = "true"
  }

  _takeHeart() {
    this.heartButtonTarget.dataset["toggle"] = "false"
    this.heartButtonTarget.classList.remove("text-white", "bg-red-600")
    this.heartButtonTarget.classList.add("text-red-600", "bg-white")
  }
}
