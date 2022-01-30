<template>
  <div class="todoApp">
    <p>{{ remainingTodo }} items remaining</p>
    <div class="addTodo">
      <input class="todoName" type="text" v-model="name">
      <button class="button" @click="addTodo">
        <span>New</span>
      </button>
    </div>
    <ul class="todoList">
      <li class="emptyList" v-if="!todoList.length">No Items Found</li>
      <li 
        v-for="todo in todoList" 
        :key="todo.id" 
        :class="{completed: todo.completed}"
      >
        <input 
          class="completeCheckbox"
          type="checkbox" 
          :checked="todo.completed"
          @input="todo.completed = !todo.completed"
        >
        <input 
          class="editTodoName"
          type="text" 
          v-model="todo.name"
        >
        <button @click="deleteTodo(todo.id)">Delete</button>
      </li>
    </ul>
    <button class="clearButton" v-if="todoList.length" @click="clearCompleted">Clear Completed</button>
  </div>
</template>

<script>
export default {
  name: 'Todo',
  props: {
  },
  data() {
    return {
      counter: 1,
      name: '',
      todoList: [],
    };
  },
  methods: {
    addTodo() {
      if(this.name.trim() === '') {
        this.name = '';
        return;
      }
      this.todoList.push({
        id: this.counter,
        name: this.name,
        completed: false,
      });
      this.counter++;
      this.name = '';
    },
    deleteTodo(idToDelete) {
      this.todoList = this.todoList.filter((todo) => todo.id !== idToDelete)
    },
    clearCompleted() {
      this.todoList = this.todoList.filter((todo) => !todo.completed)
    }
  },
  computed: {
    remainingTodo() {
      return this.todoList.filter((todo) => !todo.completed).length
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
html,body{
  margin: 0;
  padding: 0;
  font-size: 18px;
}
.todoApp{
  height: 100vh;
  .addTodo{
    width: 50%;
    margin: auto;
  }
  .todoName{
    border: 1px solid #bbb;
    line-height: 2rem;
    width: 65%;
    &:focus{
      outline: none;
      border-color: #004B84;
    }
  }
  .button{
    cursor: pointer;
    margin-left: 2%;
    line-height: 2rem;
    width: 18%;
    border: 1px solid #000;
    background: #bbb;
    padding: 3px 10px;
    color: #000;
    font-size: 12px;
    text-decoration: none;
    vertical-align: middle;
    border-radius: 4px;
    transition: all 0.2s linear 0s;
    span{
      color: #000;
      border-color: #004B84;
    }
  }

  .button:hover span {
    display:none;
    right: 0;
  }

  .button:hover:before {
    content:"Add Todo!";
  }

  .button:hover {
    color: #fff;
    background-color: #004B84;
  }
  .clearButton{
    cursor: pointer;
    margin-left: 2%;
    line-height: 2rem;
    width: 18%;
    border: 1px solid #000;
    background: #bbb;
    padding: 3px 10px;
    color: #000;
    font-size: 12px;
    text-decoration: none;
    vertical-align: middle;
    border-radius: 4px;
    transition: all 0.2s linear 0s;
  }
  .clearButton:hover {
    color: #fff;
    background-color: #004B84;
  }
  .todoList{
    list-style: none;
    width: 50%;
    margin: auto;
    li{
      background: #bbb;
      margin: 10px auto;
      padding: 10px 0;
      .editTodoName{
        width: 60%;
        height: 30px;
        font-size: 16px;
        background: transparent;
        border: none;
        outline: none;
        &:focus{
          border-bottom: 1px solid #000;
        }
      }
      .completeCheckbox{
        width: 10%;
        height: 36px;
        margin: 0;
        outline: none;
        vertical-align: middle;
        cursor: pointer;
      }
      button{
        width: 12%;
        margin-left: 3%;
        height: 36px;
        cursor: pointer;
        background: #bbb;
        color: #000;
        outline: none;
        border: 1px solid #000;
        border-radius: 4px;
        transition: all 0.2s linear 0s;
        &:hover{
          letter-spacing: 2px;
          width: 14%;
          margin-left: 1%;
        }
      }
      &.completed{
        background: rgb(23, 180, 94);
      }
    }
  }
}
</style>
