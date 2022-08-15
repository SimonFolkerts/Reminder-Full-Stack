<template>
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
        <input v-model="time" id="time" type="date">
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
</template>

<script>
export default {
  data() {
    return {
      // properties that are linked to each of the above inputs
      task: 'Write your reminder here',
      time: null,
      priority: 2,
      color: null,
    }
  },
  methods: {
    async submitForm() {
      const response = await fetch('http://127.0.0.1:3000/reminders', {
        method: 'POST',
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
    }
  }
}
</script>

<style scoped>
</style>