<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Сумма</th>
        <th>Дата</th>
        <th>Категория</th>
        <th>Тип</th>
        <th>Открыть</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(record, idx) of records" :key="record.id">
        <td>{{ idx + 1 }}</td>
        <td>{{ currencyFilter(record.amount) }}</td>
        <td>{{ dateFilter(record.date) }}</td>
        <td>{{ record.categoryName }}</td>
        <td>
          <span class="white-text badge" :class="[record.typeClass]">{{
            record.typeText
          }}</span>
        </td>
        <td>
          <button class="btn-small btn" @click="$router.push('/detail-record/' + record.id)">
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    records: {
      requied: true,
      type: Array,
    },
  },
  methods: {
    currencyFilter(value, currency = "RUB") {
      return new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency,
      }).format(value);
    },
    dateFilter(value, format = "date") {
      const options = {};

      if (format.includes("date")) {
        options.day = "2-digit";
        options.month = "long";
        options.year = "numeric";
      }

      return new Intl.DateTimeFormat("ru-RU", options).format(new Date(value));
    },
  },
};
</script>