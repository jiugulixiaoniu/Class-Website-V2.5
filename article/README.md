
提示 : 
添加动态需要在content.json里面添加一条
```json
{
  title : <标题>,
  data: <日期>,
  level: <等级>,
  id: <id>
}
```
然后创建文件 : <id>.json 在这里
文件内 
```json
{
  title: <标题>,
  content: <内容，html>
}
```
然后访问的话就是带 url 参数的访问这里的index.html  


如果觉得麻烦，直接
```bash
node article/SendArticle.js
```
就行了