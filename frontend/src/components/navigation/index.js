import React from 'react';
import 'react-router';
import { Container, NavLink, Navbar, NavbarToggler, Collapse, NavItem, Nav, Dropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';

var navbarStyle = {
    // backgroundColor: "#068845"
};

var navLinkStyle = {
    // color: "#ffffff"
}

var dropdownStyle = {
    // backgroundColor: "#0AD66D",
    margin: "0"
}

export class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.dropdownToggle = this.dropdownToggle.bind(this);
        this.onMouseOverDropdown = this.onMouseOverDropdown.bind(this);
        this.onMouseLeaveDropdown = this.onMouseLeaveDropdown.bind(this);

        this.state = {
            isOpen: false,
            isOpenDropdown: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    dropdownToggle() {
        this.setState({
            isOpenDropdown: !this.state.isOpenDropdown
        });
    }

    onMouseOverDropdown() {
        this.setState({
            isOpenDropdown: true
        });
    }

    onMouseLeaveDropdown() {
        this.setState({
            isOpenDropdown: false
        });
    }
    
    render() {
        return (
            <Navbar expand="lg" light style={navbarStyle} id="app-navbar">
                <Container>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse navbar isOpen={this.state.isOpen} >
                        <Nav className="ms-auto" navbar>
                            <NavItem>
                                <NavLink href="/" style={navLinkStyle}>Home</NavLink>
                            </NavItem>
                            <Dropdown nav inNavbar onMouseOver={this.onMouseOverDropdown} onMouseLeave={this.onMouseLeaveDropdown} isOpen={this.state.isOpenDropdown} toggle={this.dropdownToggle} >
                                <DropdownToggle nav style={navLinkStyle}>
                                    Blog
                                </DropdownToggle>
                                <DropdownMenu end style={dropdownStyle}>
                                    <DropdownItem href="/blog/travel" style={navLinkStyle}>Travel</DropdownItem>
                                    <DropdownItem href="/blog/recipies" style={navLinkStyle}>Recipies</DropdownItem>
                                    <DropdownItem href="/blog/vanlife" style={navLinkStyle}>Van Life</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            <NavItem>
                                <NavLink href="/about" style={navLinkStyle}>About</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/contact" style={navLinkStyle}>Contact</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        );
    }
}