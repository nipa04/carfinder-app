import React, { Component } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class City extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.state = {
      dropdownOpen: false,
      dropDownValue: "Top City"
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
      dropDownValue: prevState.dropDownValue
    }));
  }

  changeValue(e) {
    let text = e.target.textContent;
    this.props.onSelect(text);
    this.setState(prevState => ({
      dropdownOpen: prevState.dropdownOpen,
      dropDownValue: text
    }));
  }

  render() {
    let array = [];
    if (this.props.city) {
      this.props.city.forEach((item, i) => {
        let dropdownItem = (
          <DropdownItem key={i} onClick={this.changeValue}>
            {item.item}
          </DropdownItem>
        );
        array.push(dropdownItem);
      });
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

export default City;
