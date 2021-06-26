import React, { useState } from 'react'

export default function ContactUsScreen(props) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');

  const submitHandler = (e) => {
      e.preventDefault();
      props.history.push('/');
  }

    return (
        <div className="row center">
            <div className="form-container-contact">
            <form 
            className="form"
            onSubmit={submitHandler}
            >
              <div>
                <h1>Contact Me</h1>
              </div>   
                  <div>
                      <label htmlFor="name">Name</label>
                      <input 
                      id="name" 
                      type="text"
                      placeholder="Enter Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      ></input>
                  </div>
                  <div>
                      <label htmlFor="email">Email</label>
                      <input 
                      id="email" 
                      type="text"
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      ></input>
                  </div>
                  <div>
                      <label htmlFor="text">Your Message</label>
                      <textarea 
                      id="text" 
                      type="text"
                      rows="5"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      ></textarea>
                  </div>
                  <div>
                      <button
                      type="submit"
                      className="primary"
                      >
                        Contact Us
                      </button>
                  </div>
            </form>
        </div>
        </div>
    )
}
