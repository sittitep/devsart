---
title: DEVSART Design
author: sittitep
layout: post
categories:
- discussion
date: '2020-06-09 16:30:00'
image: assets/images/post/devsart-design-thumbnail.jpg
commentary:
  path: assets/sounds/commentary/devsart-design-commentary.m4a
  type: audio/mp4
---

ตัวผมเองอยากเขียน Blog มานานแล้วแต่ไม่ได้ทำซะที ตอนนี้พอมีเวลาเลยได้เริ่มซักที

แต่จะเขียนทั้งที จะให้ใช้ wordpress ก็คงไม่สนุก เลยตั้งใจว่าจะเขียนเอง โดยใช้ [dev.to](https://dev.to){:target="_blank_"} เป็น benchmark ในเรื่องความเร็ว ซึ่งตอนนี้ยังตามอยู่หลายหมื่นลี้

ในโพสนี้ ผมอยากมาแชร์ว่าผมเลือก library, framework หรือ tool ตัวไหนบ้างสำหรับ DEVSART นะครับ

> จริงๆ ผมอยากจะตั้งชื่อว่า "a way overly complicated blog architecture" มากกว่า 😂😂😂

![devsart-tech-tree]({{ 'assets/images/post/tech-tree.jpg' | relative_url }})
> ขออภัยในความกากของรูปนะครับ 🙏
> 

## Infrastructure
ผมเลือกใช้ Digital Ocean สำหรับ server ครับ เหตุผลหลักๆ เลยก็เป็นเพราะเรื่องราคาที่เริ่มต้นเพียง 5$ ต่อเดือนเท่านั้น

หลังจากนั้นผมก็เอา Cloudflare มาครอบไว้อีกที พี่ผมเลือกท่านี้เพราะ ผมรู้สึกว่ามันสะดวกกว่าในการจักการ SSL

ส่วนการจัดการ application ต่างๆ ใน server ผมเลือกใช้ Docker ครับเพื่อความสะดวกรวดเร็วในการ deploy ใน docker ผมรันทั้งหมดสามตัว Nginx, Imgproxy และ Jekyll ครับ

## Tech Stack

ในส่วนนี้ก็ไม่ต่างกับ stack ปกติที่ทุกคนน่าจะคุ้นเคยครับ Webpack เพื่อการจักการ javascript library และ Tailwindcss สำหรับการตกแต่งเพื่อความสวยงาม

ส่วน Jekyll เป็น static site generator ครับ โพสทั้งหมดจะถูกเขียน ในรูปแบบของ markdown แล้ว Jekyll จะแแปลงให้เราอีกทีนึง

> tl;dr Transform your plain text into static websites and blogs [อ่านต่อ](https://jekyllrb.com/){:target="_blank_"} 
> 

##  สรุป
ก็ประมาณนี้นะครับสำหรับ design ของ DEVSART ถ้าเพื่อนๆสงสัยอะไรก็ลองถามกันเข้ามาได้นะครับ
