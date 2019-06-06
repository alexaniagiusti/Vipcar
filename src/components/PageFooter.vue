<template>
  <div class="page-footer hidden-print">
    <div class="row">
      <div class="col-xs-12 col-sm-6">
        <span class="txt-color-white">MSB Tech © 2017</span>
      </div>
      <last-activity></last-activity>
    </div>
  </div>
</template>

<script>
  import LastActivity from '@/components/LastActivity'

  export default {
    components: {
      'last-activity': LastActivity
    }
  }
</script>
