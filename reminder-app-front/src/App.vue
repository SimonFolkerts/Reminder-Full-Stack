<template>
  <main>
    <div>
      <form>
        <!-- task input -->
        <div class="form-group">
          <label for="task">Reminder</label>
          <textarea v-model="task" id="task" cols="30" rows="2"></textarea>
        </div>
        <!-- datepicker input -->
        <div class="form-group">
          <label for="time">Time/Date</label>
          <input v-model="time" id="time" type="datetime-local">
        </div>
        <!-- priority select -->
        <div class="form-group">
          <label for="priority">Priority</label>
          <select v-model="priority" id="priority">
            <option value="0">Low</option>
            <option value="1">Med</option>
            <option value="2">High</option>
          </select>
        </div>
        <!-- color picker input -->
        <div class="form-group">
          <label for="color">Colour</label>
          <input v-model="color" id="color" type="color">
        </div>
        <button @click="submitForm" type="button">Create Reminder</button>
      </form>
    </div>
    <button @click="getReminders" type="button">Get Reminders</button>
    <section class="reminder-list">
      <ReminderListItem v-for="reminder of remindersArray" :reminder-data="reminder" />
    </section>
  </main>

</template>

<script>
import ReminderListItem from "./components/ReminderListItem.vue";
export default {
  components: {
    ReminderListItem,
  },
  data() {
    return {
      // properties that are linked to each of the above inputs
      task: 'Write your reminder here',
      time: null,
      priority: 2,
      color: '#FFFFFF',

      remindersArray: [],
    }
  },
  methods: {
    async submitForm() {
      const response = await fetch('http://127.0.0.1:3000/reminders', {
        // http method
        method: 'POST',
        // content
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          task: this.task,
          time: this.time,
          priority: this.priority,
          color: this.color
        })
      });

      const data = await response.json();
      console.log(data);
    },
    async getReminders() {
      const response = await fetch('http://127.0.0.1:3000/reminders');
      const data = await response.json()
      this.remindersArray = data;
    }
  }
}
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  height: 100vh;

  overflow-y: hidden;
}

.reminder-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  overflow-y: scroll;
}
</style>