<template>
  <div class="dataField">
    <h3>Get Field</h3>
    <div>NAMA : {{dataField.name}}</div>
    <div>AREA : {{dataField.area}}</div>
    <div>GROUP : {{dataField.group}}</div>
    <div>BLOCK : {{dataField.block}}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['dataField'])
  },
  // methods: {
  //     async getField() {
  //
  //       if (!this.GetField)
  //       {
  //         return;
  //       }
  //
  //         this.Field.push (this.GetField);
  //         this.GetField = '';
  //         this.saveField();
  //       }
  //     }
    };
</script>

<style scoped>
.dataField {
  background-color: aquamarine;
  padding: 10px;
  margin: 10px;
}
</style>
