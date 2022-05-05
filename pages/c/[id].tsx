import { useRouter } from 'next/router'
import React from 'react'

function Community() {
  const {
    query: { id },
  } = useRouter()
  // let {pid} = router.query
  console.log(id)
  return <div className="flex text-6xl text-white md:pl-20">pid: {id}</div>
}

export default Community
