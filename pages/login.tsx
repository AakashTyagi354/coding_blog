import React from 'react'
import {useSession,signIn} from 'next-auth/react'

const login = () => {
    const session = useSession();
    console.log(session)
    if(session.data === null){
      return <button onClick={signIn}>Login</button>
    }
  
  return (
    <div>
        <h1>auth</h1>
    </div>
  )
}

export default login