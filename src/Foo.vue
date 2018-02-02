<template>
  <v-container grid-list-md index-of-things >
    <v-layout item-index-row index-row row wrap align-center
      v-for="(item, idx) in items" :key="idx">
      <v-flex xs12 sm6>
        <div>
          {{ item.name }}
        </div>
      </v-flex>
      <v-flex xs12 sm6 wrap-btn>
        <v-btn class="btn-edit"
                color="blue"
                tag="section"
                :to="{ name: 'item-edit', params: { item_id: item.id }}">
          Editar
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { id: 1, name: 'Foo' },
        { id: 2, name: 'Bar' }
      ]
    };
  }
};
</script>