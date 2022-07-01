import React, { Component } from 'react'
import NewsItem from './NewsItem'
import axios from 'axios';
import Loader from './Loader';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

    static defaultProps = {
        page: 1,
        category: "general",
        country: "us"
    }

    static propTypes = {
        page: PropTypes.number,
        category: PropTypes.string,
        country: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            article: [],
            loading: false,
            page: 1
        }
        document.title = `${this.props.category} - Daily Today`;
    }

    async updateNews() {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bb4ff85bca984f39b8c6c9532176618d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.props.setProgress(30);
        this.setState({ loading: true })
        axios.get(url)
            .then(resData => {
                const parseData = resData.data;
                this.setState({ article: parseData.articles, totalResults: parseData.totalResults, loading: false });
            })
        this.props.setProgress(100);
    }


    async componentDidMount() {
        this.updateNews();
    }

    handlePrevClick = async () => {
        this.setState({
            page: this.state.page - 1,
        })
        this.updateNews();
    }

    handleNextClick = async () => {
        this.setState({
            page: this.state.page + 1,
        })
        this.updateNews();
    }

    fetchMoreData = () => {
        this.setState({
            page: this.state.page + 1,
        })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bb4ff85bca984f39b8c6c9532176618d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        axios.get(url)
            .then(resData => {
                const parseData = resData.data;
                this.setState({
                    article: this.state.article.concat(parseData.articles),
                    totalResults: parseData.totalResults,
                    loading: false
                });
            })
    }

    render() {
        return (
            <>
                <h1 className='text-center'>Daily Today's - {this.props.category} Headlines</h1>
                {this.state.loading && <Loader />}
                <InfiniteScroll
                    dataLength={this.state.article.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.article.length < this.state.totalResults}
                    loader={<Loader />}
                >
                    <div className="container">

                        <div className="row my-4">
                            {!(this.state.loading) && this.state.article.map((articles, index) => {
                                return <div className="col md-3" key={index}>
                                    <NewsItem title={articles.content} desc={articles.description} img={articles.urlToImage} button={articles.url} author={articles.author} time={articles.publishedAt} source={articles.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        )
    }
}

export default News
