import React from 'react'
import { useParams } from 'react-router-dom'
import classes from './App.module.css'
import Carts from './components/Charts'
import Form from './components/Form'
import { ReactComponent as Settings } from './settings.svg'

function App() {
  const params = useParams()
  return (
    // <div>
    <>
      <header className={classes.Nav}>
        LOGO
        <button className={classes.Settings} type="button">
          <Settings />
        </button>
      </header>
      <span className={classes.Brand}>TAIWAN</span>
      <div className={classes.Container}>
        <main className={classes.Main}>
          <h1>人口數、戶數按戶別及性別統計</h1>
          <Form />
          <div className={classes.DividerContainer}>
            <span className={classes.DividerText}>搜尋結果</span>
          </div>
          {params.year && params.county && params.town ? (
            <>
              <h1>
                {params.year}年 {params.county} {params.town}
              </h1>
              <Carts />
            </>
          ) : null}
        </main>
      </div>
    </>

    // </div>
  )
}

export default App
