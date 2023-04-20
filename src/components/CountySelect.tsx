import { Controller, useFormContext } from 'react-hook-form'
import Select from 'react-select'
import { useRouteLoaderData } from 'react-router-dom'
import axios from 'axios'
import { FormProps } from './FormType'
import xmlParser from '../utils/xmlParser'

type CountyItemType = {
  countycode: string
  countycode01: number
  countyname: string
}[]

let countyDataCache: CountyItemType | null

export async function countyLoader() {
  if (countyDataCache) {
    return countyDataCache
  }
  return axios.get(`https://api.nlsc.gov.tw/other/ListCounty`).then(res => {
    const jObj = xmlParser.parse(res.data) as {
      '?xml': string
      countyItems: {
        countyItem: {
          countycode: string
          countycode01: number
          countyname: string
        }[]
      }
    }
    countyDataCache = jObj.countyItems.countyItem
    return jObj.countyItems.countyItem
  })
}

export default function CountySelect() {
  const { control, setValue } = useFormContext<FormProps>()
  const counties = useRouteLoaderData('root') as Awaited<
    ReturnType<typeof countyLoader>
  >
  return (
    <Controller
      name="county"
      control={control}
      rules={{ required: true }}
      render={({ field }) => (
        <Select
          {...field}
          name="county"
          options={counties.map(e => ({
            label: e.countyname,
            value: e.countycode01.toString(),
          }))}
          onChange={v => {
            field.onChange(v)
            setValue('town', null)
          }}
          placeholder="請選擇 縣/市"
          components={{ IndicatorSeparator: undefined }}
        />
      )}
    />
  )
}
