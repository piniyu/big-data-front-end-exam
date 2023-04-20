import { Controller, useFormContext } from 'react-hook-form'
import Select from 'react-select'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { XMLParser } from 'fast-xml-parser'
import {
  LoaderFunction,
  LoaderFunctionArgs,
  useLoaderData,
  useLocation,
  useParams,
  useRouteLoaderData,
} from 'react-router-dom'
import { FormProps } from './FormType'

const xmlParser = new XMLParser()

type TownItemType = {
  towncode: string
  towncode01: number
  townname: string
}[]

type TownApiParsedXmlType = {
  '?xml': string
  townItems: {
    townItem: TownItemType
  }
}
// type TownApiDataType =
//   | {
//       towncode: string
//       towncode01: string
//       townname: string
//     }[]
//   | string

// export async function townLoader(county: string) {
//   return axios
//     .get(`https://api.nlsc.gov.tw/other/ListTown1/${county}`)
//     .then(res => {
//       console.log(res.data)
//       let data
//       if (typeof res.data === 'string') {
//         const jObj = xmlParser.parse(res.data) as TownApiParsedXmlType
//         data = jObj.townItems.townItem
//       } else {
//         data = res.data as TownItemType
//       }
//       return data
//     })
// }
// export async function townLoader({ params }: LoaderFunctionArgs) {
//   return axios
//     .get(`https://api.nlsc.gov.tw/other/ListTown1/${params.county}`)
//     .then(res => {
//       console.log(res.data)
//       let data
//       if (typeof res.data === 'string') {
//         const jObj = xmlParser.parse(res.data) as TownApiParsedXmlType
//         data = jObj.townItems.townItem
//       } else {
//         data = res.data as TownItemType
//       }
//       return data
//     })
// }

const getData = async (
  countyValue: string,
  signal: AbortSignal,
  callback?: (data: TownItemType) => void,
) => {
  await axios
    .get(`https://api.nlsc.gov.tw/other/ListTown1/${countyValue}`, {
      signal,
    })
    .then(res => {
      let data
      if (typeof res.data === 'string') {
        const jObj = xmlParser.parse(res.data) as TownApiParsedXmlType
        data = jObj.townItems.townItem
      } else {
        data = res.data as TownItemType
      }
      if (callback) {
        callback(data)
      }
    })
}

export default function CountySelect() {
  const [towns, setTowns] = useState<TownItemType | undefined>(undefined)
  const { control, watch, getValues, setValue } = useFormContext<FormProps>()

  const location = useLocation()

  // TODO:need optimizing

  useEffect(() => {
    const county = getValues('county.value')
    if (!county) {
      return () => {}
    }
    const controller = new AbortController()

    getData(county, controller.signal, data => setTowns(data))

    return () => {
      controller.abort()
    }
  }, [getValues, location.pathname])

  /** fetch when county input value change */
  useEffect(() => {
    const controller = new AbortController()

    const formWatch = watch(v => {
      if (!v.county?.value) {
        return
      }
      getData(v.county.value, controller.signal, data => setTowns(data))
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
      rules={{ required: true }}
      render={({ field }) => (
        <Select
          {...field}
          options={towns?.map(e => ({
            label: e.townname,
            value: e.towncode01.toString(),
          }))}
          isDisabled={!getValues('county')}
          placeholder="請先選擇 縣/市"
          components={{ IndicatorSeparator: undefined }}
        />
      )}
    />
  )
}
