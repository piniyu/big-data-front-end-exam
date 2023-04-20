import { Controller, useFormContext } from 'react-hook-form'
import Select from 'react-select'
import { FormProps } from '../FormType'
import DropdownIndicator from './DropdownIndicator'
import ClearIndicator from './ClearIndicator'
import selectStyles from './selectStyles'
import selectTheme from './selectTheme'
import classes from './Select.module.css'

const YEARS = ['111', '110', '109', '108', '107', '106']

export default function CountySelect() {
  const { control } = useFormContext<FormProps>()

  return (
    <Controller
      name="year"
      control={control}
      rules={{ required: true }}
      render={({ field }) => (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label className={classes.Label}>
          <span className={classes.LabelText}>年份</span>
          <Select
            {...field}
            options={YEARS.map(y => ({ label: y, value: y }))}
            placeholder="請選擇"
            components={{
              IndicatorSeparator: undefined,
              DropdownIndicator,
              ClearIndicator,
            }}
            styles={selectStyles}
            theme={selectTheme}
          />
        </label>
      )}
    />
  )
}
