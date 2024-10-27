import "./App.css";
import NavBar from "./NavBar";
import React, { Component } from "react";
import News from "./News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default class App extends Component {
  apiKey = process.env.REACT_APP_API_KEY;
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Routes>
            <Route
              path="/"
              element={
                <News
                  key="home"
                  pageSize={9}
                  category="general"
                  apiKey={this.apiKey}
                />
              }
            />
            <Route
              path="/general"
              element={
                <News
                  key="general"
                  pageSize={9}
                  category="general"
                  apiKey={this.apiKey}
                />
              }
            />
            <Route
              path="/business"
              element={
                <News
                  key="business"
                  pageSize={9}
                  category="business"
                  apiKey={this.apiKey}
                />
              }
            />
            <Route
              path="/entertainment"
              element={
                <News
                  key="entertainment"
                  pageSize={9}
                  category="entertainment"
                  apiKey={this.apiKey}
                />
              }
            />
            <Route
              path="/sports"
              element={<News key="sports" pageSize={9} category="sports" apiKey={this.apiKey}/>}
            />
            <Route
              
              path="/health"
              element={
                <News key="health" pageSize={9} category="health" apiKey={this.apiKey} />
              }
            />
            <Route
              path="/science"
              element={
                <News
                  key="science"
                  pageSize={9}
                  category="science"
                  apiKey={this.apiKey}
                />
              }
            />
            <Route
              path="/technology"
              element={
                <News
                  key="technology"
                  pageSize={9}
                  category="technology"
                  apiKey={this.apiKey}
                />
              }
            />
          </Routes>
        </div>
      </Router>
    );
  }
}
