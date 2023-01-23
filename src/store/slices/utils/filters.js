export const removeDuplicates = arr =>
  arr.filter((el, index) => arr.findIndex(e => e.value === el.value) === index)

export const removeDuplicatesWithSet = arr =>
  [...new Set(arr.map(obj => obj.value))].map(value =>
    arr.find(obj => obj.value === value),
  )
