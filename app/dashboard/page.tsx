import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export default async function DashboardPage() {
  const supabase = await createClient()
  
  // Retrieve the securely stored session cookie
  const { data: { user }, error } = await supabase.auth.getUser()

  // Kick unauthorized users back to the login screen
  if (error || !user) {
    redirect('/login')
  }

  // Server action to destroy the session cookie
  async function signOut() {
    'use server'
    const supabaseClient = await createClient()
    await supabaseClient.auth.signOut()
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-sm border flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">GVI CRM Portal</h1>
          <p className="text-gray-600">
            Logged in as: <span className="font-medium text-gray-900">{user.email}</span>
          </p>
        </div>
        
        <form action={signOut}>
          <button 
            type="submit" 
            className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-md font-medium transition"
          >
            Sign Out
          </button>
        </form>
      </div>
    </div>
  )
}