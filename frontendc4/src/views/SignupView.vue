<template>
  <div class="signup">
    <h2 class="text-[24px] text-green-400 leading-6 tracking-12">Sign Up</h2>
    <SignupComponent />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import SignupComponent from "@/components/Auth/Signup/SignupComponent.vue";

@Options({
  components: {
    SignupComponent,
  },
})
export default class SignupView extends Vue {}
</script>
