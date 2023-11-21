'use client';
import Image from 'next/image'
import { useState } from 'react';
import { createServerContext } from 'react';
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import { useRouter } from 'next/navigation';
//@ts-ignore
global.performance = global.performance || {
  now: () => new Date().getTime(),
};


export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

 
  const userLoginData = async (e:any) => {
    try {
    e.preventDefault();
    
    const response = await axios.post('http://127.0.0.1:8080/login', {email, password });
    
    if(response.status == 200){
       
      localStorage.setItem('Token', response.data.Token);
      console.log(localStorage.getItem('Token'));
      console.log('Success!', response.data);
      router.push('/user');
    }
    else if(response.status == 401){
      //alert('User is incorrect !! Verify your email or passwords!!');
      console.log(response.data)
    }
    
  } 
  catch (error) {
    // Lógica para tratamento de erro
    console.log('Login Failure:', error);
  }
}

  return (
    <main>
    <div>
      <h1>Login - Edu</h1>
      <form onSubmit={userLoginData}>
        <label>Email:
          <input type="email" id='email' onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>Password:
          <input type="password" id='password' onChange={(e) => setPassword(e.target.value)}/>
        </label>
        <br />
        <button type="submit">Login</button>
        
      </form>
    </div>
    </main>
  )
}

