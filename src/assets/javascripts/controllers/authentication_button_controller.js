import { Controller } from "stimulus"
import firebase from "../firebase"
import localForage from "localforage"
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
          currentUser = await ApplicationHelper.setCurrentUser(
            {name: result.user.displayName, email: result.user.email}
          )
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
    })()
  }
}
