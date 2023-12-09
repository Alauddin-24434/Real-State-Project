
import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'

import ErrorPage from '../pages/ErrorPage'

import SignUp from '../pages/SignUp/SignUp'


import Home from '../pages/Home/Home'
import PropertyDetails from '../Components/Shared/DetailsProperty/PropertyDetails'

import DashBoardLayout from '../layouts/DashBoardLayout'

import PrivateRoute from './PrivateRoute'
import Allproperty from '../pages/AllProperty/Allproperty'
import Login from '../pages/Login/Login'

import AddBuilding from '../Components/Dashboard/Pages/AddBuilding'
import MyBookings from '../Components/Dashboard/Pages/MyBookings'
import OwnUserReviews from '../Components/Dashboard/Pages/UserReviews'
import PropertyOffers from '../Components/Dashboard/Pages/PropertyOffers '
import BoughtProperties from '../Components/Dashboard/Pages/BoughtProperties'
import ManageBookings from '../Components/Dashboard/Pages/ManageBookings'
import Payment from '../Components/Dashboard/Payment/Payment'
import ManageUsers from '../Components/Dashboard/Pages/ManageUsers'
import ManageReviews from '../Components/Dashboard/Pages/ManageReviews'
import UserProfile from '../Components/Dashboard/Pages/Profile'
import AgentAddedList from '../Components/Dashboard/Pages/AgentAddedLIst'


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },

      {
        path: '/allProperty',
        element: <Allproperty />
      }
      ,
      {
        path: '/property/:id',
        element: <PrivateRoute><PropertyDetails /></PrivateRoute>,
        loader: ({ params }) => fetch(`https://real-state-server-side.vercel.app/houses/${[params.id]}`)

      }
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashBoardLayout /></PrivateRoute>,
    children: [
      { path: 'add-building', element: <AddBuilding /> },
    
      { path: 'agent-list', element: <AgentAddedList/> },

      { path: 'my-bookings', element: <MyBookings /> },
      { path: 'my-reviews', element: <OwnUserReviews /> },
      { path: 'property-offer', element: <PropertyOffers /> },
      { path: 'my-bought', element: <BoughtProperties /> },
      { path: 'manage-property', element: <ManageBookings /> },
      { path: 'manage-users', element: <ManageUsers/> },
      { path: 'payment', element: <Payment /> },
      { path: 'manage-reviews', element: <ManageReviews /> },
      { path: 'users-profile', element: <UserProfile/> }
    ]
  }

])
