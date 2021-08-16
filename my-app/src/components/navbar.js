import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import '../App.css' 


export default class Header extends React.Component {
  render() {
    return (
      <Navbar  className="header"  variant="dark">
        <Container fluid>
          <Navbar.Collapse className="justify-content-center">
            <Navbar.Text href="#">
              <strong style={{ fontSize: '25px' }}>{this.props.title}</strong>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }
}
