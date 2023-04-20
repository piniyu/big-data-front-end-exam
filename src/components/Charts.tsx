import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useRouteLoaderData } from 'react-router-dom'

type HouseholdDataType = {
  district_code: string
  household_business_f: string
  household_business_m: string
  household_business_total: string
  household_ordinary_f: string
  household_ordinary_m: string
  household_ordinary_total: string
  household_single_f: string
  household_single_m: string
  household_single_total: string
  site_id: string
  statistic_yyy: string
  village: string
}

export default function Carts() {
  const data = useRouteLoaderData('charData') as HouseholdDataType[]
  const householdOrdinaryMale = data.reduce(
    (a, b) => a + parseInt(b.household_ordinary_m, 10),
    0,
  )
  const householdOrdinaryFemale = data.reduce(
    (a, b) => a + parseInt(b.household_ordinary_f, 10),
    0,
  )
  const householdSingleMale = data.reduce(
    (a, b) => a + parseInt(b.household_single_f, 10),
    0,
  )
  const householdSingleFemale = data.reduce(
    (a, b) => a + parseInt(b.household_single_f, 10),
    0,
  )
  const householdOrdinary = householdOrdinaryMale + householdOrdinaryFemale
  const householdSingle = householdSingleMale + householdSingleFemale
  const total = householdOrdinary + householdSingle

  // TODO:solve accessibility warning
  const columnOptions: Highcharts.Options = {
    title: {
      text: '人口數統計',
    },
    xAxis: {
      categories: ['共同生活', '獨立生活'],
      title: {
        text: '型態',
        style: {
          fontWeight: 'bold',
        },
      },
    },
    yAxis: {
      title: {
        text: '數量',
        textAlign: 'left',
        align: 'high',
        rotation: 0,
        style: {
          fontWeight: 'bold',
        },
      },
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: [
      {
        type: 'column',
        name: '男',
        data: [householdOrdinaryMale, householdSingleMale],
        color: '#7863ad',
      },
      {
        type: 'column',
        name: '女',
        data: [householdOrdinaryFemale, householdSingleFemale],
        color: '#bca3f9',
      },
    ],
  }
  const pieOptions: Highcharts.Options = {
    title: {
      text: '戶數統計',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '{point.percentage:.1f}%',
        },
        showInLegend: true,
      },
    },

    series: [
      {
        type: 'pie',
        name: '戶數統計',
        data: [
          {
            name: '共同生活',
            y: householdOrdinary / total,
            color: '#636fad',
          },
          {
            name: '獨立生活',
            y: householdSingle / total,
            color: '#a4b2f9',
          },
        ],
      },
    ],
  }
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={columnOptions} />
      <HighchartsReact highcharts={Highcharts} options={pieOptions} />
    </div>
  )
}
