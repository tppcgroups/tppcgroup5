import Image from 'next/image'
import React from 'react'

const Accessibility = () => {
  return (
    <div className='fixed bottom-5 right-5 shadow-2xl w-10 h-10 rounded-full bg-white/95 z-100'>
        <Image src="/images/accessibility.png" alt="Accessibility Icon" width={40} height={40} className='p-2'/>
    </div>
  )
}

export default Accessibility
