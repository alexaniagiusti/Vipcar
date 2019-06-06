<template>
  <div>
    <div id="content" class="container">
      <div class="row">
        <div class="col-xs-12 center col-sm-12 col-md-12 col-lg-4 col-lg-offset-4">
          <div class="center well no-padding">
            <form action="index.html" id="login-form" class="smart-form client-form">
              <header>
                <i class="fa fa-lg fa-lock"></i> ÁREA RESTRITA
              </header>
              <login-form></login-form>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
  import loginForm from '@/components/Auth/LoginForm'
  export default {
    components: {
      'login-form': loginForm
    }
  }
</script>
