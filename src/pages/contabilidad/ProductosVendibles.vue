<template>
  <q-page>
    <q-table
      v-show="!create"
      :tittle="tableTitle"
      :rows="genericRows"
      :columns="genericColumns"
      row-key="id"
      :filter="filter"
      />
  </q-page>
</template>

<script>
export default{
  name: "Test",
  created (){},
  data(){
  return {
    genericColumns:[
      {
        name:"imagen",
        label:"abcd",
        sortable: true,
        field:"imagen"
      },
      {
        name:"Nombre",
        label:"abcd",
        sortable: true,
        field:"Nombre"
      },
      {
        name:"Precio Unitario",
        label:"abcd",
        sortable: true,
        field:"Precio Unitario"
      },
      {
        name:"Unidades Disponibles",
        label:"abcd",
        sortable: true,
        field:"Unidades Disponibles"
      },
    ]
  };
  },
  props:{},
  methods:{},
};
</script>

<style lang="scss" scoped></style>
