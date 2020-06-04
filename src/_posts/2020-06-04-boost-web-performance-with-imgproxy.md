---
title: imgproxy ครบเครื่องเรื่องรูปภาพ
author: sittitep
categories:
- feature
- performance
- devops
date: '2020-06-04 20:57:44'
layout: post
image: assets/images/post/boost-web-performance-with-imgproxy-thumbnail.jpg
---

รูปภาพถือ เป็นส่วนสำคัญของเว็บไซต์ แต่รูปภาพเองก็ทำให้ performance ของเรานั้นตกต่ำหากเราไม่ได้ทำการ optimize รูปภาพเหล่านั้น

แต่จะให้มานั้ง optimize ทีละรูปมันก็คงจะไม่ค่อยเข้าท่าเท่าไหร่ วันนี้ผมเลยจะมาชวน optmize รูปภาพด้วย imgproxy

>tl;dr imgproxy is a fast and secure standalone server for resizing and converting remote images. The main principles of imgproxy are simplicity, speed, and security. [อ่านต่อ](https://github.com/imgproxy/imgproxy)
>

imgproxy   มาพร้อมกับ docker image ทำให้การใช้งานสะดวกยิ่งขึ้นไปอีก เรามาเริ่มที่ขั้นตอนแรกกันเลย

## เพิ่ม  imgproxy docker image
ตัว DEVSART เองใช้ docker compose ในการจัดการ ฉะนั้นสิ่งแรกที่เราจะทำก็คือการไปแก้ไขไฟล์ docker-compose.yml

```
version: '3'
services:
  ...
  imgproxy:
    image: darthsim/imgproxy
    ports:
      - "8080:8080"
```

เท่านี้  imgproxy ก็พร้อมใช้งานแล้วครับ

##  ตัวอย่างการใช้งาน

หากเราต้องการจะย่อภาพนี้

![ruby-on-rails](https://swiftlet.co.th/wp-content/uploads/2019/05/What-is-Ruby-on-Rails-1-1.png)

ให้เหลือขนาด  100x100 และ แปลงไฟล์เป็น jpg

เราจเขียนได้แบบนี้ครับ

```
localhost:8080/imgproxy/fill/100/100/sm/0/plain/https://swiftlet.co.th/wp-content/uploads/2019/05/What-is-Ruby-on-Rails-1-1.png@jpg
```

และนี่คือรูปที่เราจะได้

![resized-ruby-on-rails](https://devsart.net/imgproxy/fill/100/100/sm/0/plain/https://swiftlet.co.th/wp-content/uploads/2019/05/What-is-Ruby-on-Rails-1-1.png@jpg)

## ส่งท้าย
นี่เป็นเพียงตัวอย่างเล็กๆ ที่ผมลองทำให้ดู ถ้าเพื่อนๆสนใจ สามารถเข้าไปดูวิธีการใช้งานเต็มๆได้   [ที่นี่](https://docs.imgproxy.net/#/GETTING_STARTED)
