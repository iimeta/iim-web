# 智元 IM

智元 IM 是一个网页版即时聊天系统, 同时拥有AI聊天对话功能, 本项目基于[Lumen IM](https://github.com/gzydong/LumenIM)开发


[![License](https://img.shields.io/static/v1?label=license&message=MIT&color=green)](https://github.com/iimeta/iim-client)

## 功能介绍
- 支持 WebSocket 通信
- 支持单聊及群聊场景
- 支持聊天消息类型有: 文本、代码块、图片及其它类型文件等
- 支持聊天消息撤回、删除或批量删除、转发消息（逐条转发、合并转发）及群投票功能
- 支持编写个人笔记
- 支持ChatGPT、Midjourney、文心一言、讯飞星火、通义千问等AI助手功能

## 项目预览

- 地址： [https://iim.ai](https://iim.ai)
- 账号： user1@iim.ai 或 user2@iim.ai
- 密码： 123456

### 项目安装(部署)

###### 设置 npm 镜像源
```language
npm config set registry https://registry.npm.taobao.org
```

###### 下载安装
```bash
## 安装项目依赖扩展组件
npm install

# 启动本地开发环境
npm run dev
# 启动本地开发环境桌面客户端
npm run electron:dev

## 生产环境构建项目
npm run build

## 生产环境桌面客户端打包
npm run electron:build
```


## 项目后端
[后端传送门](https://github.com/iimeta/iim-client)

## 作者
 <img src="https://raw.githubusercontent.com/iimeta/iim-client/main/resource/images/Author.png" width="320" alt="微信二维码"/>

 ## 交流群
 <img src="https://raw.githubusercontent.com/iimeta/iim-client/main/resource/images/WeChatGroup.jpg" width="320" alt="微信二维码"/>

![Star History Chart](https://api.star-history.com/svg?repos=iimeta/iim-web&type=Date)
