import { DropdownIndicatorProps, components } from 'react-select'
import { SelectValue } from '../FormType'
import { ReactComponent as DropDownIcon } from '../../assets/arrow_drop_down.svg'

export default function DropdownIndicator(
  props: DropdownIndicatorProps<SelectValue>,
) {
  return (
    <components.DropdownIndicator {...props}>
      <DropDownIcon />
    </components.DropdownIndicator>
  )
}
