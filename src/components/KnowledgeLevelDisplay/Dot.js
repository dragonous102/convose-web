const Dot = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle
      cx={3.375}
      cy={3.375}
      r={3.375}
      fill={props.fill}
      width={props.width}
      height={props.height}
    />
  </svg>
)

export default Dot
