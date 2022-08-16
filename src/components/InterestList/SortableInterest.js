import { useSortable } from "@dnd-kit/sortable"
import { StyledItem } from "./Styled"
import InterestLabel from "../InterestLabel"

function SortableInterest(props) {
  const { interest, onChange, onRemove, activeIndex, index } = props
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: interest.name.replace(/ /g, "") })
  const style = {
    // transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <StyledItem
      faded={isDragging}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <InterestLabel
        primary
        interest={interest}
        onChange={onChange}
        onRemove={onRemove}
        activeIndex={activeIndex}
        index={index}
        isDragging={isDragging}
      />
    </StyledItem>
  )
}

export default SortableInterest
