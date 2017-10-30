<template>
    <li class="list-group-item py-0 px-0 ml-3">
      <div class="col-sm-11 text-left">
        {{ todo.content }}
      </div>

      <div class="col-sm-1 text-right px-0">
          <button class="btn btn-danger"
                  @click="$emit('remove')"
          > X
          </button>        
      </div>

        
    </li>
</template>


<script>
export default {
  name: 'todo-item',
  props: ['todo']
}
</script>