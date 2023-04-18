// import logo from './logo.svg';
// import { useEffect } from 'react'
import classes from './App.module.css'
import Form from './components/form'

function App() {
  return (
    <div>
      <nav className={classes.Nav}>LOGO</nav>
      <span className={classes.Brand}>TAIWAN</span>
      <main className={classes.Main}>
        <header className={classes.Header}>人口數、戶數按戶別及性別統計</header>
        <Form />
        <div>chart</div>
      </main>
    </div>
  )
}

export default App
