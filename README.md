# nick-library-template

A template for constructing an open source library

I like it!
----------------
[![travis build](https://img.shields.io/travis/NickChuCode/nick-library-template.svg?style=flat-square)](https://travis-ci.org/NickChuCode/nick-library-template)
[![codecov coverage](https://img.shields.io/codecov/c/github/NickChuCode/nick-library-template.svg?style=flat-square)](https://codecov.io/github/NickChuCode/nick-library-template)

## mocha + chai
- 把测试文件和被测试的源代码放在一个文件夹下是kent c dodds推荐的一种方式，因为当源文件很多的时候，如果放在test文件夹下，我们需要分别定位src文件和test文件，还不如放在一起，好维护
- kent在14版本的eslint配置把mocha的配置去掉了，所以还是用9.0.0版本

## nyc

- nyc不支持watch模式，因为它只有运行退出后，才生成报告
- 将npm test改成nyc test即可正常运行nyc，非常便捷
- npm script中有一个config属性，可以放自己lib的配置，但nyc直接在npm script的根节点下建立自己的配置
- 在nyc属性下配置reporter，可以在程序的coverage目录下生成report
- nyc在7.0版本的时候与istanbul merge了，现在nyc是Istanbul的正式命令行工具
- include属性可以限定code coverage生效的位置

## git hooks

- npm-run-all的作用是：将"npm run lint && npm run test"写成"npm-run-all --parallel lint test"的形式。而且不止是这样，它可以并行的运行其中的命令，所以会比前面的线性的运行要快。
- ghook的配置在package.json的config下，写一个ghook，在其中定义。

## transpiling

- babel的配置也可以在package.json中写
- babel可以替你做很多事情，比如我们可以不用写;号了，babel会自动替你填好。此外，'use strict'也会自动帮你加上
- 在babel的命令行中加--ignore *.test.js可以让babel忽略掉测试文件
- npm script中可以通过prexxx来在xxx的script前增加一些操作
- rimraf是一个npm包，可以实现跨平台的命令行统一的rm -rf(因为删除命令，不同的平台上是不同的，比如mac是rm -rf，而win是rmdir)
- 我们直接运行dist中的文件会报错，因为dist中没有那个json文件，我们可以用babel命令行的--copy-files把这个文件copy到dist中，从而保证我们所引用的所有文件都在dist中
- npm pack是一个将项目打包的命令，也是npm publish命令就是先内部运行npm pack，然后将打包的结果上传到npm中，你可以打开那个tgz来看看里面有什么
- 如果我们不想把src和test文件打包到tgz中，可以在package.json中加入一个files属性，license, readme和package.json是默认要放入tgz的，所以不用显式的加入
- 需要把main的地址改为dist，否则可以会有引用错误出现(不过现在npm pack智能多了，如果它发现你的main还是src/xxx的话，就算你没有在files属性中包含src，它也会把src包含在tgz中，这样就不会出现引用错误了，但文件也变大了，所以还是建议及时更改main属性)
- 不要把dist目录上传到github中，这是给用户用的，不是源码
- 可以用babel register会劫持代码中的require，在require之前，先transpile代码，然后再引入，生产环境中不推荐，但是在测试环境中可以使用
- 通过在npm的babel配置中增加env属性，babel编译的时候，不会再把测试代码也编译到源码中了，而在测试的时候，node env是test，此时才transpile测试代码。这样npm test和npm run build都不会出现问题，而且源码中不会出现奇怪的代码了
- 但是NODE_ENV=test只有在mac下才能生效，而win下是没有用的，所以用cross env插件，这样mac和win都可以用了

## webpack
- 因为node和浏览器环境下的模块化不太一样，所以引入webpack来统一
- 使用了webpack4升级了原课程中的webpack 1，所以配置不太一样
- 如何测试打包好的umd.js呢？在命令行中输入node，然后require看是否成功；在browser中F12打开console，把umd中的代码全部拷贝进去，然后运行（名字是webpack中library属性的名称），看是否能正常运行。
- webpack4自己支持json解析，所以不用json-loader
- 在webpack命令中加-p就可以压缩代码
- "npm-run-all --parallel build:*"可以运行所有的build:开头的script，所以可以同时打包出dist, umd和min版本

## 什么时候用peerDependencies
- 当你在构建一个被别的项目使用的库的时候
- 这个库用了其他的一些库
- 你希望使用你的库的用户也用这些依赖库
- 具体看[这篇文章](https://stackoverflow.com/questions/26737819/why-use-peer-dependencies-in-npm-for-plugins)

## fork
- 先fork，然后在setting中重命名项目
- 然后git clone
- 然后本地使用git ls-remote看看是否已经转到了自己的项目
- 如果没有，使用git remote set-url origin xxx来转到自己的项目的origin
- 在package.json中，把所有的url以及库的名称都改成正确的
- webpack的config中，把library等属性更新一下
- 不用git hooks的另一种方法就是直接删掉hooks，rm -rf .git/hooks
- git checkout -b newBranch
- git add. git commit即可（这里有一些疑问，详细还是看课程）

## Tarvis CI
- 根目录下添加.travis.yml配置文件
- 需要用自己的github账号来登录
- 点击新建，sync account，会自动将自己的项目导入
- 设置好以后，以后每次push，都会在travis上有一个build
- build的时候会有成功或者失败的结果，比如这次就告诉我kent的eslint配置了peerDependency，要求eslint的版本是3.2.0，所以之前lint和validate的script一直报错，这就解决了一个问题！
- 如果build通过了，右上角的badge会显示通过
- 可以在shields.io上给自己的项目选择badge，用法很简单，可自定义样式，因为是svg，所以对retina支持很好
- kent写了一篇[博客](https://blog.kentcdodds.com/continuous-delivery-3a4a55baa58a)来介绍continuous delivery，可以看看

## npm发布
- 登录自己的npm账户
- 在自己的命令行中npm login
- 运行npm publish就可以了（它会先运行npm pack，打包后上传到npm）
- npmcdn.com，现在好像改名字了，是一个不错的npm包的cdn，会实时的代理所有npm上的包，输入https://unpkg.com/nick-library-template@1.0.0/dist/index.umd.js即可访问自己的包

## semantic versioning & releasing
- 这里是[语义化版本](https://semver.org/lang/zh-CN/)的链接，自己看看

## Automatic Releasing
- 考虑一种场景，如果删掉dist，然后publish，那么新的npm包中什么都没有，我们又要改，又要声明这个包deprecated了，所以为了避免这种情况，我们需要automatic releasing
- automatic releasing还有其他功能，比如自动生成change log
- 输入npm version major可以直接将当前的npm包升级从1.x.x升级到2.0.0(package.json中的版本信息也会自动更新)
- 
