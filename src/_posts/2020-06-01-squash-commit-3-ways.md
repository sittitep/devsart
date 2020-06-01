---
title: 3 วิธี squash commits อย่างโปร
layout: post
author: sittitep
categories:
- git
image: assets/images/post/squash-commit-3-ways-thumbnail.jpg
---

ผู้อ่านๆหลายคนน่าจะคุ้นชินกับการ squash commit กันอยู่แล้ว แต่สำหรับ developer มือใหม่ นี่คือความหมายโดยย่อของการ squash commit
### squash commit คืออะไร
การ squash commit คือ การรวบ commit หลายๆ commit เข้ามาไว้ด้วยกัน เพื่อให้ git history ของเรามีความเรียบร้อยมากขึ้น

### ตัวอย่าง 
สมมุติว่าเราต้องการเข้าไปแก้คำผิดในไฟล์สักไฟล์นึง เมื่อแก้ไขเสร็จ เราก็ทำการ commit
```
git commit -m "Fix typo"
```
แต่หลังจากที่ commit เรากลับพบว่า สิ่งที่เราแก้ไขไปยังไม่ถูก เราจึงกลับเข้าไปแก้ไข และ commit อีกครั่งนึง
```
git commit -m "Fix typo again"
```
เราจะเห็นได้ว่า 2 commit ข้างต้นมีจุดประสงค์เดียวคือความต้องการที่จะแก้คำผิด การที่เราเก็บทั้ง 2 commit ไว้อาจจะส่งผลให้เกิดความสับสนต่อเพื่อนร่วมทีม ว่าทำไมเราจำเป็นต้องแก้ไขในทั้ง 2 commit และ ที่สำคัญการแก้ typo จุดเดิมๆ สองสามครั้งมันก็จะเขินหน่อยๆ 😅
```
commit e812ce412fc143894eb9aaee637f3b51ca738d92 (HEAD -> master)
Author: Sittitep Tosuwan <sittitep.tosuwan@gmail.com>
Date:   Mon Jun 1 05:47:26 2020 +0700

    Fix typo again

commit c97f4e300a40727f98a47a44a0ecd614f802467c
Author: Sittitep Tosuwan <sittitep.tosuwan@gmail.com>
Date:   Mon Jun 1 05:47:15 2020 +0700

    Fix typo
```
## วิธีที่ 1 git rebase

เราสามารถ squash โดยใช้คำสั่ง rebase ได้ดังนี้
```
git rebase -i HEAD~2
```
ซึ่งคำสั่งนี้หมายความว่า เราจะย้อน codebase กลับไป  commit ที่สองก่อน commit ล่าสุด ซึ่งเมื่อกด enter แล้วเราก็จะเจอหน้าตาแบบนี้
```
pick c97f4e300a40727f98a47a44a0ecd614f802467c Fix typo
pick e812ce412fc143894eb9aaee637f3b51ca738d92 Fix typo again
```
ให้เราทำการ แก้ `pick` เป็น `squash` ใน commit ที่เราต้องการจะยุบ ซึ่งในตัวอย่างนี้เราจะทำการยุบ commit ล่าง
```
pick c97f4e300a40727f98a47a44a0ecd614f802467c Fix typo
squash e812ce412fc143894eb9aaee637f3b51ca738d92 Fix typo again
```
และเมื่อกด enter เราก็จะเห็นว่า message และ change จากทั้งสอง commit ได้มาอยู่รวมกันที่ commit เดียวอย่างที่เราต้องการ
```
commit 2afd33c876a3906155ad6edc969cad06b8f67df6 (HEAD -> master)
Author: Sittitep Tosuwan <sittitep.tosuwan@gmail.com>
Date:   Mon Jun 1 04:52:36 2020 +0700

    Fix typo

    Fix typo again
```
## วิธีที่ 2 git reset
คำสั่งคือ
```
git reset --soft HEAD~2
```
 จากคำสั่งนี่ 2 commit ล่าสุดของเราจะโดน reset แต่ chnage ทั้งหมดจะยังคงอยู่ ซึ่งเราสามารถ commit พร้อม message ใหม่ได้ทันที
 ```
 git commit -m "Newly squashed commit"
```
และนี่คือผลลัพธ์ที่ได้
```
commit fb916ee58ece542f01c9adb644218b645d53f264 (HEAD -> master)
Author: Sittitep Tosuwan <sittitep.tosuwan@gmail.com>
Date:   Mon Jun 1 06:23:47 2020 +0700

    Newly squashed commit
```
## วิธีที่ 3 git merge
 พูดตรงๆ ว่าส่วนตัวผมไม่เคยใช่วิธีนี้ แต่อยากจะเอามารวมไว้ด้วยกันเผื่อเอาไว้ reference ในอนาคต โดยคำสั่งเริ่มต้นจะคล้ายกับวิธีที่สองคือ
```
git reset --hard HEAD~2
```
ตามด้วย
```
git merge --squash HEAD@{1}
```
และปิดท้ายด้วยการ commit
```
git commit
```
ซึ่งนี่คือผลลัพธ์ที่ได้
```
Squashed commit of the following:

commit 8320eb86a407034f79968a9b7c51a8f39b4f4b1c
Author: Sittitep Tosuwan <sittitep.tosuwan@gmail.com>
Date:   Mon Jun 1 06:39:58 2020 +0700

    Fix typo again

commit e27c4a42a6f387dc769adab6940983640f86e208
Author: Sittitep Tosuwan <sittitep.tosuwan@gmail.com>
Date:   Mon Jun 1 06:39:49 2020 +0700

    Fix typo
```

## สรุป
โดยปกติแล้วผมจะเลือกวิธีให้เหมาะสมกับสถานการณ์ต่างๆ ในกรณีที่เป็นการแก้คำผิด หรือ การตั้งค่าผิด ผมมักจะใช้วิธีที่สอง เพราะ  message ของ commit เหล่านั้นไม่มีความสำคัญสักเท่าไหร่ แต่ในกรณีที่ผมต้อง squash commit ของ feature branch ก่อน merge เข้า branch อื่น ผมมักจะเลือกวิธีที่หนึ่ง เพราะ message ของแต่ละ commit จะถูกเก็บไว้อย่างครบถ้วน

**References**
1. [rebase - Squash my last X commits together using Git - Stack Overflow](https://stackoverflow.com/questions/5189560/squash-my-last-x-commits-together-using-git)
