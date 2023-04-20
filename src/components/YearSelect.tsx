import { Controller, useFormContext } from 'react-hook-form'
import Select from 'react-select'
import { FormProps } from './FormType'

const YEARS = ['111', '110', '109', '108', '107', '106']

export default function CountySelect() {
  const { control } = useFormContext<FormProps>()

  return (
    <Controller
      name="year"
      control={control}
      rules={{ required: true }}
      render={({ field }) => (
        <Select
          {...field}
          options={YEARS.map(y => ({ label: y, value: y }))}
          placeholder="請選擇"
          components={{ IndicatorSeparator: undefined }}
        />
      )}
    />
  )
}
