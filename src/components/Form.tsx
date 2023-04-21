import { useNavigate, useParams, useRouteLoaderData } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import classes from './Form.module.css'
import CountySelect, { countyLoader } from './selectInputs/CountySelect'
import { FormProps } from './FormType'
import YearSelect from './selectInputs/YearSelect'
import TownSelect from './selectInputs/TownSelect'

export default function Form() {
  const param = useParams()
  const navigate = useNavigate()

  const counties = useRouteLoaderData('root') as Awaited<
    ReturnType<typeof countyLoader>
  >
  const methods = useForm<FormProps>({
    defaultValues: {
      year: param.year ? { label: param.year, value: param.year } : null,
      county: param.county
        ? {
            label: param.county,
            value: counties
              .find(e => e.countyname === param.county)
              ?.countycode01.toString(),
          }
        : null,
      town: param.town ? { label: param.town, value: '' } : null,
    },
  })

  const {
    handleSubmit,
    formState: { errors, isValid },
  } = methods

  const onSubmit = (v: FormProps) => {
    const year = v.year?.value ?? ''
    const county = v.county?.label ?? ''
    const town = v.town?.label ?? ''
    navigate(`/${year}/${county}/${town}`)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.Form}>
        <YearSelect />
        <CountySelect />
        <TownSelect />
        <button className="primaryButton" type="submit" disabled={!isValid}>
          SUBMIT
        </button>
      </form>
      {errors.year || errors.town || errors.county ? (
        <div className={classes.Error}>必選項目</div>
      ) : null}
    </FormProvider>
  )
}
