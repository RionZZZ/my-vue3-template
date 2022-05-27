# ruiyun-admin


睿云管理后台系统

- 支持睿云前端表单配置化
- 支持多模板配置
- 不同数据集配置不同的表单模板

## Table of Contents

- [背景](#背景)
- [安装](#安装)
- [使用](#使用)
- [打包](#打包)
- [插件](#插件)
- [目录结构](#目录结构)

## 背景

提升研发效率，将定制化需求转换成通用解决方案
支持不同数据集的个性化配置

## 安装

```
yarn
```

## 使用

```
yarn dev
```

## 打包

```
yarn build
```
## 插件

```
<!-- 网络请求 -->
"axios": "^0.26.1",
<!-- 等保加密 -->
"crypto-js": "^4.1.1",
<!-- 浏览器鼠标滚动事件警告解决 -->
"default-passive-events": "^2.0.0",
<!-- 样式初始化 -->
"normalize.css": "^8.0.1",
<!-- 加载进度条 -->
"nprogress": "^0.2.0",
<!-- store -->
"pinia": "^2.0.13",
<!-- store持久化 -->
"pinia-plugin-persistedstate": "^1.5.1",
<!-- UI框架 -->
"tdesign-vue-next": "0.15.1",
<!-- vue -->
"vue": "^3.2.25",
<!-- 路由 -->
"vue-router": "4"
```
着重说明一下**TDesign**，确实bug较多，但是issue反应很快，迭代频繁。有问题的地方在代码中注释了，每次更新插件库就可。
```
yarn upgrade --latest tdesign-vue-next
```

## 目录结构
```
-> 打包后文件
├── dist
|  ├── assets
|  ├── favicon.ico
|  └── index.html
├── index.html
├── package.json
-> 不编译文件
├── public
|  └── favicon.ico
├── README.md
├── src
-> 入口文件
|  ├── App.vue
-> 图片、css
|  ├── assets
|  |  ├── images
|  |  └── styles
|  |     ├── 404.scss   -> 404\401
|  |     ├── common.scss
|  |     ├── develop.scss   -> 研发管理通用样式
|  |     └── theme.scss   -> 切换主题功能
-> 公共组件
|  ├── components
|  |  ├── button.vue   -> 防抖按钮
|  |  ├── pagination.vue   -> 分页
|  |  └── reload.vue
|  ├── env.d.ts
-> 插件引入
|  ├── main.ts
-> 路由
   根据菜单分类
|  ├── router
|  |  ├── configuration.ts
|  |  ├── dataset.ts
|  |  ├── develop.ts
|  |  ├── home.ts
|  |  ├── index.ts
|  |  └── login.ts
-> api接口
|  ├── service
|  |  ├── common
|  |  |  ├── index.ts
|  |  |  └── type.ts
|  |  ├── develop
|  |  |  ├── index.ts
|  |  |  └── type.ts
|  |  └── login
|  |     ├── index.ts
|  |     └── type.ts
-> pinia
|  ├── store
|  |  ├── index.ts
|  |  └── modules
|  |     ├── develop
|  |     |  ├── index.ts
|  |     |  └── type.ts
|  |     ├── system
|  |     |  ├── index.ts
|  |     |  └── type.ts
|  |     └── user
|  |        ├── index.ts
|  |        └── type.ts
-> 工具类
    添加公共方法放到util.ts里，特殊工具单独新建文件
|  ├── utils
|  |  ├── createComp.ts
|  |  ├── progress.ts
|  |  ├── request.ts
|  |  └── util.ts
-> 页面
    根据主、子菜单分文件夹，页面放同级，组件放components文件夹
|  └── views
|     ├── configuration
|     |  └── form
|     |     └── index.vue
|     ├── dataset
|     |  ├── multi
|     |  |  └── index.vue
|     |  └── person
|     |     └── index.vue
|     ├── develop
|     |  ├── business
|     |  |  ├── components
|     |  |  |  └── BusinessForm.vue
|     |  |  └── index.vue
|     |  ├── const.ts
|     |  ├── data
|     |  |  ├── components
|     |  |  |  ├── DataForm.vue
|     |  |  |  ├── JsonDraw.vue
|     |  |  |  ├── RelationChildren.vue
|     |  |  |  └── RelationTable.vue
|     |  |  └── index.vue
|     |  ├── relation
|     |  |  ├── components
|     |  |  |  ├── DetailProps.vue
|     |  |  |  ├── DetailRules.vue
|     |  |  |  ├── RelationDetail.vue
|     |  |  |  └── RelationForm.vue
|     |  |  └── index.vue
|     |  └── type.ts
|     ├── home
|     |  ├── 401.vue
|     |  ├── 404.vue
|     |  └── index.vue
|     ├── layout
|     |  ├── components
|     |  |  ├── Header.vue
|     |  |  ├── Menu.vue
|     |  |  ├── MenuItem.vue
|     |  |  └── Tab.vue
|     |  └── index.vue
|     └── login
|        └── index.vue
-> 环境变量
├── .env.development
├── .env.production
-> eslint配置
├── .eslintrc.js
-> prettier配置
├── .prettierrc.json
-> ts配置
├── tsconfig.json
├── tsconfig.node.json
-> vite配置
└── vite.config.ts
```
