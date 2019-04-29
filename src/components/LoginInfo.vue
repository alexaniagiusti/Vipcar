<template>
  <div class="login-info">
    <span>

      <a id="show-shortcut" data-action="toggleShortcut">
        <!-- <img src="static/template/img/avatars/sunny.png" alt="me" class="online" />  -->
        <span>
          {{ userName }}
        </span>
        <i class="fa fa-angle-down"></i>
      </a> 
    </span>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    computed: {
      ...mapState({
        userName: (state) => state.user.userName
      })
    }
  }
</script>
