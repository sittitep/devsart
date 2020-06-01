---
title: ทำ CD ด้วย Github Action ใน 3 นาที
author: sittitep
categories:
- github
- CI/CD
- devops
layout: post
date: '2020-06-01 08:00:00'
image: assets/images/post/github-action-3-mins-thumbnail.jpg
---

> tl;dr CICD ย่อมาจาก Continuous integration and continuous delivery ผมขออธิบายแบบสั้นๆ ก็คือการทำให้โปรเจ็คของเราทำงานแบบอัตโนมัติทั้งหมด ตั้งแต่การ run unitest, build, packing ไปจน deploy หรือใครจะมี flow แบบอื่นก็แล้วแต่จะใส่เข้าไป [อ่านต่อ](https://blog.twinsynergy.co.th/getting-started-with-gitlab-cicd/){:target="_blank"}
> 

คงปฏิเสธไม่ได้ว่า CI/CD ได้เข้ามาเป็นส่วนหนึ่งของการพัฒนาโปรแกรมไปซะแล้ว ในอดีตเรามักจะพัฒนากันให้เสร็จใน local แล้วไปวัดดวงตอนขึ้น production ซึ่งส่วนใหญ่ดวงเรามักจะไม่ค่อยดี และ มีเรื่องให้แก้ไขเฉพาะหน้ากันตลอด 😅😅😅

![it works on my machine](https://i.imgflip.com/9mqg4.jpg)

อาจจะเพราะในอดีต CI/CD ไม่ได้สร้างง่ายๆเหมือนอย่างทุกวัน ในปัจจุบันเรามีทางเลือกมากมาย เช่น [CircleCi](https://circleci.com/){:target="_blank"}, [semaphoreci](https://semaphoreci.com/){:target="_blank"} และ [Buildkite](https://buildkite.com/){:target="_blank"} แต่ tool ที่กล่าวต้องยอมสยมเมื่อ Github ส่ง [Actions](https://github.com/features/actions){:target="_blank"} ซึ่งเป็น CI/CD มาให้เราใช้กันแบบฟรีๆ เพื่อไม่ให้เป็นการเสียเวลา เราไปดูกันเลยว่ามันจะง่ายขนาดไหน
## เตรียมตัว
1.  **Host** ในบทความนี้ผมใช้ DigitalOcean ตัวถูกสุด และ เป็นตัวที่ DEVSART ใช้อยู่ด้วย

2. **Github** แน่นอนว่าเราใช้ feature ของ Github ย่อมต้อง เก็บ code ไว้ที่ Github

3. **Deploy Script** คือ ไฟล์ shell script ที่เก็บคำสั่งที่จำเป็นในการ deploy โปรแกรมของเรา

## ขั้นตอน
### 1. สร้างไฟล์  workflow
```
# /Users/sittitep/projects/devsart/.github/workflows/cd.yml

name: CD #ตรงนี้ตั้งได้ตามใจชอบนะครับ

on: #ตรงคือการบอกว่าให้รัน action นี่เมื่อมีการ push หรือ merge pull request ไปยัง master
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]

jobs:
  build:
    runs-on: ubuntu-latest
    #อันนี้คือขั้นตอนสำคัญ เป็นการสั่งให้ ssh เข้่ายัง host ของเรา และ รัน deploy.sh
    steps:
    - uses: actions/checkout@v2
    - name: SSH Commands 
      uses: appleboy/ssh-action@master
      with:
        host: 167.71.209.134 # IP ของ host เรา
        username: root # username ที่เราตั้งไว้
        key: {{"${{ secrets.KEY "}}}} # key ตรงนี้คือ ssh key ที่สามารถเข้าเครื่อง host ได้
        port: 22
        script: |
          ./deploy.sh

```
### 2. ตั้งค่า key บน Github
หลังจากที่สร้างไฟล์ workflow สำเร็จ เราก็ต้องไปตั้งค่า key  บน Github เพื่อให้ Github Action  สามารถ ssh เข้าเครื่อง host ได้

![github-secret]({{ 'assets/images/post/ github-secret.jpg' | relative_url }})
### 3. ติดตั้ง depoy script
ขั้นตอนสุดท้ายคือการนำไฟ์ deploy script ไปวางไว้ที่เครื่อง host ซึ่ง location ของไฟล์ต้องต้องกับ location ที่เราตั้งไว้ในไฟล์ workflow นะครับ
```
# ~/deploy.sh

cd ~/devsart
git reset --hard
git clean -fd
git pull origin master
docker build . -t devsart --no-cache
docker-compose down && docker-compose up -d
docker system prune -f
```

ถ้าเราตั้งค่าทึกอย่างถูกต้อง Github Action ก็จะเริ่มทำงานในครั้งต่อไปที่เรา push ไปยัง master 

![github-actions]({{ 'assets/images/post/github-actions.jpg' | relative_url }})
##  สรุป
Github Actions ก็เป็นตัวเลือกที่ไม่แย่ ถ้าเราฝาก Git ไว้ที่นี่อยู่แล้ว การ Integration ทำได้ค่อนข้างสะดวก แต่ก็ใช้ว่าจะไม่มีข้อเสีย Github Actions จำกัด build time สำหรับ free-tier ไว้ที่ 2,000 นาที แต่เอาจริงๆ ผมก็ยังไม่เคยโดยเก็บเงินสักที 😂

### Reference
1. [Getting started with gitlab CICD](https://blog.twinsynergy.co.th/getting-started-with-gitlab-cicd/){:target="_blank"}
