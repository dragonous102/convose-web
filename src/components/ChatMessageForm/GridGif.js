import { useState, useEffect } from "react"
import { Scrollbars } from "react-custom-scrollbars"
import axios from "axios"
import { Icon } from "../../components"
import {
  StyledGridGif,
  StyledGifContainer,
  StyledGridGifContainer,
  StyledGifInputContainer,
  StyledGifInput,
  StyledLoadingSpinnerWrapper,
} from "./Styled"

const apikey = process.env.REACT_APP_TENOR_API_KEY
const lmt = 5

export default function ({ handleGifSelect }) {
  const [gifs, setGifs] = useState([])
  const [listEl, setListEl] = useState(null)
  const [loading, setLoading] = useState(false)
  const [appending, setAppending] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [pos, setPos] = useState(null)

  useEffect(() => {
    const ourRequest = axios.CancelToken.source() // <-- 1st step

    const fetchGif = async () => {
      setLoading(true)
      setAppending(false)
      const search_url =
        "https://g.tenor.com/v1/search?q=" +
        searchText +
        "&key=" +
        apikey +
        "&limit=" +
        lmt
      try {
        const response = await axios.get(search_url, {
          cancelToken: ourRequest.token, // <-- 2nd step
        })
        setLoading(false)
        setGifs(response.data.results)
        setPos(response.data.next)
        // eslint-disable-next-line no-empty
      } catch (err) {}
    }
    fetchGif()

    return () => {
      ourRequest.cancel() // <-- 3rd step
    }
  }, [searchText])

  const loadMore = async () => {
    setAppending(true)
    setLoading(false)
    var search_url =
      "https://g.tenor.com/v1/search?q=" +
      searchText +
      "&key=" +
      apikey +
      "&limit=" +
      lmt +
      "&pos=" +
      pos
    const res = await axios.get(search_url)
    setPos(res.data.next)
    setAppending(false)
    setGifs([...gifs, ...res.data.results])
  }

  const handleScroll = () => {
    if (
      listEl.getScrollTop() + listEl.getClientHeight() + 20 >=
      listEl.getScrollHeight()
    ) {
      loadMore()
    }
  }

  const displayList = () => {
    const lists = gifs.map((gif) => {
      const imageObject = gif["media"][0]["mediumgif"]
      const ratio = imageObject["dims"][1] / imageObject["dims"][0]
      return (
        <StyledGifContainer
          key={gif.id}
          onClick={() => handleGifSelect(imageObject["url"], ratio)}
        >
          <img src={gif["media"][0]["mediumgif"]["url"]} className="w-100" />
        </StyledGifContainer>
      )
    })

    return lists.length > 0 ? lists : <h2>No gif found</h2>
  }

  return (
    <StyledGridGifContainer>
      <StyledGifInputContainer>
        <StyledGifInput
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          type="text"
          placeholder="Search"
          autoFocus={true}
        />
      </StyledGifInputContainer>
      <StyledGridGif>
        <Scrollbars
          ref={(ref) => {
            setListEl(ref)
          }}
          onScroll={handleScroll}
        >
          {loading ? (
            <StyledLoadingSpinnerWrapper>
              <Icon iconId="spinner" width="38px" />
            </StyledLoadingSpinnerWrapper>
          ) : (
            displayList()
          )}
          {appending && (
            <StyledLoadingSpinnerWrapper height={150}>
              <Icon iconId="spinner" width="38px" />
            </StyledLoadingSpinnerWrapper>
          )}
        </Scrollbars>
      </StyledGridGif>
    </StyledGridGifContainer>
  )
}
