import React, { useState, useEffect } from 'react';
import './App.scss';
import SearchBar from './components/SearchBar/SearchBar';
import youtube from './apis/youtube.js';
import VideoList from './components/VideoList/VideoList';
import VideoDetail from './components/VideoDetails/VideoDetail';
import InfiniteScroll from 'react-infinite-scroll-component';

const KEY = 'AIzaSyD_d-eO2k0oY6yjcmkKefMcq0FW8phokEs';

function App() {
  const [video, setVideo] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState('');

  useEffect(() => {
    onTermSubmit('ibm company');
  }, []);

  const onTermSubmit = async (term) => {
    const response = await youtube.get('/search', {
      params: {
        part: 'snippet',
        maxResults: 20,
        type: 'video',
        key: KEY,
        q: term,
      },
    });

    setVideo(response.data.items);
    setSelectedVideo(response.data.items[0]);
  };

  // const fetchImages = async (term) => {
  //   const response = await youtube.get('/search', {
  //     params: {
  //       part: 'snippet',
  //       maxResults: 20,
  //       type: 'video',
  //       key: KEY,
  //       q: term,
  //     },
  //   });

  //   setVideo(video.concat(response.data.items));
  //   setSelectedVideo(response.data.items[0]);
  // };

  const onVideoSelect = (video) => {
    setSelectedVideo(video);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  return (
    <div className="container">
      <SearchBar onFormSubmit={onTermSubmit} />

      <div className="grid">
        <div className="layout">
          <div className="preview-column">
            <VideoDetail video={selectedVideo} />
          </div>
          <div className="videos-column">
            {/* <InfiniteScroll
              dataLength={video.length} //This is important field to render the next data
              next={fetchImages}
              hasMore={true}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            > */}
            <VideoList onVideoSelect={onVideoSelect} videos={video} />
            {/* </InfiniteScroll> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
