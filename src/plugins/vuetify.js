import Vue from 'vue'
import Vuetify, {
  VBtn,
  VCard,
  VCardTitle,
  VCardText,
  VDivider,
  VCardActions,
  VProgressCircular,
} from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  components: {
    VBtn,
    VCard,
    VCardTitle,
    VCardText,
    VCardActions,
    VDivider,
    VProgressCircular,
  }
})
