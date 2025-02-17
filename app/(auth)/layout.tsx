import React, { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='w-screen h-screen'>
    <div className=' w-full h-full flex items-center justify-center'>
      {children}
    </div>
    </div>
  );
};

export default Layout