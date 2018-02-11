import React from 'react';
import {Nav, NavItem, Navbar} from 'react-bootstrap';

const TopBar = () => {
  return (
    <Navbar inverse>
      <Nav pullRight>
        <NavItem href="/" eventKey={1}>Map</NavItem>
        <NavItem href="/report" eventKey={2}>Report an Incident</NavItem>
      </Nav>
    </Navbar>
  )
}

export default TopBar
