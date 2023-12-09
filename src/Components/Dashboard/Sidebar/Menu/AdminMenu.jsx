import { FaUserCog } from 'react-icons/fa'
import MenuItem from '../../MenuItem'

// ---admin
const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label='Manage Property' address='manage-property' />
      <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' />
      <MenuItem icon={FaUserCog} label='Manage Reviews' address='manage-reviews' />
      
    </>
  )
}

export default AdminMenu
