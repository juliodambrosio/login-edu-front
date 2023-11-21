'use client';
import axios from 'axios';
import { error } from 'console';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Users() {
    const router = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const allUsersData = async function () {
        try {
            const userDataResponse = await axios.get('http://127.0.0.1:8080/search');
            if (userDataResponse.status == 200) {
                console.log('Loading users data !')
                return userDataResponse;
            }
        } catch (error) {
            console.log('Error: ' + error);
        }
    }

    const addNewUserData = async (e: any) => {
        try {
            e.preventDefault();
            const response = await axios.post('http://127.0.0.1:8080/add', { name, email, password });

            if (response.status == 200) {
                console.log('Great! User has added!', response.data);

            }
            else {
                throw new Error('Verify your data and try again!');
            }


        } catch (error) {
            console.log('Error: ' + error);
        }
    }

    useEffect(() => {
        const req = axios.get('http://127.0.0.1:8080/token', {
            headers: {
                Authorization: localStorage.getItem('Token')
            }
        }).then(response => {
            console.log('Token is valid!');
        }).catch(error => {
            console.log('Error: ' + error);
            router.push('/');
        })



    }, []);
    return (
        <main>
            <h1>Add Users</h1>
            <form onSubmit={addNewUserData}>
                <label>Name:
                    <input type="name" id='name' onChange={(e) => setName(e.target.value)} />
                </label>
                <br />
                <label>Email:
                    <input type="email" id='email' onChange={(e) => setEmail(e.target.value)} />
                </label>
                <br />
                <label>Password:
                    <input type="password" id='password' onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <button type="submit">Add User</button>
            </form>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                </tr>

               
            </table>
        </main>
    )

}