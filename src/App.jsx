import { useState,useEffect } from 'react'
import './App.css'

function App() {
  const [quote, setQuote] = useState({})
  const [button, setButton] = useState("Loading Quote...")

  const getQuote = () =>{
    setButton("Loading Quote...")
    fetch("https://api.quotable.io/random")
      .then(res=>res.json())
      .then(res=>{
        setQuote({
          author: res.author,
          content: res.content
        })
        setButton("New Quote")
      }
      )
  }

  const handleSound = ()=>{
    let utterance = new SpeechSynthesisUtterance(`${quote.content} by ${quote.author}`)
    speechSynthesis.speak(utterance)
  }

  const handleCopy = ()=>{
    navigator.clipboard.writeText(quote.content)
  }
  
  const handleTweet = ()=>{
    let url = `https://twitter.com/intent/tweet?url=${quote.content}`
    window.open(url, "_blank")
  }

  useEffect(()=>{
    getQuote()
  }, [])

  return (
    <div className="wrapper">
      <header>Quote of the day</header>
      <div className="content">
        <div className="quote-area">
          <i className="fas fa-quote-left"></i>
          <p className="quote">{quote.content}</p>
          <i className="fas fa-quote-right"></i>
        </div>
        <div className="author">
          <span>__</span>
          <span className="name">{quote.author}</span>
        </div>
      </div>
      <div className="buttons">
        <div className="features">
          <ul>
            <li className="sound" onClick={handleSound}>
              <i className="fas fa-volume-up"></i>
            </li>
            <li className="copy" onClick={handleCopy}>
              <i className="fas fa-copy"></i>
            </li>
            <li className="twitter" onClick={handleTweet}>
              <i className="fab fa-twitter"></i>
            </li>
          </ul>
          <button onClick={getQuote}>{button}</button>
        </div>
      </div>
    </div>
  )
}

export default App
