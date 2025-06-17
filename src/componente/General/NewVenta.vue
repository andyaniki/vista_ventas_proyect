<template>
    <v-dialog v-model="internalModalOpen" max-width="55%" transition="dialog-top-transition" persistent>
        <form @submit.prevent="saveVenta">
            <v-card prepend-icon="mdi-account-injury" :title="state === 'new' ? 'Nueva Venta' : 'Editar Venta'">
                <v-divider></v-divider>
                <v-card-text>
                    <!-- Selección de Artículo -->
                    <v-row cols="12">
                        <v-col cols="6">
                            <v-select v-model="selectedArticulo" :items="articulos" item-value="value" item-text="label"
                                label="Seleccione un Artículo"></v-select>

                        </v-col>

                        <!-- Valor de Venta -->
                        <v-col cols="6">
                            <v-text-field v-model="ventaValor" label="Valor de Venta" clearable density="compact"
                                prepend-inner-icon="mdi-currency-usd" required
                                :rules="[v => !!v || 'El valor de venta es requerido']" type="number"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="closeModal" prepend-icon="mdi-close-circle">Cerrar</v-btn>
                    <v-btn color="primary" type="submit" :disabled="!isFormValid">Guardar</v-btn>
                </v-card-actions>
            </v-card>
        </form>
    </v-dialog>
</template>

<script setup>
import { ref, watch, onMounted, defineEmits } from 'vue';
import { obtenerInformacionArticulo } from "../../services/VentasServices";
import axios from 'axios';
import { SaveVentas } from "../../services/VentasServices";

const props = defineProps({
    isModalOpen: Boolean,
    state: String,
});

const emit = defineEmits();  // Define emitters

const internalModalOpen = ref(props.isModalOpen);

watch(() => props.isModalOpen, (newVal) => {
    internalModalOpen.value = newVal;
});

const selectedArticulo = ref(null);
const articulos = ref([]);
const ventaValor = ref(null);

const isFormValid = ref(false);

// Validación del formulario
watch([() => selectedArticulo.value, () => ventaValor.value], () => {
    isFormValid.value = selectedArticulo.value && ventaValor.value;
});

// Lógica para obtener artículos
const obtenerarticulos = async () => {
    try {
        const response = await obtenerInformacionArticulo();
        articulos.value = response.data.map(articulo => ({
            value: articulo.value, // ID del artículo
            label: articulo.label, // Nombre del artículo
        }));
        console.log('Artículos obtenidos:', articulos.value);
    } catch (error) {
        console.error('Error al obtener artículos:', error);
    }
};

// Llamada a la API cuando el componente se monta
onMounted(() => {
    obtenerarticulos();
});

// Función para guardar la venta
const saveVenta = async () => {
    try {
        const ventaData = {
            articulo_id: selectedArticulo.value,
            valor_venta: ventaValor.value,
        };
        console.log('Datos de la venta:', ventaData);
        const response = await SaveVentas(ventaData);
        closeModal();
    } catch (error) {
        console.error('Error al guardar la venta:', error);
    }
};

const closeModal = () => {
    emit('close');  // Emite el evento para cerrar el modal
};
</script>
