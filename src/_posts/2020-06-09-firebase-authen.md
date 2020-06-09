---
title: Firebase Authen ง่ายสุดในสามโลก
author: sittitep
categories:
- brief
- firebase
- authentication
- javascript
layout: post
image: assets/images/post/firebase-authen-thumbnail.jpg
date: '2020-06-09 14:54:13'
commentary:
  path: assets/sounds/commentary/firebase-authen-commentary.m4a
  type: audio/mp4
---

ใน brief นี้ผมจะพูดมาถึงสิ่งที่ผมชอบ หลังจากได้ทดลองใช้ Firebase Authentication กันครับ

 > tl;dr Most apps need to know the identity of a user. Knowing a user's identity allows an app to securely save user data in the cloud and provide the same personalized experience across all of the user's devices. [อ่านต่อ](https://firebase.google.com/docs/auth){:target="_blank"}
 > 

## สิ่งที่ผมชอบ
### ความไวของปีศาจ

จากการได้ทดลอง integrate เจ้า Firebase Authentication เข้ากับ DEVSART ผมใช้เวลาประมาณ 1 ชั่วโมงเท่านั้น ถือว่าเร็วมากสำหรับการลองใช้งานครั้งแรก 

### ตัวเลือกหลากหลาย

Firebase Authentication มาพร้อม Google Login, Facebook Login, Twitter Login และ เจ้าใหญ่ๆอีกหลายๆเจ้า เรียกได้ว่าทำครั้งเดียวใช้กันยาวๆ  ส่วนตัวผมเลือกใช้ Google เป็น Provider เท่านั้น

### ใช้โครตง่าย

สำหรับ DEVSART ผมเลือกใช้ redirect flow ซึ่งก็คือ การส่ง user ไปยังตัว provider เพื่อทำการ Authentication นั้นเอง

และ นี่คือ  code ที่ DEVSART ใช้

```
# init firebase
firebase.initializeApp(config);

# เลือก Provider
const provider = new firebase.auth.GoogleAuthProvider()

# เพื่อ redirect  user หลังจากกดปุ่ม sign in
firebase.auth().signInWithRedirect(provider);

# เพื่อดึงข้อมูลของ user หลังจากที่กลับมา
firebase.auth().getRedirectResult()
```

ดูเพิ่มได้  [ที่นี่](https://github.com/sittitep/devsart/blob/master/src/assets/javascripts/controllers/authentication_button_controller.js){:target="_blank"}

## สิ่งที่ผมไม่ชอบ
### ช้า

ความช้านี้เกิดในขั้นตอนนี้ เมื่อต้องการดึงข้อมูลของ user ที่ google พักไว้

```
firebase.auth().getRedirectResult()
```

ถ้าลองสังเกตุ หลังจาก login สำเร็จใน DEVSART จะมีช่วงเวลาประมาณ 2-3 วินาที กว่ารูป avatar จะแสดงผล

## สรุป
ข้อเสียประมาณนี้ผมรับได้นะ เพราะสิ่งที่เราต้องการในตอนนี้คือ ความไวในการพัฒนา หรือ บางทีผมอาจจะ config ค่าตรงไหนผิดจึงทำให้มันช้าขนาดนี้ก็เป็นได้
