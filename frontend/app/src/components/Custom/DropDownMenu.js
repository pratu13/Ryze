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


const DropDownMenu = ({ choices, updateRole }) => {
  
  const [userRole, setUserRole] = useState("")
  const [userRoleImage, setUserRoleImg] = useState("")

  const updateUserRole = (role) => {
    setUserRole(role)
    updateRole(role)
  } 

  return (
    <>
      <MenuContainer color="white">
        <Item icon={<CaretIcon />} >
          <DropMenu updateUserRole={updateUserRole}/>
        </Item>
        {userRole}
        {(() => {
          if (!userRole) {
            return <ItemIcon src={userRoleImage}/>
          }
        })}
        </MenuContainer>
      </>
  )
}

const DropMenu = (props) => {

  const MenuItem = (props_) => {
    return (
      <>
        <DropMenuItem onClick={e => { props_.updateUserRole(props_.value) }}>
            <ItemIcon src = {props_.leftIcon}/>
            {props_.value}
        </DropMenuItem>
      </>
    );
  }

  return (
    <>
      <Dropdown>
        <MenuItem leftIcon={Admin} updateUserRole= {props.updateUserRole} value="Admin"/>
        <MenuItem leftIcon={Student} updateUserRole= {props.updateUserRole} value = "Student"/>
        <MenuItem leftIcon={Teacher} updateUserRole= {props.updateUserRole} value ="Teacher"/>
      </Dropdown>
    </>
  );
}

const Item = (props) => {

  const [open, setOpen] = useState(false)
  return (
    <>
      <CaretMenuItem onClick={() => setOpen(!open)}>
        <ItemIcon src={CaretIcon}/>

        {open && props.children}
      </CaretMenuItem>
    </>
  )
}



export default DropDownMenu