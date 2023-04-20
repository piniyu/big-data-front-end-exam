import { RouteObject, createBrowserRouter } from 'react-router-dom'
import axios from 'axios'
import App from '../App'
import ErrorPage from './ErrorPage'
import { countyLoader } from '../components/CountySelect'
// import { townLoader } from '../components/TownSelect'
import xmlParser from '../utils/xmlParser'

// export let countyStore = []

const routerObjectArr: RouteObject[] = [
  {
    path: '/',
    id: 'root',
    element: <App />,
    errorElement: <ErrorPage />,
    loader: countyLoader,
    children: [
      {
        path: '/:year',

        element: <App />,
        children: [
          {
            path: ':county',
            element: <App />,
            // loader: townLoader,
            children: [
              {
                path: ':town',
                element: <App />,
                loader: async ({ params }) => {
                  return axios
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
                      console.log(response)
                      return response
                    })
                },
              },
            ],
          },
        ],
      },
    ],
  },
]

const router = createBrowserRouter(routerObjectArr, {
  basename:
    process.env.NODE_ENV === 'production'
      ? 'big-data-front-end-exam'
      : undefined,
})
export default router
