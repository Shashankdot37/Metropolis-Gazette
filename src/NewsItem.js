import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { title, description, imageURL, url, date,author} = this.props;
    return (
      <>
        <div className="container">
          <div className="card">
            <img
              src={
                !imageURL
                  ? "https://cdn.vectorstock.com/i/500p/06/59/financial-news-icon-vector-53110659.jpg"
                  : imageURL
              }
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">{title}...</h5>
              <p className="card-text">{description}...</p>
              <span className="badge rounded-pill text-bg-secondary">{!author?"Unknown":author}</span>
              <br />
              <br />
              <p className="card-text">
                <small className="text-body-secondary">
                  Published: {new Date(date).toGMTString()}
                </small>
              </p>
              <a
                href={url}
                rel="noreferrer"
                target="_blank"
                className="btn btn-sm btn-primary"
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
}
