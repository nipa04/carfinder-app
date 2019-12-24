import React, { Component } from "react";
import {
  Button,
  Col,
  Container,
  InputGroup,
  InputGroupAddon,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  Row
} from "reactstrap";
import { ApiKey } from "./ApiService";

import Maker from "./components/Maker";
import Model from "./components/Model";
import Years from "./components/Years";
import Search from "./components/Search";
import City from "./components/City";

var sectionStyle2 = {
  font: "Ubuntu",
  padding: "3rem",
  justifyContent: "Center"
};

var sectionStyle3 = {
  color: "White",
  textDecorationLine: "underline"
};

var resultStyle = {
  font: "Ubuntu",
  padding: "1rem",
  justifyContent: "Center"
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.searchCar = this.searchCar.bind(this);
    this.state = {
      make: null,
      year: null,
      city: null,
      selectedMaker: null,
      selectedModel: null,
      selectedYear: null,
      selectedCity: null,
      result: null
    };
  }

  cityCallback = seletcedCity => {
    let refresh = seletcedCity !== this.state.seletcedCity;
    let newState = this.state;
    newState.selectedCity = seletcedCity;
    this.setState(newState);
    if (refresh) {
      this.searchCar(null);
    }
  };

  makerCallback = seletcedMaker => {
    let newState = this.state;
    newState.selectedMaker = seletcedMaker;
    this.setState(newState);
  };

  modelCallback = seletcedModel => {
    let newState = this.state;
    newState.selectedModel = seletcedModel;
    this.setState(newState);
  };

  yearCallback = seletcedYear => {
    let newState = this.state;
    newState.selectedYear = seletcedYear;
    this.setState(newState);
  };

  componentDidMount() {
    fetch(
      "http://marketcheck-prod.apigee.net/v1/search?api_key=" +
        ApiKey +
        "&radius=10&start=0&rows=0&facets=year%7C0%7C50,make%7C0%7C100,city%7C0%7C100"
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        this.setState({
          make: data["facets"]["make"],
          year: data["facets"]["year"],
          city: data["facets"]["city"]
        });
      });
  }

  searchCar(e) {
    const searchEnabled =
      this.state.selectedCity !== null &&
      this.state.selectedMaker !== null &&
      this.state.selectedModel !== null &&
      this.state.selectedYear !== null;

    if (searchEnabled) {
      let city = this.state.selectedCity;
      let make = this.state.selectedMaker;
      let model = this.state.selectedModel;
      let year = this.state.selectedYear;

      http: fetch(
        "http://marketcheck-prod.apigee.net/v1/search?api_key=" +
          ApiKey +
          "&year=" +
          year +
          "&make=" +
          make +
          "&radius=10&city=" +
          city +
          "&model=" +
          model
      )
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          let newState = this.state;
          newState.result = data["listings"];
          this.setState(newState);
        });
    }
  }

  render() {
    const makers = this.state.make;
    const years = this.state.year;
    const city = this.state.city;
    const searchResult = this.state.result;
    const searchEnabled =
      this.state.selectedCity !== null &&
      this.state.selectedMaker !== null &&
      this.state.selectedModel !== null &&
      this.state.selectedYear !== null;
    return (
      <div
        style={{
          backgroundColor: "#ade6e9",
          backgroundPosition: "center",
          backgroundSize: "cover",
          color: "Blue"
        }}
      >
        <Container>
          {/*Navigation*/}
          <Row>
            <Col sm="12">
              <Navbar color="info" light expand="md">
                <NavbarBrand>
                  <h2>Car Finder</h2>
                </NavbarBrand>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink href="https://apidocs.marketcheck.com/">
                      <h4 style={sectionStyle3}>
                        This product uses the Marketcheck API
                      </h4>
                    </NavLink>
                  </NavItem>
                </Nav>
              </Navbar>
            </Col>
          </Row>
          <Row style={sectionStyle2}>
            <Col sm="auto">
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <City city={city} onSelect={this.cityCallback} />

                  <Maker maker={makers} onSelect={this.makerCallback} />

                  <Model
                    maker={this.state.selectedMaker}
                    onSelect={this.modelCallback}
                  />

                  <Years year={years} onSelect={this.yearCallback} />

                  <Button
                    color="danger"
                    disabled={!searchEnabled}
                    onClick={this.searchCar}
                  >
                    Search
                  </Button>
                  
                </InputGroupAddon>
              </InputGroup>
            </Col>
          </Row>
          <Row style={sectionStyle2}>
            <Col xs="auto">
              <Search result={searchResult} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
