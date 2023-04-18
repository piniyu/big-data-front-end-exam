import { XMLParser } from 'fast-xml-parser'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import classes from './form.module.css'

type SelectValue = { label: string; value: string }

const YEARS = [111, 110, 109, 108, 107, 106]
const YEARS_OPTIONS = YEARS.map(y => ({ label: y, value: y }))
// const defaultYear = YEARS[0]
// const COUNTIES = [
//   '基隆市',
//   '台北市',
//   '新北市',
//   '桃園縣',
//   '新竹市',
//   '新竹縣',
//   '苗栗縣',
//   '台中市',
//   '彰化縣',
//   '南投縣',
//   '雲林縣',
//   '嘉義市',
//   '嘉義縣',
//   '台南市',
//   '高雄市',
//   '屏東縣',
//   '台東縣',
//   '花蓮縣',
//   '宜蘭縣',
//   '澎湖縣',
//   '金門縣',
//   '連江縣',
// ]
// const COUNTIES_OPTIONS = COUNTIES.map(c => ({ label: c, value: c }))

const xmlParser = new XMLParser()

export default function Form() {
  const [year, setYear] = useState<number | undefined>(undefined)
  const [county, setCounty] = useState<string | undefined>(undefined)
  const [countyCode, setCountyCode] = useState<string | undefined>(undefined)
  const [counties, setCounties] = useState<
    | {
        countycode: string
        countycode01: number
        countyname: string
      }[]
    | undefined
  >(undefined)
  const [towns, setTowns] = useState<
    | {
        towncode: string
        towncode01: string
        townname: string
      }[]
    | undefined
  >(undefined)
  const [town, setTown] = useState<SelectValue | undefined | null>(undefined)

  useEffect(() => {
    if (!year || !county || !town) {
      return () => {}
    }
    const controller = new AbortController()
    axios
      .get(
        `https://www.ris.gov.tw/rs-opendata/api/v1/datastore/ODRP019/${year}`,
        {
          params: {
            COUNTY: county,
            TOWN: town,
          },
          signal: controller.signal,
        },
      )
      .then(response => console.log(response))
    return () => {
      controller.abort()
    }
  }, [year, county, town])
  useEffect(() => {
    // if (!county) return () => { }
    const controller = new AbortController()
    axios
      .get<string>(`https://api.nlsc.gov.tw/other/ListCounty`, {
        signal: controller.signal,
      })
      .then(response => {
        const jObj = xmlParser.parse(response.data) as {
          '?xml': string
          countyItems: {
            countyItem: {
              countycode: string
              countycode01: number
              countyname: string
            }[]
          }
        }
        setCounties(jObj.countyItems.countyItem)

        console.log(jObj)
      })
    return () => {
      controller.abort()
    }
  }, [])
  useEffect(() => {
    if (!countyCode) return () => {}
    const controller = new AbortController()
    axios
      .get(`https://api.nlsc.gov.tw/other/ListTown1/${countyCode}`, {
        signal: controller.signal,
      })
      .then(response => {
        setTowns(response.data)
        console.log(response.data)
      })
    return () => {
      controller.abort()
    }
  }, [countyCode])

  return (
    <form>
      <Select
        name="year"
        defaultValue={undefined}
        options={YEARS_OPTIONS}
        onChange={v => {
          setYear(v?.value)
        }}
        placeholder="請選擇"
        components={{ IndicatorSeparator: undefined }}
      />
      <Select
        name="county"
        defaultValue={undefined}
        options={
          counties
            ? counties?.map(d => ({
                label: d.countyname,
                value: d.countycode,
              }))
            : undefined
        }
        onChange={v => {
          setCounty(v?.label)
          setCountyCode(v?.value)
          setTown(null)
        }}
        placeholder="請選擇 縣/市"
        components={{ IndicatorSeparator: undefined }}
      />
      <Select
        name="town"
        defaultValue={undefined}
        value={town}
        options={
          towns
            ? towns?.map(d => ({
                label: d.townname,
                value: d.towncode,
              }))
            : undefined
        }
        onChange={v => {
          setTown(v ?? undefined)
        }}
        placeholder="請先選擇 縣/市"
        components={{ IndicatorSeparator: undefined }}
      />
      <button className={classes.BUTTON} type="submit">
        SUBMIT
      </button>
    </form>
  )
}
