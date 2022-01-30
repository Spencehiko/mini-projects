import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

const store = new Vuex.Store({
  state: {
    counter: 0,
    todos: [],
    newTodo: '',
  },
  mutations: {
    addTodo(state, name) {
      state.todos.push({
        id: state.counter,
        name: name,
        completed: false,
      })
      state.counter++
    },
    editTodo(state, editTodo) {
      const index = state.todos.findIndex((todo) => todo.id === editTodo.id);
      state.todos[index].name = editTodo.name;
    },
    updateTodo(state, newVal) {
      state.todos = newVal;
    }
  },
  actions: {
    getTodos(state) {
      return state.todos;
    }
  },
  modules: {
  },
  getters: {
    todos(state) {
      return state.todos;
    },
    newTodo(state) {
      return state.newTodo;
    },
    remainingTodosCount: (state) => {
      return state.todos.filter(todo => !todo.completed).length
    },
  },
  plugins: [createPersistedState()]
})
export default store