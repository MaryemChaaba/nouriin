'use client'
import React from 'react'

const ErrorBoundanry = ({error,reset}) => {
  return (
    <div className='flex items-center justify-center h-screen flex-col gap-5'>
        {error.message}
      error-----------------
      <button onClick={reset}>Reset</button>
    </div>
  )
}

export default ErrorBoundanry
