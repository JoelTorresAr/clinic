<template>
  <div class="full-height flex items-center">
    <div class="container mx-auto py-10">
      <div
        class="border m-6 rounded-lg bg-white mx-auto max-w-sm shadow-lg rounded-lg overflow-hidden"
      >
        <div class="sm:flex sm:items-center px-6 py-4">
          <div class="w-full max-w-xs">
            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div class="mb-4">
                <v-text-field
                  v-model="user"
                  label="Usuario*"
                  type="text"
                  color="orange accent-3"
                  class="block text-gray-700 text-sm font-bold mb-2"
                  required
                />
              </div>
              <div class="mb-6">
                <v-text-field
                  v-model="password"
                  label="Password*"
                  type="password"
                  color="orange accent-3"
                  class="block text-gray-700 text-sm font-bold mb-2"
                  required
                />
                <p class="text-red-500 text-xs italic">Por favor ingrese su password.</p>
              </div>
              <div class="flex items-center justify-between">
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button" @click="login()"
                >
                  Ingresar
                </button>
                <a
                  class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                  href="#"
                >Cancelar</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    user: "julio",
    password: "julio"
  }),
  methods: {
    login() {
      this.$http
        .get(
          `http://ozhealthapache.linkpc.net:8080/preventiva/login.pro?parm_user=${this.user}&parm_pw=${this.password}`
        )
        .then(({ data }) => {
          if(data.status == 1){
            console.log(data.status)
            this.$router.push({ name: "Matrix" });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style>
.full-height {
  height: 80vh;
}
</style>