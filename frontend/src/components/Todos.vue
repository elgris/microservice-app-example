<template>
  <div>
    <app-nav></app-nav>
    <div class='container'>

      <div class="row">
        <div class="col-sm-12 text-left">
        <h1>
          TODOs
          <transition name="fade">
            <small v-if="total">({{ total }})</small>
          </transition>
        </h1>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-10">
          <input type="text"
                class="form-control"
                v-model="newTask"
                @keyup.enter="addTask"
                placeholder="New task"
          >
        </div>
        <div class="col-sm-2 text-right">
          <button type="submit" class="btn btn-primary" @click="addTask" >Add todo</button>
        </div>
      </div>

      <div class="row">
        <transition-group name="fade" tag="ul" class="no-bullet list-group col-sm-12 my-4">
                  <todo-item v-for="(todo, index) in tasks"
                            @remove="removeTask(index)"
                            :todo="todo"
                            :key="index"
                  ></todo-item>
        </transition-group>
      </div>

    </div>
  </div>
</template>

<script>
import AppNav from '@/components/AppNav'
import TodoItem from '@/components/TodoItem'

export default {
  name: 'todos',
  components: {AppNav, TodoItem},
  props: {
    tasks: {
      default: function () {
        return [
          {
            id: 1,
            content: 'Create new todo'
          },
          {
            id: 2,
            content: 'TODO#2'
          }
        ]
      }
    }
  },
  data () {
    return {
      newTask: ''
    }
  },
  computed: {
    total () {
      return this.tasks.length
    }
  },
  methods: {
    addTask () {
      if (this.newTask) {
        this.tasks.push({
          content: this.newTask
        })
        this.newTask = ''
      }
    },
    removeTask (index) {
      this.tasks.splice(index, 1)
    }
  }
}
</script>