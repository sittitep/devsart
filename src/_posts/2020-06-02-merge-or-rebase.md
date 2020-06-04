---
title: จะ Merge หรือ Rebase ดีนะ
layout: post
categories:
- git
author: sittitep
image: assets/images/post/merge-or-rebase-thumbnail.jpg
date: '2020-06-02 20:58:30'
---

คำถามนี้น่าจะเคยเกิดขึ้นกับทุกๆคน ในตอนที่เรากำลังจะเอา branch feature ของเรา merge เข้ากับ branch master
วันนี้ผมอยากมาแบ่งบันไอเดียของผม ใรการเลือกใช้ merge และ rebase กันครับ

แต่ก่อนอื่นเรามาทำความเข้าใน merge และ rebase กันสักนิดนึง

![merge-and-rebase](https://miro.medium.com/max/1400/1*pzT4KMiZDOFsMOKH-cJjfQ.png)

## Merge คือ
git merge คือ การรวมสอง branch เข้าด้วยกัน ปกติก็จะเป็นการนำ feature branch ของเรา รวมเข้ากับ master branch

ด้วยการ merge ทุกๆ commit และ message  จะไม่ถูกเปลี่ยน

เรียบงาน และ ไม่ซับซ้อน แต่ก็ใช่ว่า merge จะไม่มีข้อเสีย

![merge-hell](https://hackernoon.com/hn-images/0*NFscoCQwTuLB8mQu.png)

จากภาพ เราจะเห็นได้ว่า git history ของเรานั้นยุ่งเหยิง และ สับสนอย่างมาก 

สามเหตุเกิดจากการที่เรา merge มากเกินไป

ทางเลี่ยงๆง่ายแต่ได้ผล คือ การเลือกใช้ merge เฉพาะ เหตุการณ์สำคัญๆ เช่น การ merge feature เข้า master เป็นต้น

## Rebase คือ
git  rebase คือ การเปลี่ยนจุดเริ่มต้นของเรา ให้เป็น commit สุดท้ายของ branch ที่เราต้องการ

แม้ว่าการ rebase ดูจะเรียบง่าย แต่ในความจริง ทุกๆ commit ของเราจะถูกดึงออก และ ใส่กลับเข้ามาใหม่ทำให้ SHA ของแต่ละ commit ถูกเปลี่ยนไป
## แล้วเลือกใช้ยังไง??
โดยส่วนตัวผมตั้งกฏง่าย 2 ข้อในการเลือกใช้

1. เลือกใช้ merge ก็ต่อเมื่อต้องการ merge feature เข้า master หรือ feature ย่อย  เข้า feature หลัก เท่านั้น
2. ถ้าต้องการทำให้ feature branch เท่ากับ master  ผมจะเลือกใช้ rebase เพื่อป้องกันไม่ให้ history ของเรายุ่งเหยิง เมื่อ merge feature กลับเข้า master

**References**
1. [Git Merge vs. Rebase: What’s the Diff?](https://hackernoon.com/git-merge-vs-rebase-whats-the-diff-76413c117333)
