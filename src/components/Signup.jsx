import React, {useRef, useState} from 'react'
import {Form, Button, Card, CardBody, FormGroup, Alert} from 'react-bootstrap'
import { UseAuth } from '../contexts/AuthContext'



export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const {Signup} = UseAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState('false')



  function handleSubmit(e) {
    e.preventDefault()

  if (passwordRef.current.value !== passwordConfirmRef.value) {
    return setError('password do not match')
  }

  try {
    setError('')
    setLoading(true)
    await Signup(emailRef.current.value, passwordRef.current.value)
    setLoading(false)
  } catch {
    setError('failed to create an account')
  }
 
}

return (
    <>
   <Card>
    <CardBody>
      <h2 className='text-center mb-4'>Sign Up</h2>
      {error && <Alert variant='danger'>{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <FormGroup id='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control type='email' ref={emailRef} required />
        </FormGroup>
        <FormGroup id='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' ref={passwordRef} required />
        </FormGroup>
        <FormGroup id='password-confirm'>
          <Form.Label>Password Confirmation</Form.Label>
          <Form.Control type='password' ref={passwordConfirmRef} required />
        </FormGroup>
        <Button disabled= {loading} className='w-100' type='submit'>Sign Up</Button>
      </Form>
    </CardBody>
   </Card>
   <div className='w-100 text-centre mt-2'>
    Already have an account? Log In 
   </div>
    </>
  )

  }
