"use client"

import React from 'react'
import {  useGlobalData } from '../../context/DataContext';
import Support from '@repo/ui/organisms/support/Support/v1';

const Layout= ({ children }: { children: React.ReactNode }) => {
  const data = useGlobalData(); // Use global data

  return (
    <div className='relative w-full'>
      {children}
      <Support heroSection={data.heroSectionState} footerSection={data.footerSectionState} 
      navbarSection={data.navbarSectionState}/>
    </div>
  );
};

export default Layout;