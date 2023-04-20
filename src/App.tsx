import { useParams } from 'react-router-dom'
import classes from './App.module.css'
import Carts from './components/Charts'
import Form from './components/Form'

function App() {
  const params = useParams()
  return (
    <div>
      <nav className={classes.Nav}>LOGO</nav>
      <span className={classes.Brand}>TAIWAN</span>
      <main className={classes.Main}>
        <header>
          <h1>人口數、戶數按戶別及性別統計</h1>
        </header>
        <Form />
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
  )
}

export default App
