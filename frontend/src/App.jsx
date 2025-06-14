import React from 'react'
import AuthPage from './components/Auth'
import { ThemeProvider } from "@/components/theme-provider"
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import Contact from './components/Contact'

const App = () => {
  return (
    <div className='w-full min-h-screen'>
       <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    
    <Routes>
      <Route path='*' element={<Home/>}></Route>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/auth' element={<AuthPage/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
      <Route path='/contact' element={<Contact/>}></Route>
    </Routes>
    </ThemeProvider>
    </div>
  )
}

export default App
