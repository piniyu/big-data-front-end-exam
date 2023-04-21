import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useAsyncValue } from 'react-router-dom'
import classes from './Charts.module.css'

export type HouseholdDataType = {
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
  const data = useAsyncValue() as HouseholdDataType[]

  let householdOrdinaryMale = 0
  let householdOrdinaryFemale = 0
  let householdSingleMale = 0
  let householdSingleFemale = 0
  let householdOrdinary = 0
  let householdSingle = 0

  data?.forEach(e => {
    householdOrdinaryMale += parseInt(e.household_ordinary_m, 10)
    householdOrdinaryFemale += parseInt(e.household_ordinary_f, 10)
    householdSingleMale += parseInt(e.household_single_m, 10)
    householdSingleFemale += parseInt(e.household_single_f, 10)
    householdOrdinary += parseInt(e.household_ordinary_total, 10)
    householdSingle += parseInt(e.household_single_total, 10)
  })

  const total = householdOrdinary + householdSingle

  // TODO:solve accessibility warning
  const columnOptions: Highcharts.Options = {
    title: {
      text: '人口數統計',
      style: {
        fontSize: '24px',
        fontWeight: 'bold',
      },
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
          fontSize: '18px',
          color: 'black',
        },
        x: 12,
        y: -24,
      },
      labels: {
        reserveSpace: true,
      },
      tickAmount: 9,
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
    chart: {
      height: '60%',
      backgroundColor: 'transparent',
      marginTop: 100,
      spacingBottom: 0,
      marginLeft: 40,
    },
    credits: {
      enabled: false,
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            yAxis: {
              tickAmount: 5,
            },
            chart: {
              marginLeft: 40,
              height: '110%',
            },
          },
        },
      ],
    },
  }
  const pieOptions: Highcharts.Options = {
    title: {
      text: '戶數統計',
      style: {
        fontSize: '24px',
        fontWeight: 'bold',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '{point.percentage:.2f} %',
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
            y: Math.round((householdOrdinary / total) * 10000) / 100,
            color: '#636fad',
          },
          {
            name: '獨立生活',
            y: Math.round((householdSingle / total) * 10000) / 100,
            color: '#a4b2f9',
          },
        ],
      },
    ],
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    chart: {
      height: '60%',
      backgroundColor: 'transparent',
      marginTop: 60,
    },
    credits: {
      enabled: false,
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            chart: {
              height: '100%',
            },
          },
        },
      ],
    },
  }
  return (
    <>
      <div className={classes.Countainer}>
        <HighchartsReact highcharts={Highcharts} options={columnOptions} />
      </div>
      <div className={classes.Countainer}>
        <HighchartsReact highcharts={Highcharts} options={pieOptions} />
      </div>
    </>
  )
}
