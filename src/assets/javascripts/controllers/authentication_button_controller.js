import { Controller } from "stimulus"
import firebase from "../firebase"
import ApplicationHelper from "../helpers/application_helper"

const provider = new firebase.auth.GoogleAuthProvider()

export default class extends Controller {
  static targets = ["text"]

  connect() {
    (async () => {
      let currentUser = await ApplicationHelper.getCurrentUser()

      if (!currentUser) {
        let result = await firebase.auth().getRedirectResult()

        if (result.user) {
          let user = result.user
          currentUser = await ApplicationHelper.setCurrentUser(
            {uid: user.uid, name: user.displayName, email: user.email, avatar: user.photoURL}
          )

          let event = new CustomEvent("userSignedIn", {detail: currentUser})
          window.dispatchEvent(event)
        }
      }

      if (currentUser) {
        this.setToSignOut()
      } else {
        this.setToSignIn()
      }
    })()
    
  }

  setToSignIn() {
    this.textTarget.textContent = "Sign in with Google"
    this.element.dataset["action"] = "click->authentication-button#signIn"
  }

  setToSignOut() {
    this.textTarget.textContent = "Sign out"
    this.element.dataset["action"] = "click->authentication-button#signOut"
  }

  signIn() {
    (async () => {
      await firebase.auth().signInWithRedirect(provider);

      this.setToSignOut()
    })()
  }

  signOut() {
    (async () => {
      await firebase.auth().signOut()
      await ApplicationHelper.removeCurrentUser()
        
      this.setToSignIn()

      let event = new CustomEvent("userSignedOut")
      window.dispatchEvent(event)
    })()
  }
}
