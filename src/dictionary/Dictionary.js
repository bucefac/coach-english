import rand from 'lodash/random'
import * as themes from './themes'

class Dictionary {
  static THEMES = ['all', ...Object.keys(themes)]
  constructor (theme = 'all') {
    this._theme = theme
    this._dict = {}
    for (let name of Dictionary.THEMES.slice(1)) {
      for (let [key, val] of Object.entries(themes[name])) {
        if (this._dict[key]) {
          this._dict[`${key}__${name}`] = val
        } else {
          this._dict[key] = val
        }
      }
    }
    this._initSize()
  }
  getRandom () {
    const index = rand(0, this._dictSize - 1)
    return Object.values(this.dictionary)[index]
  }
  setTheme (theme) {
    this._theme = theme
    this._initSize()
  }
  _initSize () {
    this._dictSize = Object.keys(this.dictionary).length
  }
  get isAll () {
    return this._theme === 'all'
  }
  get dictionary () {
    return this.isAll ? this._dict : themes[this._theme]
  }
}

export default Dictionary