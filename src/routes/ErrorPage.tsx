import { Link, useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  const err = useRouteError()
  console.error(err)
  return (
    <div>
      {/* <h2>{err}</h2> */}
      <Link to="/" replace>
        回首頁
      </Link>
    </div>
  )
}
