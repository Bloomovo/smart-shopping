const HISTORY_KEY = 'hm_history_list'

export const getSearchInfo = () => {
  const history = localStorage.getItem(HISTORY_KEY)
  return history ? JSON.parse(history) : []
}

export const setSearchInfo = (history) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
}
