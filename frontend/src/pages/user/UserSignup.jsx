import React from 'react'

const UserSignup = () => {
  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-purple-100">
      <div className="border rounded-md bg-purple-50 mx-80 py-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">Sign Up</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label className="block text-md font-medium leading-6 text-gray-900">First Name</label>
              <div className="mt-2">
                <input type="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div>
              <label className="block text-md font-medium leading-6 text-gray-900">Last Name</label>
              <div className="mt-2">
                <input type="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div>
              <label className="block text-md font-medium leading-6 text-gray-900">Username</label>
              <div className="mt-2">
                <input type="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-md font-medium leading-6 text-gray-900">Email address</label>
              <div className="mt-2">
                <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-md font-medium leading-6 text-gray-900">Password</label>
              </div>
              <div className="mt-2">
                <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div className='flex w-full justify-center'>
              <button type="submit" className=" rounded-md bg-purple-800 px-5 py-2 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-purple-900">Sign Up</button>
            </div>
          </form>

          <p className="mt-10 text-center text-md text-gray-500">
            Already a member?
            <a href="/user/signin" className="font-semibold ml-2 leading-6 text-indigo-600 hover:text-indigo-500">Signin</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserSignup
