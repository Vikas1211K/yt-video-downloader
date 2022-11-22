import { React, useState } from 'react'
import { FaCopy, FaVideo } from 'react-icons/fa';
// import { FcVideoCall } from 'react-icons/fc';
import { BiSearchAlt, BiDotsVerticalRounded } from 'react-icons/bi';
import { CgSelectR } from 'react-icons/cg';
import './App.css';
import axios from 'axios';

function App() {
  const [format, setFormat] = useState([])

  const [loading, setloading] = useState(false)

  const download = async (url) => {
    // console.log("fetching")
    const res = await axios.get(`https://youtube-dm.herokuapp.com/download?url=${url}`)
    // console.log("fetched")
    console.log("res: ", res)
    var arr = []
    var i = 0
    while (i < res.data.length) {
      if (res.data[i].hasAudio) {
        arr.push(res.data[i])
      }
      i++;
    }
    setFormat(arr)
    setloading(false)
  }

  const handleClick = () => {
    setloading(true)
    const url = document.getElementById("link").value
    console.log(url)
    download(url)
  }

  return (
    <>
      <div className="App">
        <h1>Youtube Video Downloader</h1>
        <div className='form'>
          <input type="text" id="link" class="searchbar" placeholder="Search"/><br/>
          {!loading && <button className="btn btn-primary mt-3" onClick={() => { handleClick() }} type="submit">Search</button>}
          {loading &&
            <div className="spinner-border text-light mt-3" role="status">
            <span className="visually-hidden">Loading...</span>
            </div>
          }
          {format.length > 0 && <div className="dropdown">
            <button className="btn btn-success dropdown-toggle mt-3" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              Select Quality
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton1" >
              {format.map((elm) => {
                return <a key={elm.itag} className="dropdown-item" href={elm.url} target="_blank" rel="noreferrer" >
                  <FaVideo /> {elm.quality}
                </a>
              })}
            </div>
          </div>}
        </div >
      </div>
      <div>
        <h2>How To Download Youtube Video</h2>
        <center>
          <table className='table'>
            <thead>
              <tr>
                <th className='copy' scope="col"><h3><FaCopy />Copy URL</h3></th>
                <th className='search' scope="col"><h3><BiSearchAlt />Search</h3></th>
                <th className='select' scope="col"><h3><CgSelectR />Select Quality</h3></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Copy the Video URL from youtube</td>
                <td>Paste the URL in search-bar and Click Search</td>
                <td>Select video quality, a new window will be open.<br />Click on <BiDotsVerticalRounded /> and download the video</td>
              </tr>
            </tbody>
          </table>
        </center>
      </div>
    </>
  );
}

export default App;
