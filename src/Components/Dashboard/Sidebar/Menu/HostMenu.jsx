
import { BsBuildingAdd } from "react-icons/bs";
import { IoIosListBox } from "react-icons/io";

import MenuItem from '../../MenuItem'
const HostMenu = () => {
  return (
    <>
      <MenuItem icon={BsBuildingAdd} label='Add Room' address='add-building' />
     
      <MenuItem icon={IoIosListBox} label='Added House' address='agent-list' />
 
      <MenuItem icon={IoIosListBox} label='Property Offer' address='property-offer' />
   
    </>
  )
}

export default HostMenu
