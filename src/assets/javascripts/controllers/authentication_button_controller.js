import { Controller } from "stimulus"
import firebase from "../firebase"
import localForage from "localforage"

const provider = new firebase.auth.GoogleAuthProvider()

export default class extends Controller {
  static targets = ["button", "text"]

  connect() {
    let currentUser

    (async () => {
      currentUser = await localForage.getItem('user')

      if (!currentUser) {
        await firebase.auth().getRedirectResult().then(function(result) {
          if (result.credential) {
            localForage.setItem('token', result.credential.accessToken)
          }
          if (result.user) {
            currentUser = {name: result.user.displayName, email: result.user.email}
            localForage.setItem('user', currentUser)
          }
        })
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
      await localForage.removeItem('user')
        
      this.setToSignIn()
    })()
  }
}
