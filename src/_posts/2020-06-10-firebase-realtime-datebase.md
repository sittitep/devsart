---
title: ลองเล่น Firebase Realtime Datebase
layout: post
author: sittitep
date: '2020-06-10 15:35:06'
categories:
- firebase
- realtime-database
- brief
image: assets/images/post/firebase-realtime-datebase-thumbnail.jpg
commentary:
  path: assets/sounds/commentary/firebase-realtime-database-commentary.m4a
  type: audio/mp4
---

หลังจากที่ได้ลองเล่น [Firebase Authentication](https://devsart.net/blog/firebase-authen){:target="_blank_"} กันไปแล้ว วันนี้ผมจะมาลองเล่น  Firebase Realtime Database กันครับ

>tl;dr  Store and sync data with our NoSQL cloud database. Data is synced across all clients in realtime, and remains available when your app goes offline. [อ่านต่อ](https://firebase.google.com/docs/database){:target="_blank_"}

โดยโพสนี้ผมจะพูดถึงการใช้งาน Realtime Database บน DEVSART และ สิ่งที่ชอบไม่ชอบหลังจากที่ผมได้ทดลองใช้งานครับ

## การใช้งาน
![feature-heart-demo]({{ 'assets/images/post/feature-heart-demo.gif' | relative_url }})

เราใช้งาน Realtime Database ใน feature heart ที่พึ่งเพิ่มเข้าครับ

อันดับแรกเราต้องไปเพิ่ม module database ก่อน

```
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database"; # เพิ่มตัวนี้เข้าไป
```

ในส่วนต่อไปก็ เรียกใช้งานเมื่อ user กด heart

```
# ตรงนี้คือการดึง record ที่เราต้องการ 
let ref = await firebase.database().ref(`users/${currentUser.uid}/${window.location.pathname}`)

# once เป็นคำสั่งในการเรียก value ของ ref ครับ
let snap = await ref.once('value')
let value = Object.assign({}, snap.val())

value["heart"] = true

# คำสั่งในการ update ครับ
ref.set(value);
```

เท่านี้ก็เป็นอันเรียบร้อยครับ เราสามารถเข้าไปดูใน Realtime Database Console ได้เลยว่าค่าที่อัพเดทถูกต้องมั้ย

![realtime-database-console-demo]({{ 'assets/images/post/realtime-database-console-demo.gif' | relative_url }})

## สิ่งที่ผมชอบ
### ความง่าย

การที่   client สามารถต่อ database ได้ตรงๆ ทำให้ความซับซ้อนฝั่ง server ลดลงได้มาก และ ยิ่ง static site  แบบ DEVSART ที่ไม่มี server Realtime Database เรียกได้ว่าเป็นตัวเลือกที่ดีมากๆ

### ความปลอดภัย

ถ้าเราใช้ Firebase Authentication อยู่แล้ว เราสามารถ set rule ในขาของ authorization ได้ทันที

```
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```
> rule ของ DEVSART
> 

## สิ่งที่ผมไม่ชอบ

### ข้อจำกัดของการ Query

 ตัวนี้ไม่เชิงว่าเป็นความผิดของ Realtime Database แต่เป็น NoSQL ซะมากกว่า ในกรณีนี้คือ ผมพยามจะ count จำนวน heart ต่อโพส แต่ไม่สามารถทำได้ วิธีแก้ของผมคือต้อง record ใหม่ขึ้นมาเพื่อเก็บ heart count โดยเฉพาะ

ตรงนี้อาจจะเป็นความกากของผมเอง ถ้าเพื่อนๆ มีวิธีที่ดีกว่า ช่วยกระซิบบอกด้วยนะครับ

## สรุป

ถือว่าเป็น tool ที่ใช้งานง่ายอีกตัวครับ ถ้าตัดเรื่อง query ออกไป ผมว่า Realtime Database ก็ตอบโจทย์ ในการเก็บขอมูลของ user แต่ละคนที่ดีมากๆ
