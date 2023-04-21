import { Outlet } from 'react-router-dom'
import classes from './FormPage.module.css'
import Form from '../components/Form'

export default function FormPage() {
  return (
    <>
      <Form />
      <div className={classes.DividerContainer}>
        <span className={classes.DividerText}>搜尋結果</span>
      </div>
      <Outlet />
    </>
  )
}
