import { Outlet } from 'react-router-dom'
import classes from './App.module.css'
import { ReactComponent as Settings } from './assets/settings.svg'

function App() {
  return (
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

          <Outlet />
        </main>
      </div>
    </>
  )
}

export default App
