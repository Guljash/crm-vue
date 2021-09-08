<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.title }}
            </option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field" >
          <input
            v-model="title"
            :class="{ invalid: v$.title.$error }"
            type="text"
            id="name"
          />
          <label for="name">Название</label>
          <span v-if="v$.title.$error" class="helper-text invalid"
            >Введите название</span
          >
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model="limit"
            :class="{ invalid: v$.limit.$error }"
          />
          <label for="limit">Лимит</label>
          <span v-if="v$.limit.$error" class="helper-text invalid"
            >Минимальное значение {{ v$.limit.minValue.$params.min }}</span
          >
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, minValue } from "@vuelidate/validators";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      select: null,
      title: "",
      limit: 100,
      current: null,
    };
  },
  created() {
    const { id, title, limit } = this.categories[0];
    this.current = id;
    this.title = title;
    this.limit = limit;
  },
  mounted() {
    this.select = window.M.FormSelect.init(this.$refs.select);
    window.M.updateTextFields();
  },
  unmounted() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
  watch: {
    current(value) {
      const { title, limit } = this.categories.find((c) => c.id === value);
      this.title = title;
      this.limit = limit;
    },
  },
  props: {
    categories: {
      type: Array,
      requied: true,
    },
  },
  validations: {
    title: { required },
    limit: { minValue: minValue(100) },
  },
  methods: {
    async submitHandler() {
      if (this.v$.$invalid) {
        this.$v.$touch();
        return;
      }

      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit,
        };

        await this.$store.dispatch('updateCategory', categoryData);
        this.$message('Категория успешно обновлена')
        this.$emit('updated', categoryData)
      } catch (e) {
        console.log(e);
        throw e
      }
    },
  },
};
</script>