<template>
  <div>
    <v-row>
      <v-col cols="6">
        <v-select
          v-model="modelPatient"
          :items="patients"
          label="Paciente*"
          required
          item-text="name"
          item-value="id"
        ></v-select>
      </v-col>
      <v-col cols="2">
        <v-menu
          ref="menuOne"
          v-model="menuOne"
          :close-on-content-click="false"
          :return-value.sync="dateOne"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dateOne"
              label="Fecha desde"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="dateOne" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menuOne = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.menuOne.save(dateOne)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="2">
        <v-menu
          ref="menuTwo"
          v-model="menuTwo"
          :close-on-content-click="false"
          :return-value.sync="dateTwo"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dateTwo"
              label="Fecha hasta"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="dateTwo" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menuTwo = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.menuTwo.save(dateTwo)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="2">
        <v-select
          v-model="modelExamType"
          :items="examType"
          label="Tipo de examen*"
          required
          item-text="name"
          item-value="id"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-data-table :headers="headers" :items="desserts" :items-per-page="5" class="elevation-1">
        <template slot="items" slot-scope="props">
          <td>
            <div v-line-clamp="3">{{ props.item.name }}</div>
          </td>
          <td class="text-xs-right">{{ props.item.calories }}</td>
          <td class="text-xs-right">{{ props.item.fat }}</td>
          <td class="text-xs-right">{{ props.item.carbs }}</td>
          <td class="text-xs-right">{{ props.item.protein }}</td>
          <td class="text-xs-right">{{ props.item.iron }}</td>
        </template>
      </v-data-table>
    </v-row>
    <v-row justify="center">
      <v-dialog v-model="dialog" scrollable max-width="400px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">Abrir PDF</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <input v-model.number="page" type="number" style="width: 5em" />
            /{{numPages}}
            <button @click="rotate += 90">&#x27F3;</button>
            <button @click="rotate -= 90">&#x27F2;</button>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text style="height: 400px;">
            <div
              v-if="loadedRatio > 0 && loadedRatio < 1"
              style="background-color: green; color: white; text-align: center"
              :style="{ width: loadedRatio * 100 + '%' }"
            >{{ Math.floor(loadedRatio * 100) }}%</div>
            <pdf
              ref="pdf"
              style="border: 1px solid red"
              :src="src"
              :page="page"
              :rotate="rotate"
              @password="password"
              @progress="loadedRatio = $event"
              @error="error"
              @num-pages="numPages = $event"
              @link-clicked="page = $event"
            ></pdf>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="$refs.myPdfComponent.print()">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
   <!-- <v-row justify="center">
      <v-dialog v-model="dialog" scrollable max-width="400px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">Abrir PDF</v-btn>
        </template>
        <v-card>
          <v-card-title>{{currentPage}}/{{numPages}}</v-card-title>
          <v-divider></v-divider>
          <v-card-text style="height: 400px;">
            <pdf
              ref="myPdfComponent"
              v-for="i in numPages"
              :key="i"
              :src="src"
              :page="i"
              style="display: inline-block; width: 100%"
            ></pdf>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="$refs.myPdfComponent.print()">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>-->
  </div>
</template>

<script>
import pdf from "vue-pdf";
export default {
  components: {
    pdf
  },
  data: () => ({
    patients: [],
    modelPatient: "",
    dateOne: new Date().toISOString().substr(0, 10),
    dateTwo: new Date().toISOString().substr(0, 10),
    menuOne: false,
    menuTwo: false,
    examType: [],
    modelExamType: "",
    headers: [],
    desserts: [],
    dialog: false,
    src: "",
    loadedRatio: 0,
    page: 1,
    numPages: 0,
    rotate: 0
  }),
  created() {
    this.patients = [
      { id: "01", name: "Jose Tapia" },
      { id: "02", name: "Arturo Galdos" },
      { id: "03", name: "Juan Paredez" }
    ];
    this.examType = [
      { id: "01", name: "Prueba" },
      { id: "02", name: "Medicina interna" },
      { id: "03", name: "Radioterapia" }
    ];
    this.headers = [
      {
        text: "Dessert (100g serving)",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "Calories", value: "calories" },
      { text: "Fat (g)", value: "fat" },
      { text: "Carbs (g)", value: "carbs" },
      { text: "Protein (g)", value: "protein" },
      { text: "Iron (%)", value: "iron" }
    ];
    this.desserts = [
      {
        name: "Frozen Yogurt",
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron:
          "1%khfygsfyejgfsyejsgygsfsgygesfgsyfgsyfjgsegsefgsefgjsygsefgsjfygsyjgsfjsgefjysgefjsgfjysgfjsgfyjsgfsjgfseyjfgsejyfgsjyfgsejyfgsjfgsefyjsegsfyegfsefggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg"
      },
      {
        name: "Ice cream sandwich",
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        iron: "1%"
      },
      {
        name: "Eclair",
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        iron: "7%"
      },
      {
        name: "Cupcake",
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        iron: "8%"
      },
      {
        name: "Gingerbread",
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
        iron: "16%"
      },
      {
        name: "Jelly bean",
        calories: 375,
        fat: 0.0,
        carbs: 94,
        protein: 0.0,
        iron: "0%"
      },
      {
        name: "Lollipop",
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0,
        iron: "2%"
      },
      {
        name: "Honeycomb",
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
        iron: "45%"
      },
      {
        name: "Donut",
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
        iron: "22%"
      },
      {
        name: "KitKat",
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
        iron: "6%"
      }
    ];
  },
  mounted() {
    this.src = 
      "http://www.getfreestories.weebly.com/uploads/7/9/0/2/79020522/harry_potter_and_the_sorcerers_-_j.k._rowling.pdf";
  },
  methods: {
    password: function(updatePassword, reason) {
      updatePassword(prompt('password is "test"'));
      console.log(reason);
    },
    error: function(err) {
      console.log(err);
    }
  }
};
</script>

<style>
.v-data-table {
  width: 100% !important;
  display: block;
  overflow-x: auto;
  white-space: nowrap;
}
</style>