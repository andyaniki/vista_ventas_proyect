<template>
  <v-app>
    <ToolBar pageTitle="Ventas de Articulos"></ToolBar>
    <v-container>
      <v-row>
        <v-col cols="12" class="d-flex justify-start">
          <h2 class="text-h4">Ventas de Articulos</h2>
        </v-col>
      </v-row>
      <v-row>
        <AdaptativeBreadcrumbs :routes="routes"></AdaptativeBreadcrumbs>
      </v-row>
      <v-row>
        <v-expansion-panels variant="accordion">
          <v-expansion-panel title="Search Filters">
            <v-expansion-panel-text>
              <v-row cols="12">
                <v-col cols="6">
                  <v-text-field
                    v-model="filtros.nombre"
                    density="compact"
                    label="Usuario"
                    clearable
                    variant="outlined"
                    prepend-inner-icon="mdi-account-injury"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6" class="d-flex justify-start">
                  <v-btn
                    prepend-icon="mdi-account-plus"
                    color="white"
                    class="me-2"
                    @click="openModal"
                  >
                    Nueva Venta
                  </v-btn>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="6" class="d-flex justify-end">
                  <v-btn
                    prepend-icon="mdi-eraser"
                    color="black"
                    class="me-2"
                    @click="cleanFilters"
                  >
                    Clear
                  </v-btn>
                  <v-btn
                    prepend-icon="mdi-cloud-search"
                    color="blue-accent-2"
                    @click="buscarClientes"
                  >
                    Search
                  </v-btn>
                </v-col>
              </v-row>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>

      <!-- Tabla de productos -->
      <v-row>
        <v-card class="pa-md-3 elevation-1" width="100%">
          <div class="table-container">
            <v-data-table-server
              v-model:items-per-page="itemsPerPage"
              :headers="columns"
              :items="usuarios"
              :items-length="totalItems"
              :loading="loading"
              loading-text="Loading Records...Please wait"
              :search="search"
              item-value="codigo_articulo"
              @update:options="getDoctorPatients"
              fixed-header
            >
              <template v-slot:header="{ props }">
                <thead>
                  <tr>
                    <th v-for="column in props.headers" :key="column.text" :style="{ width: column.width }">
                      {{ column.text }}
                    </th>
                  </tr>
                </thead>
              </template>

              <template v-slot:item="{ item }">
                <tr>
                  <td class="text-center">{{ item.codigo_articulo }}</td>
                  <td class="text-left">{{ item.desc_articulo }}</td>
                  <td class="text-left">{{ item.descripcion_localidad }}</td>
                  <td class="text-left">{{ item.nombre }}</td>
                  <td class="text-right">{{ item.valor_venta }}</td>
                </tr>
              </template>
            </v-data-table-server>
          </div>
        </v-card>
      </v-row>
    </v-container>

    <!-- Modal Nueva Venta -->
 <NewVenta
  :isModalOpen="isModalOpen"
  :state="state"
  @close="closeModal"
/>
  </v-app>
</template>

<script>
import { ref } from "vue";
import { obtener_ventas } from "../services/VentasServices";
import NewVenta from "../componente/General/NewVenta.vue";

export default {
  components: {
    NewVenta,
  },
  data() {
    return {
      isModalOpen: false,  // Controla la visibilidad del modal
      state: '',  // Guarda el estado (nuevo o editar)
      filtros: {
        nombre: "",
      },
      usuarios: [], 
      loading: false,
      itemsPerPage: 10, 
      columns: [
        { text: "Código", value: "codigo_articulo", width: "150px" },
        { text: "Descripción", value: "desc_articulo", width: "250px" },
        { text: "Localidad", value: "descripcion_localidad", width: "200px" },
        { text: "Nombre", value: "nombre", width: "200px" },
        { text: "Valor de Venta", value: "valor_venta", width: "150px" }
      ],
      totalItems: 0,
      search: "",
      currentPage: 1, 
    };
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
      this.state = 'new';  // Establece el estado a "nuevo"
    },

    closeModal() {
      this.isModalOpen = false;
    },

    async buscarClientes() {
      try {
        this.loading = true;
        const params = {
          nombre: this.filtros.nombre,
          page: this.currentPage,
          itemsPerPage: this.itemsPerPage, 
        };
        const response = await obtener_ventas(params); 
        console.log("Respuesta de búsqueda:", response);
        this.usuarios = response.data.data; 
        this.totalItems = response.data.total; 
      } catch (error) {
        console.error("Error buscando clientes:", error);
      } finally {
        this.loading = false;
      }
    },

    getDoctorPatients(options) {
      this.currentPage = options.page;
      this.buscarClientes(); 
    },

    cleanFilters() {
      this.filtros.nombre = "";
      this.buscarClientes(); 
    },
  },
  mounted() {
    this.buscarClientes(); 
  },
};
</script>

<style scoped>
.table-container {
  max-height: 400px;
  overflow-y: auto;
  overflow-x: auto;
  white-space: nowrap;
}
</style>
