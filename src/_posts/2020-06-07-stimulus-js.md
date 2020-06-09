---
title: Stimulus JS น้อยแต่มาก
author: sittitep
layout: post
date: '2020-06-07 21:37:14'
categories:
- javascript
image: assets/images/post/stimulus-js-thumbnail.jpg
commentary:
  path: assets/sounds/commentary/stimulus-js-commentary.m4a
  type: audio/mp4
---

พอเราพูดถึง javascript library หลายๆคนคงนึกถึง React, Vue หรือ Angular น้อยคงนักที่จะรู้จัก Stimulus JS

 Stimulus ถูกสร้างขึ้นมาด้วยแนวคิดที่อยากรักษาความเรียบง่ายของ HTML ไว้ ลดความซับซ้อนของ Javascript  หน้าบ้าน
 
  >tl;dr Stimulus is a JavaScript framework with modest ambitions. It doesn’t seek to take over your entire front-end—in fact, it’s not concerned with rendering HTML at all. Instead, it’s designed to augment your HTML with just enough behavior to make it shine. [อ่านต่อ](https://stimulusjs.org/){:target="_blank"}
 
วันนี้ผมจะมาแชร์การใช้งาน Stimulus ใน DEVSART ให้ดูกันครับ

## ตัวอย่างปุ่ม Sign in
```
# header.html

<header class="text-gray-700 body-font bg-white border-b sticky top-0">
    ...
    # ปุ่มนี้คือปุ่มที่เราจะเพิ่ม function ด้วย Stimulus กันครับ
    <button data-controller="authentication-button">
      <span data-target="authentication-button.text">...</span>
    </button>
    ...
</header>
```

```
# authentication_button_controller.js

import { Controller } from "stimulus"
import firebase from "../firebase"
import localForage from "localforage"

const provider = new firebase.auth.GoogleAuthProvider()

export default class extends Controller {
  static targets = ["button", "text"]
  
  # ตัวนี้จะคล้ายกับ componentDidMount ของ React ครับ
  connect() {
    let currentUser

    (async () => {
      currentUser = await localForage.getItem('user')
      #ก่อนอื่นเราก็ทำการตรวจสอบว่า เรามี currentUser หรือ ไม่
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
    #ตรงนี้เราทำการแก้ text ให้เป็น Sign in with Google และ อัพเดท event on click ให้เรียก signIn
    this.textTarget.textContent = "Sign in with Google"
    this.element.dataset["action"] = "click->authentication-button#signIn"
  }

  setToSignOut() {
    #คล้ายกับด้านบนแต่แก้เป็น signOut
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
```

ตัวอย่างด้านบนอาจจะไม่เป็นตัวอย่างที่ดีเท่าไหร่ แต่ผมอยากให้เห็นการใช้งานในสถานการณ์จริง

สามารถไปดูตัวอย่างเต็มๆที่ [https://github.com/sittitep/devsart](https://github.com/sittitep/devsart){:target="_blank"} ก็ได้นะครับ

ถ้าใครสนใจตัวอย่างเพิ่มเติม Stimulus เขียน [document](https://stimulusjs.org/handbook/hello-stimulus){:target="_blank"} ไว้ค่อนข้างดีเลยครับ

## สรุป
โดยส่วนตัวผมค่อนข้างชอบ Stimulus เป็นพิเศษ เพราะ แนวคิดที่ไม่พยามที่จะเข้าควบคุม หรือ กำหนดกฎเกณฑ์จนเกินไป

ยังไงถ้าคุณกำลังมองหา javascript library เล็กๆ ที่ไม่บังคับให้คุณเขียน HTML แปลกๆ ก็ลองพิจารณา Stimulus ดูนะครับ
