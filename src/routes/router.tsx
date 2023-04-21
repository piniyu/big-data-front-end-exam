import { RouteObject, createBrowserRouter, defer } from 'react-router-dom'
import axios from 'axios'
import App from '../App'
import ErrorPage from './ErrorPage'
import { countyLoader } from '../components/selectInputs/CountySelect'
import ChartsPage from './ChartsPage'
import FormPage from './FormPage'

const routerObjectArr: RouteObject[] = [
  {
    path: '/',
    id: 'root',
    element: <App />,
    errorElement: <ErrorPage />,
    loader: countyLoader,
    children: [
      {
        element: <FormPage />,
        children: [
          {
            path: '/:year/:county/:town',
            element: <ChartsPage />,
            loader: async ({ params }) => {
              return defer({
                householdData: axios
                  .get(
                    `https://www.ris.gov.tw/rs-opendata/api/v1/datastore/ODRP019/${params.year}`,
                    {
                      params: {
                        COUNTY: params.county,
                        TOWN: params.town,
                      },
                    },
                  )
                  .then(response => {
                    return response.data.responseData
                  }),
              })
            },
          },
        ],
      },
    ],
  },
]

const router = createBrowserRouter(routerObjectArr)
export default router
