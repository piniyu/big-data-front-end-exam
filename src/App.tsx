// import logo from './logo.svg';
import Select from 'react-select'
import classes from './App.module.css'

function App() {
  return (
    <div>
      <nav className={classes.Nav}>LOGO</nav>
      <span className={classes.Brand}>TAIWAN</span>
      <main className={classes.Main}>
        <header className={classes.Header}>人口數、戶數按戶別及性別統計</header>
        <form>
          <Select
            placeholder="請選擇"
            components={{ IndicatorSeparator: undefined }}
          />
          <input type="text" />
        </form>
        <div>chart</div>
      </main>
    </div>
  )
}

export default App
