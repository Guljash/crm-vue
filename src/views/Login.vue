<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          class="validate"
          v-model.trim="email"
          :class="{ invalid: v$.email.$error }"
        />
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-for="(error, index) of v$.email.$errors"
          :key="index"
        >
          {{ printError(error.$validator, error.$params) }}
        </small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          class="validate"
          v-model="password"
        />
        <label for="password">Пароль</label>
        <small
          class="helper-text invalid"
          v-for="(error, index) of v$.password.$errors"
          :key="index"
        >
          {{ printError(error.$validator, error.$params.min) }}
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import messages from "@/utils/messages";

export default {
  name: "login",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async submitHandler() {
      this.v$.$touch();
      if (this.v$.$error) return;

      const formData = {
        email: this.email,
        password: this.password,
      };
      try {
        await this.$store.dispatch("login", formData);
        this.$router.push("/");
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
    printError($name, $param) {
      if ($name === "required") {
        return "Поле не должно быть пустым";
      } else if ($name === "minLength") {
        return "Минимальная длина должна быть " + $param + " символов";
      } else if ($name === "email") {
        return "Адрес электронной почты был введен неправильно";
      }
    },
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message]);
    }
  },
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(6) },
  },
};
</script>
