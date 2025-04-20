
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()


    if (!email.includes('@')) {
      setMessage('Invalid email')
      return
    }

    const strongPwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    if (!strongPwd.test(password)) {
      setMessage('Password must be strong')
      return
    }

  
    const stored = localStorage.getItem('dummyUser')
    const dummyUser = stored
      ? JSON.parse(stored)
      : { email: 'tutor@rmit.edu.au', password: 'Strong123' }


    if (email === dummyUser.email && password === dummyUser.password) {
      setMessage('Login successful!')
      setTimeout(() => navigate('/tutors'), 500)
    } else {
      setMessage('Invalid credentials')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Sign In</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded mb-2">
        Login
      </button>

      {message && <p className="text-center text-red-500">{message}</p>}
    </form>
  )
}
