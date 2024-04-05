import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function GeneratePopup({changer, isOpen, setter, handleTextareaBlur, id}) {
  const [prompt, setPrompt] = useState("");
  console.log(changer);
  function setText(e) {
    if(prompt === "")return;
    
    const body = {
      model: "gpt-3.5-turbo",
      messages: [{"role": "user", "content": `${prompt}`}],
      max_tokens: 256
      }

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API}`
      }

    axios.post("https://api.openai.com/v1/chat/completions", body, {headers: headers}).
    then(res => {
      const data = res.data;
      const generated = data["choices"][0]["message"]["content"];
      setter(generated);
      changer(generated, id);
      handleTextareaBlur();
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <>
      <div className={isOpen ? '' : 'invisible h-0'}>
        <div className='z-10'>
            <textarea rows="2" placeholder='Write a prompt to generate text' onChange={(e) => setPrompt(e.target.value)}></textarea>
            <Button className='btn btn-outline-dark' onClick={setText}>Generate</Button>
        </div>
      </div>
    </>
  );
};

export default GeneratePopup;