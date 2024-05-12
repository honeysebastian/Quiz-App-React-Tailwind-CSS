import React, { useEffect, useRef, useState } from 'react'
import { data } from './assets/data'


function App() {
  const [quizStarted,setQuizStarted]=useState(false)
  let [index,setIndex]=useState(0)
  let[question,setQuestion]=useState(data[index])
  let[lock,setlock]=useState(false)
  let[score,setScore]=useState(0)
  let[result,setResult]=useState(false)

  let Option1=useRef(null)
  let Option2=useRef(null)
  let Option3=useRef(null)
  let Option4=useRef(null)

  let option_arr=[Option1,Option2,Option3,Option4]
  

  const handleStartGame=()=>{
    setQuizStarted(true)
  }

  const checkAnswer=(e,ans)=>{
    if(lock==false){
      if(question.ans===ans){
        e.target.classList.add('correct')
        setlock(true)
        setScore(pre=>pre+1)
      }else{
        e.target.classList.add('wrong')
        setlock(true)
        option_arr[question.ans-1].current.classList.add('correct')
      }
    }

  }

  const nextQuestion=()=>{
    if(lock===true){
      if(index===data.length-1){
        setResult(true)
        return 0;

      }
      setIndex(++index)
      setQuestion(data[index])
      setlock(false)
      option_arr.map((option)=>{
        option.current.classList.remove('wrong')
        option.current.classList.remove('correct')
        return null;

      })
    }

  }

  const resetQuiz=()=>{
    setQuizStarted(false)
    setIndex(0)
    setQuestion(data[0])
    setScore(0)
    setlock(false)
    setResult(false)
  }


  return (
    <div className='game-container shadow-lg'>
      <div className='heading pb-5'>
        Quiz app
      </div>
      {!quizStarted? (
         <div className="start-game flex flex-col items-center">
         <h1 style={{fontSize:'50px'}}>Let's Start The Quiz</h1>
         <button onClick={handleStartGame} className='button-next rounded-full'>Start</button>
       </div>

      ) :
      (
        <>
         {result?<></>:<>
         <div className="max-question">
          {index+1}/{data.length} Questions
        </div>
        <div className="question">
          <p style={{fontSize:'1.5rem'}}>{index+1}. {question.question}</p>
        </div>
       <ul>
        <li ref={Option1} onClick={e=>checkAnswer(e,1)} className="h-16  rounded-full">
            <div className="option-number bg-orange-500 ms-4  p-3 flex justify-center items-center mt-2  ">
              1
            </div>
            <h2>{question.option1}</h2>
        </li>
        <li ref={Option2} onClick={e=>checkAnswer(e,2)} className="h-16  rounded-full">
        
            <div className="option-number bg-orange-500 ms-4  p-3 flex justify-center items-center mt-2  ">
              2
            </div>
            <h2>{question.option2}</h2>
         
        </li>
        <li ref={Option3} onClick={e=>checkAnswer(e,3)} className="h-16  rounded-full">
        
            <div className="option-number bg-orange-500 ms-4  p-3 flex justify-center items-center mt-2  ">
              3
            </div>
            <h2>{question.option3}</h2>
         
        </li>
        <li ref={Option4} onClick={e=>checkAnswer(e,4)} className="h-16  rounded-full">
        
            <div className="option-number bg-orange-500 ms-4  p-3 flex justify-center items-center mt-2  ">
              4
            </div>
            <h2>{question.option4}</h2>
          
        </li>
       </ul>
        <div className="button-next rounded-full">
          <button onClick={nextQuestion} className=''>Next Question</button>
        </div>
         </>}
        {result?<>
          <div className='result'>
          {/* <h2>Results</h2> */}
          <p>Your score is {score} out of {data.length}</p>
          <h3 className='try-again blink-text'>Click restart to try again!!!</h3>
          <button onClick={resetQuiz} className='button-next rounded-full'>Restart</button>
        </div>
        </>:<></>}

        

        </>
      )
    }
    </div>
  )
}

export default App