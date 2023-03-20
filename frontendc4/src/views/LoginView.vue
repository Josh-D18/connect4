<template>
  <div class="login">
    <h2 class="text-[24px] text-green-400 leading-6 tracking-12">Login</h2>
    <LoginComponent />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import LoginComponent from "@/components/Auth/Login/LoginComponent.vue";

@Options({
  components: {
    LoginComponent,
  },
})
export default class LoginView extends Vue {}
</script>
