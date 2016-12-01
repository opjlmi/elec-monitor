import moment from 'moment'

const state = {
  show: false,
  x: 0,
  y: 0,
  picker: '',
  type: 'date',
  value: '',
  begin: '',
  end: '',
  sep: '/',
  weeks: [],
  months: [],
  range: false,
  items: {
    fromDate: {
      type: 'datetime',
      value: '',
      sep: '-',
    },
    toDate: {
      type: 'datetime',
      value: '',
      sep: '-',
    },
  },
  xhr: null,
}

// getters
const getters = {

}

// mutations
const mutations = {

}

// actions
const actions = {
  CALENDAR_REQUEST({ commit, state, rootState }, { start, end }) {
    // 2016/11/08 05:00:38
    rootState.report.msg = `Searching...${moment(start).format()}~${moment(end).format()}`
    if (state.xhr) {
      state.xhr.abort()
    }
    state.xhr = new XMLHttpRequest()
    const self = this
    state.xhr.open('GET', `/api/v1/search/${rootState.sitename}?g=harmonic,thd&start=${start}&end=${end}`)
    state.xhr.onload = () => {
      const res = JSON.parse(state.xhr.responseText)
      // commit('REQUEST', { path: this.$route.path, res })
      rootState.report.msg = res
    }
    state.xhr.send()
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
