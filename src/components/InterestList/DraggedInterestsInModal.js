import { useEffect, useRef, useState } from "react"
import { connect } from "react-redux"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimation,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable"
import SortableInterest from "./SortableInterest"
import { StyledModal } from "./Styled"
import { updateInterests, updateProfile } from "../../redux/actions/profile"
import InterestLabel from "../InterestLabel"
import { restrictToParentElement } from "@dnd-kit/modifiers"
const defaultDropAnimationConfig = {
  ...defaultDropAnimation,
  dragSourceOpacity: 0.5,
}
const screenReaderInstructions = {
  draggable: `
    To pick up a sortable interest, press the space bar.
    While sorting, use the arrow keys to move the interest.
    Press space again to drop the interest in its new position, or press escape to cancel.
  `,
}
let activationConstraint = {
  distance: 0.5,
}
function DraggedInterestsInModal(props) {
  const { interests, onChange, onRemove, dispatch, mobile } = props

  const [activeId, setActiveId] = useState(null)
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint,
    }),
    useSensor(TouchSensor, {
      activationConstraint,
    }),

    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const isFirstAnnouncement = useRef(true)
  useEffect(() => {
    if (mobile) {
      activationConstraint = {
        delay: 200,
        tolerance: 5,
      }
    }
  }, [mobile])
  useEffect(() => {
    if (!activeId) {
      isFirstAnnouncement.current = true
      return
    }
  }, [activeId])

  const getIndex = (name) => {
    return interests
      .map((interest) => interest.name.replace(/ /g, ""))
      .indexOf(name)
  }
  const getPosition = (name) => getIndex(name) + 1
  const activeIndex = activeId ? getIndex(activeId) : -1
  const handleDragStart = ({ active }) => {
    setActiveId(active.id)
  }
  const handleDragEnd = ({ over }) => {
    setActiveId(null)
    const overIndex = getIndex(over.id)
    if (activeIndex !== overIndex) {
      let newDraggedInterests = arrayMove(interests, activeIndex, overIndex)
      dispatch(updateInterests(newDraggedInterests))
      dispatch(updateProfile({ interests: newDraggedInterests }))
    }
  }
  const announcements = {
    onDragStart(id) {
      return `Picked up sortable item ${id}. Sortable item ${id} is in position ${getPosition(
        id
      )} of ${interests.length}`
    },
    onDragOver(id, overId) {
      // In this specific use-case, the picked up item's `id` is always the same as the first `over` id.
      // The first `onDragOver` event therefore doesn't need to be announced, because it is called
      // immediately after the `onDragStart` announcement and is redundant.
      if (isFirstAnnouncement.current === true) {
        isFirstAnnouncement.current = false
        return
      }

      if (overId) {
        return `Sortable item ${id} was moved into position ${getPosition(
          overId
        )} of ${interests.length}`
      }

      return
    },
    onDragEnd(id, overId) {
      if (overId) {
        return `Sortable item ${id} was dropped at position ${getPosition(
          overId
        )} of ${interests.length}`
      }

      return
    },
    onDragCancel(id) {
      return `Sorting was cancelled. Sortable item ${id} was dropped and returned to position ${getPosition(
        id
      )} of ${interests.length}.`
    },
  }

  return (
    <DndContext
      announcements={announcements}
      screenReaderInstructions={screenReaderInstructions}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragCancel={() => setActiveId(null)}
    >
      <SortableContext
        items={interests.map((interest) => interest.name.replace(/ /g, ""))}
        strategy={rectSortingStrategy}
      >
        <StyledModal mobile={mobile}>
          {interests.map((interest, index) => (
            <SortableInterest
              key={interest.name.replace(/ /g, "")}
              interest={interest}
              onChange={onChange}
              onRemove={onRemove}
              activeIndex={activeIndex}
              index={index}
            />
          ))}
        </StyledModal>
        <DragOverlay
          dropAnimation={defaultDropAnimationConfig}
          modifiers={[restrictToParentElement]}
        >
          {
            <InterestLabel
              primary
              interest={interests[activeIndex]}
              onChange={onChange}
              onRemove={onRemove}
              DragOverlay={true}
            />
          }
        </DragOverlay>
      </SortableContext>
    </DndContext>
  )
}

export default connect()(DraggedInterestsInModal)
