import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { useState, useEffect } from 'react';

const App = () => {
  const [value, setValue] = useState("")
  const [reply, setReply] = useState(null) //因为ai回复的内容是一个大括号，所以类型是一个对象，就要用null
  const [recordTitle, setRecordTitle] = useState(null)
  const [record, setRecord] = useState([]) //这个记录会记住title，谁说了这句话，说什么话，所以是一个对象，那么我需要把这些对象存到数组中
  

  const getData = async ()=>{
    const options = {
      method:"POST",
      headers:{
        "Content-Type": "application/Json"
      },
      body:JSON.stringify({
        message : value,
      })
    }
    try {
      const response = await fetch("http://localhost:8080/completions", options)
      const data = await response.json()
      setReply(data.choices[0].message)
    } catch (error) {
      console.log(error)
    }
  };

  const addNewChat = () =>{
    setValue("")
    setReply(null)
    setRecordTitle(null)
  }
  console.log(record);

  const handleClick = (uniqueTitle)=>{
    setValue("")
    setReply(null)
    setRecordTitle(uniqueTitle)
  }
  

  //两个参数，一个是call back function，一个是依赖函数，依赖函数就是什么时候执行，call back就是执行什么
  // 比如依赖函数是reply，就盯着reply，只要reply有变化，就执行call back
  useEffect(() =>{
    console.log(recordTitle,value,reply);
    
    if(!recordTitle && reply){
      setRecordTitle(value)
    }
    if(recordTitle && reply){
      //prevRecord拿到的是record，就是原来旧的record，然后展开看看有没有东西，有的话就在后面加入用户和ai说的话，没有东西就直接夹用户ai说的话
      setRecord(prevRecord => [
        ...prevRecord,
        //用户说的话
        {
          title:recordTitle,
          role:"user",
          content:value
        },
        //ai说的话
        {
          title:recordTitle,
          role:reply.role,
          content: reply.content
        }
      ])
    }

  },[reply,recordTitle])
  
  const currentRecord = record.filter(r => r.title === recordTitle)

  const uniqueTitles = Array.from(new Set(record.map((r) => r.title)))
  console.log(uniqueTitles)


  return (
    <div className="app">
      <section className="side-bar">
        <button onClick={addNewChat}>
          <span className="plus">+</span> New chat
        </button>
        <ul className="history">
          {
            uniqueTitles?.map((uniqueTitle,index)=>(
              <li className="message" key={index} onClick={()=>handleClick(uniqueTitle)}>
                  <ChatBubbleOutlineRoundedIcon />
                  <p className="record">{uniqueTitle}</p>
              </li>
            ))
          }
        </ul>
        <nav>
          <p>Made by Baiyang Chen</p>
        </nav>
      </section>
      <section className="main">
        {recordTitle ? (
          <p className='title'>{recordTitle}</p>
        ) : (<h1>Baiyang ChatGPT</h1>)}
        <ul id="output">
          {currentRecord?.map((message, index) => (
            <li
              key={index}
              className={`container ${message.role === "assistant" ? "assistant-msg" : "user-msg"}`}
            >
              <p className={`role ${message.role}`}></p>
              <p>{message.content}</p>
            </li>
          ))}
          <div className="bottom-space"></div>
        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input
              name="text"
              type="text"
              placeholder="Send a message"
              autoComplete="off"
              //value是输入框的value，拿到了state的value，也就是空的，然后onchange改变了state的value，然后这个输入框value又拿到了改变了的state的value
              value={value}
              // 实时监听用户输入内容，每输入一个字，就会自动更新value
              onChange={ (e) => setValue(e.target.value)}
            />
            <div id="submit" onClick={getData}>
              <SendRoundedIcon style={{color:"#DDDDE4"}}/>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
