import React, { Component } from "react";
import {
  Container,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardLink,
  CardTitle,
  CardSubtitle
} from "reactstrap";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(prevProps) {}

  render() {
    let array = [];
    if (this.props.result) {
      this.props.result.forEach((item, i) => {
        let heading = item["heading"];
        let source = item["source"];
        let vin = item["vin"];
        let imageUrl = item["media"]["photo_links"][0];
        let dropdownItem = (
          <Card key={i}>
            <CardBody>
              <CardTitle>{heading}</CardTitle>
              <CardSubtitle>{source}</CardSubtitle>
            </CardBody>
            <img width="50%" src={imageUrl} alt="Card image cap" />
            <CardBody>
              <CardText>{vin}</CardText>
            </CardBody>
          </Card>
        );
        array.push(dropdownItem);
      });
    }
    return <Container>{array}</Container>;
  }
}

export default Search;
