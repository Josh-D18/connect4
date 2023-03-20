<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      data: {
        username: "",
        userPassword: "",
      },
    };
  },
  methods: {
    async handleSubmit(): Promise<
      | {
          error: unknown;
        }
      | undefined
    > {
      const data = this.data;
      try {
        await axios.post("http://localhost:3000/auth/signup", {
          ...data,
        });
        this.$router.push("/");
      } catch (error) {
        return { error };
      }
    },
  },
});
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="py-[10px]">
      <label for="username" class="block">Username</label>
      <input
        name="username"
        v-model="data.username"
        id="username"
        class="border-2 border-black rounded-md px-2 h-[30px]"
      />
    </div>
    <div class="py-[10px]">
      <label for="password" class="block">Password</label>
      <input
        name="password"
        type="password"
        v-model="data.userPassword"
        id="password"
        class="border-2 border-black rounded-md px-2 h-[30px]"
      />
    </div>
    <button type="submit" class="bg-blue-500 text-white py-2 px-6 rounded-md">
      Submit
    </button>
  </form>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
