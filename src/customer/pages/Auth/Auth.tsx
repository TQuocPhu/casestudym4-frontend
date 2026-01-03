import React, { useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import { Button } from '@mui/material'

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className='flex justify-center h-[90vh] items-center'>
      <div className="max-w-md h-[85vh] rounded-md shadow-lg">

        <img
          className='w-full rounded-t-md'
          src="https://picx.zhimg.com/v2-73ebc138be4d6dfcf2cab643b343f306_720w.jpg?source=172ae18b" alt="" />

        <div className='mt-5 px-10'>
          {isLogin ? <LoginForm /> : <RegisterForm />}

          <div className='flex items-center gap-1 justify-center mt-5'>
            <p>{isLogin && "DON'T"} HAVE ACCOUNT ?</p>
            <Button size='small'
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "CREATE ACCOUNT" : "LOGIN"}
            </Button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Auth
