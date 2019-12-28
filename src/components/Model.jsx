import React, { Component } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { ApiKey } from "../ApiService";

class Model extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.state = {
      models: null,
      dropdownOpen: false,
      dropDownValue: "All Models"
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.maker !== prevProps.maker) {
      if (this.props.maker) {
        fetch(
          "https://marketcheck-prod.apigee.net/v1/search?api_key=" +
            ApiKey +
            "&radius=10&start=0&rows=0&make=" +
            this.props.maker +
            "&facets=model%7C0%7C100"
        )
          .then(response => {
            return response.json();
          })
          .then(data => {
            let newState = this.state;
            newState.dropDownValue = "All Models";
            newState.models = data["facets"]["model"];
            this.setState(newState);
          });
      }
    }
  }

  toggle() {
    this.setState(prevState => ({
      models: prevState.models,
      dropdownOpen: !prevState.dropdownOpen,
      dropDownValue: prevState.dropDownValue
    }));
  }

  changeValue(e) {
    let text = e.target.textContent;
    this.props.onSelect(text);
    this.setState(prevState => ({
      models: prevState.models,
      dropdownOpen: prevState.dropdownOpen,
      dropDownValue: text
    }));
  }

  render() {
    let array = [];
    if (this.state.models) {
      this.state.models.forEach((item, i) => {
        let dropdownItem = (
          <DropdownItem key={i} onClick={this.changeValue}>
            {item.item}
          </DropdownItem>
        );
        array.push(dropdownItem);
      });
    } else {
      let dropdownItem = (
        <DropdownItem key={0}>Select Maker First</DropdownItem>
      );
      array.push(dropdownItem);
    }
    return (
      <Dropdown isOpen={this.state.dropdownOpen} size="lg" toggle={this.toggle}>
        <DropdownToggle caret color="info">
          {this.state.dropDownValue}
        </DropdownToggle>
        <DropdownMenu>{array}</DropdownMenu>
      </Dropdown>
    );
  }
}

export default Model;
