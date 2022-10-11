# OBS观测平台
本平台主要用于观测[OBS平台](https://build.tarsier-infra.com/project)上的数据，主要功能包括统计数据观测、差异对比、包搜索等。

- [截图及用法](https://github.com/ArCyanic/Internship/blob/main/snapshots/OBS%E5%B7%A5%E7%A8%8B%E8%A7%82%E6%B5%8B%E5%B9%B3%E5%8F%B0.md)

# 技术栈
- vue3
- ElementPlus
- vue-router
- pinia
- d3, echarts
- typescript

# Use

运行需要环境中安装Node，建议版本17+。

在部署完后端后，修改vite.config.ts中的服务器地址。

将仓库克隆到本地，执行：

- npm i
- npm run dev

# 设计思路

## src文件树

本项目src目录的文件树如下：

```
.
├── App.vue
├── assets
│   └── vue.svg
├── components //布局子组件
│   ├── AppFooter.vue
│   ├── AppHeader.vue
│   ├── AppSidebar.vue！侧边栏组件
│   └── ChartTable.vue //通用表格组件，暂未用到
├── layouts //布局文件夹
│   └── DefaultLayout.vue
├── main.ts
├── pages //页面文件夹
│   ├── Diff
│   │   ├── DiffCellPostfix.vue
│   │   ├── DiffTable.vue
│   │   └── types.ts
│   ├── Diff.vue //项目差异页面
│   ├── DiffPackages
│   │   ├── DiffTableSpatial.vue
│   │   ├── ListTable.vue
│   │   └── types.ts
│   ├── DiffPackages.vue //包构建差异页面
│   ├── Search.vue //包搜索页面
│   ├── Statistic 
│   │   ├── MixedLineBar.vue
│   │   └── StackedColumn.vue
│   └── Statistic.vue //项目统计页面
├── router //路由
│   └── index.ts
├── store //全局状态管理
│   └── index.ts
├── style.css //全局style
├── utils.ts //工具型函数
└── vite-env.d.ts
```

## 布局

布局组件放在 ./layouts/DefaultLayout.vue 中，其模板代码如下：

```vue
<template>
    <el-container style="height: 100%" >
        <el-aside :width="isCollapsed ? '5%' : '14%'">
            <AppSidebar />
        </el-aside>
        <el-container>
            <el-header>
                <AppHeader />
            </el-header>
            <el-main>
                <router-view />
            </el-main>
            <el-footer height="30px" style="">
                <AppFooter   />
            </el-footer>
        </el-container>
    </el-container>
</template>
```

整体布局效果：

![image-20221011143150830](https://raw.githubusercontent.com/ArCyanic/Gener/master/image-20221011143150830.png)

其中，Aside、Header、Footer都以组件的形式存放在 ./components文件夹中，Main则是以路由的方式展现，其代码位于./pages文件夹中。

## 主要内容页面

页面的主要内容存放在./pages文件夹中，其文件树如下：

```
.
├── Diff
│   ├── DiffCellPostfix.vue
│   ├── DiffTable.vue
│   └── types.ts
├── Diff.vue
├── DiffPackages
│   ├── DiffTableSpatial.vue
│   ├── ListTable.vue
│   └── types.ts
├── DiffPackages.vue
├── Search.vue
├── Statistic
│   ├── MixedLineBar.vue
│   └── StackedColumn.vue
└── Statistic.vue
```

外层的vue组件一般与一个文件夹对应。例如Diff.vue文件对应Diff文件夹，Diff.vue文件是一个页面组件，文件夹里的是它的子组件。

## 添加页面

要添加一个页面，首先在./pages文件夹中添加对应文件中，然后在 ./router/index.ts 中添加相应路由代码，最后在./components/AppSidebar.vue中添加Menu-item即可。

