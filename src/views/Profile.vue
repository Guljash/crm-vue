<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="description"
          v-model="name"
          type="text"
          :class="{ invalid: v$.name.$error }"
        />
        <label for="description">Имя</label>
        <span v-if="v$.name.$error" class="helper-text invalid"
          >Введите имя</span
        >
      </div>

      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocale" />
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapGetters, mapActions } from "vuex";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      name: "",
      isRuLocale: true,
    };
  },
  mounted() {
    this.name = this.info.name;
    this.isRuLocale = this.info.locale === "ru-Ru";
    setTimeout(() => {
      window.M.updateTextFields();
    }, 0);
  },
  computed: {
    ...mapGetters(["info"]),
  },
  validations: {
    name: { required },
  },
  methods: {
    ...mapActions(["updateInfo"]),
    async submitHandler() {
      this.v$.$touch();
      if (this.v$.$error) return;

      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isRuLocale ? "ru-Ru" : "en-US",
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>