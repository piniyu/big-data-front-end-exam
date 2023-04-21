import React from 'react'
import { Await, useLoaderData, useParams } from 'react-router-dom'
import Carts, { HouseholdDataType } from '../components/Charts'

export default function ChartsPage() {
  const params = useParams()
  const data = useLoaderData() as {
    householdData: HouseholdDataType[]
  }
  return (
    <>
      <h1>
        {params.year}年 {params.county} {params.town}
      </h1>
      <React.Suspense fallback={<p>Loading...</p>}>
        <Await resolve={data.householdData} errorElement={<p>未找到資料!</p>}>
          <Carts />
        </Await>
      </React.Suspense>
    </>
  )
}
