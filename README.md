# nick-library-template

A template for constructing an open source library

I like it!

## mocha + chai
- 把测试文件和被测试的源代码放在一个文件夹下是kent c dodds推荐的一种方式，因为当源文件很多的时候，如果放在test文件夹下，我们需要分别定位src文件和test文件，还不如放在一起，好维护

## nyc

- nyc不支持watch模式，因为它只有运行退出后，才生成报告
- 将npm test改成nyc test即可正常运行nyc，非常便捷
- npm script中有一个config属性，可以放自己lib的配置，但nyc直接在npm script的根节点下建立自己的配置
- 在nyc属性下配置reporter，可以在程序的coverage目录下生成report
- nyc在7.0版本的时候与istanbul merge了，现在nyc是Istanbul的正式命令行工具
- include属性可以限定code coverage生效的位置
