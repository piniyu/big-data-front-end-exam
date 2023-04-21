import { ThemeConfig } from 'react-select'

const selectTheme: ThemeConfig = theme => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: 'var(--primary)',
    primary25: 'rgba(0,0,0,0.12)',
  },
})

export default selectTheme
