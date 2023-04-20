import { ClearIndicatorProps, components } from 'react-select'
import { SelectValue } from '../FormType'
import { ReactComponent as CrossIcon } from '../../cross.svg'
import classes from './Select.module.css'

export default function ClearIndicator(
  props: ClearIndicatorProps<SelectValue>,
) {
  return (
    <components.ClearIndicator {...props}>
      <CrossIcon />
    </components.ClearIndicator>
  )
}
