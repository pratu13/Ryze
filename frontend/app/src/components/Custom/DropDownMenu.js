import React, { useState } from 'react'
import CaretIcon from "../../assets/caret-down.png"
import CaretDark from "../../assets/caretDark.png"
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


const DropDownMenu = ({ color, updateRole, width, switchRole, isSwitch, name, dark }) => {
  
  const [userRole, setUserRole] = useState(UserType.NOROLE)

  const switchRoles = (role) => {
    switchRole(name ,role, role.img)
  }

  const menuItemTapped = (role) => {
    if(isSwitch) {
      switchRoles(role)
    } else {
      setUserRole(role)
      updateRole(role)
    }
  }

  return (
    <>
      <MenuContainer color={color} width={ width}>
        <Item icon={dark ? CaretDark : CaretIcon} >
          <DropMenu menuItemTapped={menuItemTapped} isSwitch={ isSwitch}/>
        </Item>
        {
          !isSwitch && userRole.title
        }
        </MenuContainer>
      </>
  )
}

const DropMenu = (props) => {

  const MenuItem = (props_) => {
    return (
      <DropMenuItem onClick={e => { props_.menuItemTapped(props_.value) }}>
        <ItemIcon src={props_.leftIcon} />
        {
          props_.value.title
        }
        </DropMenuItem>
    );
  }

  return (
    <>
      <Dropdown>
        <MenuItem isSwitch={props.isSwitch} leftIcon={UserType.ADMIN.img} menuItemTapped={props.menuItemTapped} value={ UserType.ADMIN}/>
        <MenuItem isSwitch={ props.isSwitch} leftIcon={UserType.STUDENT.img} menuItemTapped= {props.menuItemTapped} value = { UserType.STUDENT}/>
        <MenuItem isSwitch={ props.isSwitch} leftIcon={UserType.TEACHER.img} menuItemTapped= {props.menuItemTapped} value ={ UserType.TEACHER}/>
      </Dropdown>
    </>
  );
}

const Item = (props) => {

  const [open, setOpen] = useState(false);

  return (
    <CaretMenuItem onClick={() => setOpen(!open)}>
      <ItemIcon src={ props.icon } />
      {open && props.children}
    </CaretMenuItem>
  );
}



export default DropDownMenu