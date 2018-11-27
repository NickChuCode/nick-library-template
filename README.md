# nick-library-template

A template for constructing an open source library

I like it!

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

