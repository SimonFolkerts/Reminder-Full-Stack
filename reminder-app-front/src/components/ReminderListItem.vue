<template>
  <div class="reminder">
    <div>
      <p class="task">{{ reminderData.task }}</p>
      <p class="time">Date: {{ reminderData.time }}</p>
      <p class="priority">Priority: {{ priorities[reminderData.priority] }}</p>
      {{ reminderData.id }}
    </div>
    <!-- on click emit a custom event named deleteReminder, with the reminder id attached as a payload -->
    <button @click="$emit('deleteReminder', reminderData.id)" type="button">Clear</button>
  </div>
</template>

<script>
export default {
  props: {
    reminderData: Object,
  },
  data() {
    return {
      color: this.reminderData.color,
      priorities: ['Low', 'Med', 'High'],
    }
  }
}
</script>

<style scoped>
p {
  margin: 0.25rem;
}

.reminder {
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
}

.reminder>div {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  width: 100%;
  height: 100%;
  padding: 0.5rem 1rem;

  background-color: v-bind(color);
}

.task {
  width: 100%;
}

button {
  margin: 1rem;
  align-self: center;
}
</style>