import { render, screen } from '@testing-library/react'
import App from './App'

// test("renders learn react link", () => {
//   render(<App />)
//   const linkElement = screen.getByText(/learn react/i)
//   expect(linkElement).toBeInTheDocument()
// })
test('renders header', () => {
  render(<App />)
  const headerElement = screen.getByText(/人口數、戶數按戶別及性別統計/i)

  expect(headerElement).toBeInTheDocument()
})
