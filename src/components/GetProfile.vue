<template>
  <div class="dataProfile">
    <h3>Get Profile</h3>
    <div>NAMA : {{dataProfile.name}}</div>
    <div>EMAIL : {{dataProfile.email}}</div>
    <div>ROLE : {{dataProfile.role.name}}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['dataProfile'])
  },
//   methods: {
//     async getField() {
//
//       if (!this.getField)
//       {
//         return;
//       }
//
//         this.Field.push (this.getField);
//         this.getField = '';
//         this.save
//       } catch (error) {
//         console.log(error);
//         this.error = `${error.response.data.message} - ${error}`;
//       }
//     }
//   }
// };
};
</script>

<style scoped>
.dataProfile {
  background-color: aquamarine;
  padding: 10px;
  margin: 10px;
}
</style>
