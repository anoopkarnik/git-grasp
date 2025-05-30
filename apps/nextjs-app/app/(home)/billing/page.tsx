import React, { Suspense } from 'react'
import { Skeleton } from '@repo/ui/molecules/shadcn/skeleton'

import CreditsPurchase from '@repo/payments/components/organisms/CreditsPurchase/v2'
import { BalanceCard } from '@repo/payments/components/organisms/BalanceCard/v1'
import { TransactionHistoryCard } from '@repo/payments/components/organisms/TransactionHistoryCard/v1'

const BillingPage = () => {
  return (
    <div className='mx-auto p-4 space-y-8 w-full'>
      <h1 className='text-3xl font-bold'>Billing</h1>
      <Suspense fallback={<Skeleton className='h-[166px] w-full'/>}>
        <BalanceCard />
      </Suspense>
      <CreditsPurchase/>
      <Suspense fallback={<Skeleton className='h-[300px] w-full'/>}>
        <TransactionHistoryCard/>
      </Suspense>
    </div>
  )
}



export default BillingPage

