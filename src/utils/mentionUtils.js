var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }

const string_prototype_matchall_1 = __importDefault(
  require("string.prototype.matchall")
)

const mentionRegEx = /((.)\[([^[]*)]\(([^(^)]*)\))/gi

const defaultPlainStringGenerator = ({ trigger }, { name }) =>
  `${trigger}${name}`

const generateRegexResultPart = (partType, result, positionOffset = 0) => ({
  text: result[0],
  position: {
    start: positionOffset,
    end: positionOffset + result[0].length,
  },
  partType,
})

const isMentionPartType = (partType) => {
  return partType.trigger != null
}

const generatePlainTextPart = (text, positionOffset = 0) => ({
  text,
  position: {
    start: positionOffset,
    end: positionOffset + text.length,
  },
})

const getMentionDataFromRegExMatchResult = ([
  ,
  original,
  trigger,
  name,
  id,
]) => ({
  original,
  trigger,
  name,
  id,
})

const generateMentionPart = (mentionPartType, mention, positionOffset = 0) => {
  const text = mentionPartType.getPlainString
    ? mentionPartType.getPlainString(mention)
    : defaultPlainStringGenerator(mentionPartType, mention)
  return {
    text,
    position: {
      start: positionOffset,
      end: positionOffset + text.length,
    },
    partType: mentionPartType,
    data: mention,
  }
}

export const parseValue = (value, partTypes, positionOffset = 0) => {
  if (value == null) {
    value = ""
  }
  let plainText = ""
  let parts = []
  // We don't have any part types so adding just plain text part
  if (partTypes.length === 0) {
    plainText += value
    parts.push(generatePlainTextPart(value, positionOffset))
  } else {
    const [partType, ...restPartTypes] = partTypes
    const regex = isMentionPartType(partType) ? mentionRegEx : partType.pattern
    const matches = Array.from(
      string_prototype_matchall_1.default(
        value !== null && value !== void 0 ? value : "",
        regex
      )
    )
    // In case when we didn't get any matches continue parsing value with rest part types
    if (matches.length === 0) {
      return parseValue(value, restPartTypes, positionOffset)
    }
    // In case when we have some text before matched part parsing the text with rest part types
    if (matches[0].index != 0) {
      const text = value.substr(0, matches[0].index)
      const plainTextAndParts = parseValue(text, restPartTypes, positionOffset)
      parts = parts.concat(plainTextAndParts.parts)
      plainText += plainTextAndParts.plainText
    }
    // Iterating over all found pattern matches
    for (let i = 0; i < matches.length; i++) {
      const result = matches[i]
      if (isMentionPartType(partType)) {
        const mentionData = getMentionDataFromRegExMatchResult(result)
        // Matched pattern is a mention and the mention doesn't match current mention type
        // We should parse the mention with rest part types
        if (mentionData.trigger !== partType.trigger) {
          const plainTextAndParts = parseValue(
            mentionData.original,
            restPartTypes,
            positionOffset + plainText.length
          )
          parts = parts.concat(plainTextAndParts.parts)
          plainText += plainTextAndParts.plainText
        } else {
          const part = generateMentionPart(
            partType,
            mentionData,
            positionOffset + plainText.length
          )
          parts.push(part)
          plainText += part.text
        }
      } else {
        const part = generateRegexResultPart(
          partType,
          result,
          positionOffset + plainText.length
        )
        parts.push(part)
        plainText += part.text
      }
      // Check if the result is not at the end of whole value so we have a text after matched part
      // We should parse the text with rest part types
      if (result.index + result[0].length !== value.length) {
        // Check if it is the last result
        const isLastResult = i === matches.length - 1
        // So we should to add the last substring of value after matched mention
        const text = value.slice(
          result.index + result[0].length,
          isLastResult ? undefined : matches[i + 1].index
        )
        const plainTextAndParts = parseValue(
          text,
          restPartTypes,
          positionOffset + plainText.length
        )
        parts = parts.concat(plainTextAndParts.parts)
        plainText += plainTextAndParts.plainText
      }
    }
  }
  // Exiting from parseValue
  return {
    plainText,
    parts,
  }
}

export const replaceMentionValues = (value, replacer) =>
  value.replace(mentionRegEx, (fullMatch, original, trigger, name, id) =>
    replacer({
      original,
      trigger,
      name,
      id,
    })
  )
