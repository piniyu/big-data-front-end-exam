import { ClearIndicatorProps, components } from 'react-select'
import { SelectValue } from '../FormType'
import { ReactComponent as CrossIcon } from '../../assets/cross.svg'

export default function ClearIndicator(
  props: ClearIndicatorProps<SelectValue>,
) {
  return (
    <components.ClearIndicator {...props}>
      <CrossIcon />
    </components.ClearIndicator>
  )
}
