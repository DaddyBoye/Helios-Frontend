import { useState } from 'react';
import { Link } from 'react-router-dom';
import React from 'react';
import { supabase } from '../client';

const SignUp = () => {

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  console.log(formData);

  // Add type for the event
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      };
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()

    try {
      const { error } = await supabase.auth.signUp(
        {
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName,
            }
          }
        }
      )
      if (error) throw error
      alert('Check your email for verification link')

      
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className='text-black'>
      <form className='flex flex-col' onSubmit={handleSubmit}>
        <input
          placeholder='Fullname'
          name='fullName'
          onChange={handleChange}
        />

        <input
          placeholder='Email'
          name='email'
          onChange={handleChange}
        />

        <input
          placeholder='Password'
          name='password'
          type="password"
          onChange={handleChange}
        />

        <button type='submit'>
          Submit
        </button>
      </form>

      Already have an account? <Link to='/'>Login</Link>
    </div>
  );
}

export default SignUp;
