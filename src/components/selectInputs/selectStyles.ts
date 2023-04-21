import { GroupBase, StylesConfig } from 'react-select'
import { SelectValue } from '../FormType'

const selectStyles: StylesConfig<
  SelectValue,
  boolean,
  GroupBase<SelectValue>
> = {
  control: (styles, { isDisabled }) => ({
    ...styles,
    minHeight: '40px',
    borderColor: '#b6b6b6',
    background: isDisabled ? 'white' : 'white',
  }),
  valueContainer: styles => ({
    ...styles,
    paddingTop: '4px',
    paddingLeft: '12px',
    paddingRight: '0',
  }),
  menu: styles => ({
    ...styles,
    boxShadow: '0 4px 4px #00000025',
  }),
  dropdownIndicator: (styles, { isDisabled }) => ({
    ...styles,
    fill: isDisabled ? '#79797935' : '#797979',
  }),
  placeholder: styles => ({
    ...styles,
    color: '#b6b6b6',
  }),
}

export default selectStyles
