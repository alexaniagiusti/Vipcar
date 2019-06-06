<template>
  <div>
    <div class="wrapper-breadcrumb col-xs-12 col-sm-7 col-md-7 col-lg-4">
      <ol class="breadcrumb">
        <li v-for="(track, index) in trackList">
          <router-link :to="{path: track.url}">
            <i :class="'fa fa-' + track.icon"></i>
            {{ track.label }}
          </router-link>
        </li>
      </ol>
    </div>
    <div v-if="currentRoute === '/'"class="wrapper-indicators col-xs-12 col-sm-5 col-md-5 col-lg-8">
      <ul id="sparks" class="">
        <li class="sparks-info">
          <h5> Negociações em andamento <span class="txt-color-blue">R$ 0</span></h5>
        </li>
        <li class="sparks-info">
          <h5> Neg. Pendentes
            <span class="txt-color-purple">
            <!--   <i 
                class="fa fa-arrow-circle-up"
                data-rel="bootstrap-tooltip"
                title="Increased"></i> -->
                &nbsp;0%
            </span>
          </h5>
        </li>
        <li class="sparks-info">
          <h5>
            Neg. Concluídas <span class="txt-color-greenDark"><i class="fa fa-shopping-cart"></i>&nbsp;0</span></h5>
          <div class="sparkline txt-color-greenDark hidden-mobile hidden-md hidden-sm"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'Breadcrumb',
    data () {
      return {
        currentRoute: null
      }
    },
    computed: {
      ...mapState({
        'trackList': state => state.breadcrumb.list
      })
    },
    watch: {
      '$route' (to, from) {
        this.currentRoute = to.path
      }
    },
    mounted () {
      this.$root.bus.$on('push-breadcrumb', (stack) => {
        this.$store.dispatch('breadcrumb/PUSH_BREADCRUMB_ITEM', stack)
      })
    }
  }
</script>
