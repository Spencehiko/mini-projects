import { createStore } from 'vuex'

export default createStore({
  state: {
    todos: [],
    newTodo: '',
  },
  mutations: {
    getTodo(state, todo){
      state.newTodo = todo
    },
    addTodo(state){
      state.todos.push({
        body: state.newTodo,
        completed: false
      })
    },
    editTodo(state, todo){
       var todos = state.todos
       todos.splice(todos.indexOf(todo), 1)
       state.todos = todos
       state.newTodo = todo.body
    },
    removeTodo(state, todo){
       var todos = state.todos
       todos.splice(todos.indexOf(todo), 1)
    },
    completeTodo(state, todo){
      todo.completed = !todo.completed
    },
    clearTodo(state){
      state.newTodo = ''
    }
  },
  actions: {
    getTodo({commit}, todo){
      commit('getTodo', todo)
    },
    addTodo({commit}){
      commit('addTodo')
    },
    editTodo({commit}, todo){
      commit('editTodo', todo)
    },
    removeTodo({commit}, todo){
      commit('removeTodo', todo)
    },
    completeTodo({commit}, todo){
     commit('completeTodo', todo)
    },
    clearTodo({commit}){
      commit('clearTodo')
    }
  },
  modules: {
  }
})
