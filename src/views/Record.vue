<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!categories.length" class="center">
      Категорий пока нет.
      <router-link to="/categories">Добавить новую категорию</router-link>
    </p>

    <form v-else class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <select v-model="select" ref="selectRef">
          <option v-for="c of categories" :key="c.id" :value="c.id">
            {{ c.title }}
          </option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model="amount"
          :class="{ invalid: v$.amount.$error }"
        />
        <label for="amount">Сумма</label>
        <span v-if="v$.amount.$error" class="helper-text invalid"
          >amount пароль</span
        >
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{ invalid: v$.description.$error }"
        />
        <label for="description">Описание</label>
        <span v-if="v$.description.$error" class="helper-text invalid"
          >description пароль</span
        >
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>


<script>
import useVuelidate from "@vuelidate/core";
import { required, minValue } from "@vuelidate/validators";
import { mapGetters } from "vuex";

export default {
  name: "record",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      loading: true,
      categories: [],
      select: null,
      type: "outcome",
      amount: 1,
      description: "",
    };
  },
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;
    if (this.categories.length) {
      this.select = this.categories[0].id;
    }

    setTimeout(() => {
      window.M.FormSelect.init(this.$refs.selectRef);
      window.M.updateTextFields();
    }, 0);
  },
  unmounted() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
  validations: {
    amount: { minValue: minValue(1) },
    description: { required },
  },
  computed: {
    canCreateRecord() {
      if (this.type === "income") {
        return true;
      }
      return this.info.bill >= this.amount;
    },
    ...mapGetters(["info"]),
  },
  methods: {
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }

      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch("createRecord", {
            categoryId: this.select,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON(),
          });
          const bill = this.type === 'income' ? this.info.bill + this.amount : this.info.bill - this.amount

          await this.$store.dispatch('updateInfo', {bill})
          this.$message('Запись успешно создана')
          this.v$.$reset()
          this.amount = 1
          this.description = ''
        } catch (e) {
          console.log(e);
          throw e;
        }
      } else {
        this.$message(
          `Недостаточно средств на счете (${this.amount - this.info.bill})`
        );
      }
    },
  },
};
</script>