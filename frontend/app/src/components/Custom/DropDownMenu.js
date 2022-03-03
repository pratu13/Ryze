import React, { useState } from 'react'
import CaretIcon from "../../assets/caret-down.png"
import Admin from "../../assets/admin.png"
import Student from "../../assets/student.png"
import Teacher from "../../assets/teacher.png"
import {
  MenuContainer,
  DropMenuItem,
  ItemIcon,
  Dropdown,
  CaretMenuItem
} from './GenericStyledElements'
import { UserType } from '../Utilities/Utilities'


const DropDownMenu = ({ choices, updateRole }) => {
  
  const [userRole, setUserRole] = useState(UserType.NOROLE)
  const [userRoleImage, setUserRoleImg] = useState("")

  const updateUserRole = (role) => {
    console.log(role)
    setUserRole(role)
    updateRole(role)
  } 

  return (
    <>
      <MenuContainer color="white">
        <Item icon={<CaretIcon />} >
          <DropMenu updateUserRole={updateUserRole}/>
        </Item>
        {userRole.title}
        </MenuContainer>
      </>
  )
}

const DropMenu = (props) => {

  const MenuItem = (props_) => {
    return (
        <DropMenuItem onClick={e => { props_.updateUserRole(props_.value) }}>
            <ItemIcon src = {props_.leftIcon}/>
            {props_.value.title}
        </DropMenuItem>
    );
  }

  return (
    <>
      <Dropdown>
        <MenuItem leftIcon={UserType.ADMIN.img} updateUserRole={props.updateUserRole} value={ UserType.ADMIN}/>
        <MenuItem leftIcon={UserType.STUDENT.img} updateUserRole= {props.updateUserRole} value = { UserType.STUDENT}/>
        <MenuItem leftIcon={UserType.TEACHER.img} updateUserRole= {props.updateUserRole} value ={ UserType.TEACHER}/>
      </Dropdown>
    </>
  );
}

const Item = (props) => {

  const [open, setOpen] = useState(false);

  return (
    <CaretMenuItem onClick={() => setOpen(!open)}>
      <ItemIcon src={CaretIcon} />
      {open && props.children}
    </CaretMenuItem>
  );
}



export default DropDownMenu