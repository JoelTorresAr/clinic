<template>
  <div>      
    <v-row>
      <v-btn color="primary" dark @click="getUrl()">Consultar</v-btn>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    texto: '',
  }),
  methods: {
    getUrl(){
       this.$http
        .get(
          `http://ozhealthapache.linkpc.net:8080/preventiva/prueba.pro`
        )
        .then(({ data }) => {
          this.texto = data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

}
</script>

<style>

</style>