const searchOptions = {
  minMatchCharLength: 0,
  threshold: 0.3,
  // isCaseSensitive: false,
  // includeScore: false,
  // shouldSort: true,
  // includeMatches: false,
  // findAllMatches: false,
  // location: 0,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreLocation: true,
  // ignoreFieldNorm: false,
  keys: ['name', 'colour', 'gender', 'category'],
}

export default searchOptions
