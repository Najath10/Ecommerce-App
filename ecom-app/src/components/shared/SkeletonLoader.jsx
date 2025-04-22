import { Skeleton } from '@mui/material'
import React from 'react'

const SkeletonLoader = () => {
  return (
    <div className="flex flex-col gap-6 px-6 py-12 max-w-3xl mx-auto">
    <div className="grid sm:grid-cols-1 gap-4">
      {[...Array(2)].map((_, index) => (
        <div key={index} className="border p-4 rounded-md shadow-sm">
          <Skeleton variant="text" width="60%" height={25} />
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="90%" />
          <Skeleton variant="text" width="40%" />
        </div>
      ))}
    </div>
    </div>
  )
}

export default SkeletonLoader
