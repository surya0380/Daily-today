import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import axios from 'axios';
import Loader from './Loader';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

    const [article, setArticle] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const updateNews = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ac598f8443b64379a40fa13deae69e42&page=${page}&pageSize=${props.pageSize}`;
        props.setProgress(30);
        setLoading(true)
        axios.get(url)
            .then(resData => {
                const parseData = resData.data;
                setArticle(parseData.articles)
                setLoading(false)
                setTotalResults(parseData.totalResults)
            })
        props.setProgress(100);
    }
    
    useEffect(() => {
        updateNews();
      },[]);

    const fetchMoreData = () => {
        setPage(page+1)
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ac598f8443b64379a40fa13deae69e42&page=${page}&pageSize=${props.pageSize}`;
        axios.get(url)
            .then(resData => {
                const parseData = resData.data;
                setArticle( article.concat(parseData.articles))
                setLoading(false)
                setTotalResults( parseData.totalResults)
            })
    }

    return (
        <>
            <h1 className='text-center' style={{marginTop:"90px"}}>Daily Today's - {props.category} Headlines</h1>
            {loading && <Loader />}
            <InfiniteScroll
                dataLength={article.length}
                next={fetchMoreData}
                hasMore={article.length < totalResults}
                loader={<Loader />}
            >
                <div className="container">

                    <div className="row my-4">
                        {!(loading) && article.map((articles, index) => {
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

News.defaultProps = {
    page: 1,
    category: "general",
    country: "us"
}

News.propTypes = {
    page: PropTypes.number,
    category: PropTypes.string,
    country: PropTypes.string
}

export default News
