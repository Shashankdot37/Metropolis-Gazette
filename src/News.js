import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'


export default class News extends Component {
  articles = [
    {
      source: { id: "reuters", name: "Reuters" },
      author: "Phil Stewart",
      title:
        "North Korean troops are in Russia, US defense secretary says - Reuters",
      description:
        "Lloyd Austin said it remained to be seen what they would be doing there.",
      url: "https://www.reuters.com/world/north-korean-troops-russia-us-defense-secretary-says-2024-10-23/",
      urlToImage:
        "https://www.reuters.com/resizer/v2/JDSZGBJATNMOJBEY4KHS2K5BDY.jpg?auth=55b8eb8cd65aec6589f08e72dac2e93f3c6368540ca5878d214c5fae5fb652a9&height=1005&width=1920&quality=80&smart=true",
      publishedAt: "2024-10-23T12:02:32Z",
      content: null,
    }
  ];

  static defaultProps =
  {
    pageSize:9,
    category:"general"
  }

  static propTypes =
  {
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: this.articles,
      location: false,
      page: 1
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} | MG`
  }

  async updateNews()
  {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${(this.state.page)}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults:parsedData.totalResults,
      loading:false
    })
  }
  handlePrevClick = async () => {
    this.setState({page:this.state.page-1});
    this.updateNews();
  };
  handleNextClick = async () => {
    this.setState({page:this.state.page+1});
    this.updateNews();
  }
  async componentDidMount() {
    this.updateNews();
  }

  render() {
    return (
      <>
        <div className="container my-3">
          <h1 id="top-headline" className="text-center">Top {this.capitalizeFirstLetter(this.props.category)}  Headlines</h1>
          {this.state.loading && <Spinner/>}
          <div className="row">
            {this.state.articles &&!this.state.loading && this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imageURL={element.urlToImage}
                    url={element.url}
                    date={element.publishedAt}
                    author={element.source.name.length>40?element.source.name.slice(0,35)+"...":element.source.name}
                  />
                </div>
              );
            })}
          </div>
          <br />
          <div className="d-flex justify-content-between">
            <button
              disabled={this.state.page<=1}
              type="button"
              className="btn btn-dark"
              onClick={this.handlePrevClick}
            >
              &larr; Previous
            </button>
            <button
              type="button"
              className="btn btn-dark"
              onClick={this.handleNextClick}
              disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)}
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </>
    );
  }
}
