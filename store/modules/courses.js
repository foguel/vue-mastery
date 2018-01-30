import * as types from '../mutation-types'

let db = null

// initial state
const state = {
  courses: null,
  course: null,
  lessons: null,
  latests: null,
  free: null
}

// getters
const getters = {
  allCourses: state => state.courses,
  course: state => state.course,
  lessons: state => state.lessons,
  latests: state => state.latests,
  free: state => state.free
}

// actions
const actions = {
  getAllCourses ({ commit, state }) {
    return db.get('courses', {
      populate: [
        {
          field: 'image',
          subFields: [ 'image' ]
        }
      ]})
      .then(courses => {
        commit(types.RECEIVE_COURSES, { courses })
      })
  },
  getCourse ({ commit, state }, id) {
    return db.get('courses', id, {
      populate: [
        {
          field: 'image',
          subFields: [ 'image' ]
        },
        {
          field: 'lessons',
          subFields: [ 'lessons' ]
        }
      ]})
      .then(course => {
        commit(types.RECEIVE_COURSE, { course })
      })
  },

  lastVideos ({ commit, state }) {
    return db.get('lessons', {
      limitToLast: 3,
      populate: [{
        field: 'lessons',
        subFields: [ 'lessons' ]
      }]
    }).then(latests => {
      commit(types.RECEIVE_LATEST_VIDEOS, { latests })
    })
  },

  freeVideos ({ commit, state }) {
    // Check if the video is free
    return db.get('lessons', {
      limitToLast: 3,
      populate: [{
        field: 'image',
        subFields: [ 'image' ]
      }]
    }).then(free => {
      commit(types.RECEIVE_FREE_VIDEOS, { free })
    })
  }
}

// mutations
const mutations = {
  [types.APP_READY] (state, app) {
    db = app.content
  },
  [types.RECEIVE_COURSES] (state, { courses }) {
    state.courses = courses
  },
  [types.RECEIVE_COURSE] (state, { course }) {
    state.course = course
  },
  [types.RECEIVE_LATEST_VIDEOS] (state, { latests }) {
    state.latests = latests
  },
  [types.RECEIVE_FREE_VIDEOS] (state, { free }) {
    state.free = free
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}