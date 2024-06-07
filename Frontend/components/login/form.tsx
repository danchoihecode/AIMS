'use client'

import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export const Form = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [role, setRole] = useState('admin')


  const onSubmit = async (e: React.FormEvent) => {
    /*
    e.preventDefault()
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
        callbackUrl
      })
      console.log('Res', res)
      if (!res?.error) {
        router.push(callbackUrl)
      } else {
        setError('Invalid email or password')
      }
    } catch (err: any) {}
 */e.preventDefault()
 try {
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
      role // Include the selected role
    })
    console.log('Res', res)
    if (!res?.error) {
      // Redirect based on the selected role
      switch (role) {
        case 'admin':
          router.push('/admin')
          break
        case 'product_manager':
          router.push('/manager')
          break
        default:
          router.push('/login')
      }
    } else {
      setError('Invalid email or password')
    }
  } catch (err: any) {
    setError('An error occurred during sign-in')
  } 
    }

  return (
    <form onSubmit={onSubmit} className="space-y-12 w-full sm:w-[400px]">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          className="w-full"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          type="email"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          className="w-full"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          type="password"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="role">Role</Label>
        <select
          id="role"
          className="w-full p-2 border rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="product_manager">Product Manager</option>
        </select>
      </div>
      {error && <Alert>{error}</Alert>}
      <div className="w-full">
        <Button className="w-full" size="lg">
          Login
        </Button>
      </div>
    </form>
  )
}