import { Link, useRouteError } from 'react-router-dom'
import classes from './ErrorPage.module.css'

export default function ErrorPage() {
  const err = useRouteError()
  console.error(err)
  return (
    <div className={classes.Container}>
      <h1>Something went wrong!</h1>
      <Link to="/" replace className="primaryButton">
        回首頁
      </Link>
    </div>
  )
}
