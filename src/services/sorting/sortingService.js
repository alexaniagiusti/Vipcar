class SortingService {
  constructor (component, initialField, initialSort, callback) {
    this.field = initialField
    this.sort = initialSort
    this.component = component
    this.callback = callback
  }

  byField (field) {
    this.field = field
    this.runCallback()
  }

  sortBy (sort) {
    this.sort = sort
    this.runCallback()
  }

  setup (field, sort) {
    this.field = field
    this.sort = sort
    this.runCallback()
  }

  matchSort (sort) {
    return this.sort === sort
  }

  matchField (field) {
    return this.field === field
  }

  matchPair (field, sort) {
    return this.matchField(field) && this.matchSort(sort)
  }

  runCallback () {
    this.callback()
  }

  getRequestParams () {
    return {
      o: this.field,
      s: this.sort
    }
  }
}

export default SortingService
