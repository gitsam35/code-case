const express = require("express")

const app = express()

app.use(require('cors')()) // 跨域
app.use(express.json()) // 使用json文件格式
app.set('secret', 'yh35oi3u4y8') // 设置秘钥 token 
app.set('wxSecret', 'WeChatyh35') // 设置秘钥 token 
require('./plugins/db')(app)
require('./routes/admin')(app)
app.use('/uploads', express.static(__dirname + '/uploads')) //托管静态文件

app.listen(3000, () => {
    console.log('http://localhost:3000');
});