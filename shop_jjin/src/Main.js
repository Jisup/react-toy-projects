/* eslint-disable */

import "./style/Main.css";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import React, { useContext, useState } from "react";
import Data from "./data/data";
import Detail from "./view/Detail";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import axios from "axios";
import Cart from "./view/Cart";

let 재고context = React.createContext();

function App() {
  /*
    useState 상태(state) 관리를 할 수 있게 해주는 Hook
    - 사용시 상태값과 그 상태값을 변경할 수 있는 setter 함수가 만들어진다
  */
  let [shoes, shoes변경] = useState(Data);
  let [재고, 재고변경] = useState([10, 11, 12]);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            ShoeShop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/cart">
                Cart
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Switch>
        <Route exact path="/">
          <div className="background">
            <h1>20% Season Off</h1>
            <p>
              This is a simple hero unit, a simple jumbotron-style component for
              calling extra attention to featured content or information.
            </p>
            <p>
              <Button variant="primary">Learn more</Button>
            </p>
          </div>
          <div className="container">
            <재고context.Provider value={재고}>
              <div className="row">
                {shoes.map((shoe, idx) => {
                  return <Card key={idx} shoe={shoe}></Card>;
                })}
              </div>
            </재고context.Provider>
            <button
              className="btn btn-primary"
              onClick={() => {
                axios
                  .get("https://codingapple1.github.io/shop/data2.json")
                  .then((res) => {
                    shoes변경([...shoes, ...res.data]);
                  })
                  .catch(() => {
                    console.log("실패");
                  });
              }}
            >
              더보기
            </button>
          </div>
        </Route>

        <Route path="/detail/:id">
          <Detail shoes={shoes} 재고={재고} 재고변경={재고변경} />
        </Route>

        <Route path="/cart">
          <Cart></Cart>
        </Route>

        <Route path="/:id">
          <div>아무거나적었을때</div>
        </Route>
      </Switch>
    </div>
  );
}

function Card(props) {
  let 재고 = useContext(재고context);
  let history = useHistory();

  return (
    <div
      className="col-md-4"
      onClick={() => {
        history.push("/detail/" + props.shoe.id);
      }}
    >
      <img
        src={
          "https://codingapple1.github.io/shop/shoes" +
          (props.shoe.id + 1) +
          ".jpg"
        }
        width="100%"
      />
      <h4>{props.shoe.title}</h4>
      <p>
        {props.shoe.content} & {props.shoe.price}원
      </p>
      <p>재고 : {재고[props.shoe.id]}</p>
    </div>
  );
}

export default App;
