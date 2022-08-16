import { useState } from "react"
import PropTypes from "prop-types"
import Observer from "react-intersection-observer"
import { StyledImage, StyledImageWrapper } from "./Styled"
import { calculateImageDimension } from "../../../api/utils"

export default function Img(props) {
  const [loaded, setLoaded] = useState(false)
  const { src, alt, ratio, onChange, ...rest } = props
  const { width, height, url } = calculateImageDimension(ratio, src)
  const onImageLoad = () => {
    setLoaded(true)
    onChange != null && onChange()
  }
  return (
    <Observer triggerOnce={true}>
      {({ inView, ref }) => (
        <StyledImageWrapper
          loaded={loaded || (src && src.length > 300) || true}
          height={height}
          width={width}
          ref={ref}
        >
          <StyledImage
            src={inView ? url : ""}
            alt={alt}
            {...rest}
            onLoad={onImageLoad}
          />
        </StyledImageWrapper>
      )}
    </Observer>
  )
}

Img.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  ratio: PropTypes.number.isRequired,
}
