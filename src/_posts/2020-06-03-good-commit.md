---
title: Commit  ดีมีชัยไปกว่าครึ่ง
layout: post
author: sittitep
categories:
- git
image: assets/images/post/good-commit-thumbnail.jpg
---

สวัสดีครับ การอ่าน review code คงจะเป็นอะไรที่เราคุ้นเคย แต่เคยสงสัยกันบ้างมั้ยครับว่าอะไร ที่ทำให้ pull request บางอันอ่านง๊ายง่าย แทบจะไม่ต้องถามคนเขียนกันเลย แต่กับอีกบาง pull request อ่านแล้วอ่านอีก ถามแล้วถามอีกก็ยังงงๆมึนๆ

นอกเหนือนจาก description ที่ดีของ pull request จากประสบการณ์ของผม อีกส่วนหนึ่งที่สำคัญไม่แพ้กัน ก็คือการ commit

ลองเปรียบเทียบ  git log  สองอันด้านล่างดูนะครับ

```
commit cd4407007183c29c13b56411332f2f92cc33e13a (HEAD -> master)
Author: Sittitep Tosuwan <sittitep.tosuwan@gmail.com>
Date:   Wed Jun 3 23:20:47 2020 +0700

    Add feature messages
```

และ

```
commit 54a32d1847087c443bd47d5001c063aaba15cd37 (HEAD -> master)
Author: Sittitep Tosuwan <sittitep.tosuwan@gmail.com>
Date:   Wed Jun 3 23:18:40 2020 +0700

    Add message list ui

commit 1b4eef23a61bba54abf66cd379548738680d52d7
Author: Sittitep Tosuwan <sittitep.tosuwan@gmail.com>
Date:   Wed Jun 3 23:18:06 2020 +0700

    Add get messages api

commit 912e39ccf93e90bea4ee75beb69e506d27899070
Author: Sittitep Tosuwan <sittitep.tosuwan@gmail.com>
Date:   Wed Jun 3 23:17:59 2020 +0700

    Add Rspec
```

คุณคิดว่าระหว่างตัวอย่างสองอันด้านบน อันไหนอ่านง่ายกว่ากันครับ

จากที่เราเห็น แม้ว่าสุดท้ายคุณภาพของ code ทั้งของทั้งสองตัวอย่างจะเท่ากัน แต่เมื่อเราดูจากมุมของ readability และ maintainability ตัวอย่างด้านล่างคงจะชนะไปแบบไม่มีของกังขา

เวลาผมจะแนะนำน้องๆในทีม ผมเลยตั้งหลักการง่ายๆ ขึ้นมา 3 ข้อ
## 1 Commit ตามลำดับการทำงาน

อย่างตัวอย่างด้านบน เราจะเห็นว่ามีการเรียงลำดับการทำงานที่ชัดเจน ทำให้ผู้อ่านสามารถเข้าใจกระบวนการคิดและเขียน code ได้ โดยเฉพาะถ้าเราต้องการผลักดันแนวคิด TDD วิธีนี้ก็เป็นวิธีที่ได้ผลดีเช่นกัน

> tl;dr TDD สามารถอธิบายได้ว่า เป็นการฝึกโปรแกรมเพื่อให้นักพัฒนาทราบถึงว่าโค้ดใหม่ที่เขียนขึ้นมาเมื่อได้รับการทดสอบแล้วมันผิดพลาดไหม  แถมยังหลีกเลี่ยงโค้ดที่ซ้ำกันได้อีกด้วย โดย TDD ย่อมาจาก Test Driven Development เป้าหมายหลักของ TDD คือการทำให้โค้ดสะอาด เรียบง่าย  และปราศจากบัค [อ่านต่อ](https://www.thaiprogrammer.org/2019/01/what-is-tdd/#:~:text=%E0%B8%AD%E0%B8%B0%E0%B9%84%E0%B8%A3%E0%B8%84%E0%B8%B7%E0%B8%AD%20Test%20Driven%20Development%20(TDD)%3F,%E0%B8%87%E0%B9%88%E0%B8%B2%E0%B8%A2%20%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%9B%E0%B8%A3%E0%B8%B2%E0%B8%A8%E0%B8%88%E0%B8%B2%E0%B8%81%E0%B8%9A%E0%B8%B1%E0%B8%84)

## 2 ขนาดมีความาสำคัญ (Size does matter)
การที่เราซอย commit ถี่ๆ ทำให้ commit มีขนาดเล็ก เมื่อทำการ review ผู้อ่านก็จะสามารถ focus ได้มากขึ้น เช่น เมื่อเรา review commit `Add get messages api` ผู้อ่านจะ focus แค่เรื่องของ backend เป็นต้น
## 3 Message มีความหมาย ไม่ต้องตีความ
และสุดท้าย การตั้ง message ที่ดี ทำให้เราเข้าใจเจตนาของ commit นั้นมากยิ่งขึ้น ซึ่งโดยส่วนตัวผมจะเน้นให้ตัว message ประกอบไปด้วย กริยา และ กรรม และ พยามจำกัดกริยาไว้แค่  add, edit, และ remove

## ส่งท้าย
เอาเข้าจริงๆ ใน project ส่วนตัว ผมก็ไม่ได้ใส่ใจกับการ commit มากนักเพราะส่วนใหญ่จะอ่านเองเขียนเองคนเดียว

แต่เมื่อไหร่ก็ตามที่เราต้องทำงานเป็นทีม การ commit ที่ดีย่อมส่งผลให้ทีมทำงานง่าย และ มีประสิทธิภาพมากขึ้นอย่างแน่นอน

**Reference**
1. [อะไรคือ Test Driven Development (TDD)? ตัวอย่าง](https://www.thaiprogrammer.org/2019/01/what-is-tdd/#:~:text=%E0%B8%AD%E0%B8%B0%E0%B9%84%E0%B8%A3%E0%B8%84%E0%B8%B7%E0%B8%AD%20Test%20Driven%20Development%20(TDD)%3F,%E0%B8%87%E0%B9%88%E0%B8%B2%E0%B8%A2%20%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%9B%E0%B8%A3%E0%B8%B2%E0%B8%A8%E0%B8%88%E0%B8%B2%E0%B8%81%E0%B8%9A%E0%B8%B1%E0%B8%84)
