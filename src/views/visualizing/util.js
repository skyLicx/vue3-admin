export function nameFormat(name, splitLength) {
  let nameArr = []
  let nameIndex = 0
  while (nameIndex < name.length) {
    nameArr.push(name.substring(nameIndex, nameIndex + splitLength))
    nameIndex += splitLength
  }
  return nameArr.join('\n')
}
