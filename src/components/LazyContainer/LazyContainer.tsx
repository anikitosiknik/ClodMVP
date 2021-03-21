import React, { Suspense } from 'react'
import Roller from '../Roller/Roller'

export default function LazyContainer ({children} : {children: JSX.Element}) {
    return <Suspense fallback={<Roller />}>
        {children}
    </Suspense>
}
