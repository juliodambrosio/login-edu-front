'use client';
import Image from 'next/image'
import { useState } from 'react';
import { createServerContext } from 'react';
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import { useRouter } from 'next/router';


export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userLoginData = async (e:any) => {
    try {
    e.preventDefault();
    
    const response = await axios.post('http://127.0.0.1:8080/login', {email, password });
    
    if(response.status == 200){
       // Lógica para tratamento de sucesso
      console.log('Login bem-sucedido!', response.data);
    }
    else{
      console.log(response.data)
    }
    
  } 
  catch (error) {
    // Lógica para tratamento de erro
    console.log('Falha no login:', error);
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

