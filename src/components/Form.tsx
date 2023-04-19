import { useNavigate, useParams } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import classes from './form.module.css'
import CountySelect from './CountySelect'
import { FormProps } from './FormType'
import YearSelect from './YearSelect'
import TownSelect from './TownSelect'

export default function Form() {
  const param = useParams()

  const navigate = useNavigate()

  const methods = useForm<FormProps>({
    defaultValues: {
      year: param.year ? { label: param.year, value: param.year } : null,
      county: param.county
        ? { label: param.county, value: param.county }
        : null,
      town: param.town ? { label: param.town, value: param.town } : null,
    },
  })

  const onSubmit = (v: FormProps) => {
    const year = v.year?.value ?? ''
    const county = v.county?.label ?? ''
    const town = v.town?.label ?? ''
    navigate(`/${year}/${county}/${town}`)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <YearSelect />
        <CountySelect />
        <TownSelect />
        <button className={classes.BUTTON} type="submit">
          SUBMIT
        </button>
      </form>
    </FormProvider>
  )
}
