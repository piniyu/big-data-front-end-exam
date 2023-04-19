import { Controller, useFormContext } from 'react-hook-form'
import Select from 'react-select'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { FormProps } from './FormType'

export default function CountySelect() {
  const [towns, setTowns] = useState<
    | {
        towncode: string
        towncode01: string
        townname: string
      }[]
    | undefined
  >(undefined)
  const { control, watch } = useFormContext<FormProps>()

  // TODO:need optimizing
  useEffect(() => {
    const controller = new AbortController()
    const formWatch = watch(v => {
      if (!v.county?.value) {
        return
      }

      axios
        .get(`https://api.nlsc.gov.tw/other/ListTown1/${v.county.value}`, {
          signal: controller.signal,
        })
        .then(res => {
          const data = res.data as {
            towncode: string
            towncode01: string
            townname: string
          }[]
          setTowns(data)
        })
    })
    return () => {
      controller.abort()
      formWatch.unsubscribe()
    }
  }, [watch])

  return (
    <Controller
      name="town"
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          options={towns?.map(e => ({
            label: e.townname,
            value: e.towncode01.toString(),
          }))}
          placeholder="請先選擇 縣/市"
          components={{ IndicatorSeparator: undefined }}
        />
      )}
    />
  )
}
