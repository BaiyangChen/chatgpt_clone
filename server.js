const PORT = 8080

const express = require("express")
const cors = require("cors")
require("dotenv").config({path:"src/.env"})

const app = express()

//允许你的后端自动把前端传来的 JSON 数据解析出来，放在 req.body 里
app.use(express.json())
//允许前端访问这个后端，不管你是本地还是部署了，只要跨端口请求就必须加这句，不然浏览器直接拦
app.use(cors())

//OpenRouter 的密钥，相当于身份验证
const API_KEY = process.env.API_KEY
console.log(API_KEY)


//在本服务器创建一个post接口，前端如果发 POST 请求到 http://localhost:8080/completions，就会触发这个函数。
app.post("/completions", async(req,res) => {
    //发给 OpenRouter 的请求配置
    const options ={
        method:"POST",
        //请求头，带有身份验证和请求体的数据类型是json
        headers:{
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type" : "application/json"
        },
        body:JSON.stringify({
            model:"deepseek/deepseek-chat-v3",
            //告诉ai当前的对话者是用户，内容是content
            messages:[{role:"user", content: req.body.message}],
            //最多生成多少个词（Tokens）
            max_token : 100
        })
    }
    try {
        //向 OpenRouter 的服务器发送一个请求，fetch(...) 是 JavaScript 中用来发网络请求的函数
        //向https://openrouter.ai/api/v1/chat/completions发请求，请求的配置是options
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", options)
        //OpenRouter 返回的是一段 JSON 格式的字符串，.json() 是用来“解析”这段 JSON 数据的函数。
        //解析之后，data 就是一个 JavaScript 对象，里面会包含 AI 的回复、role、content 等内容
        const data = await response.json()
        //res.send(...) 是 Express 框架中用来返回 HTTP 响应的函数
        res.send(data)
    } catch (error) {
        console.log(error);
    }
})

app.listen(PORT, () => console.log(`Server is runing on ${PORT}`))