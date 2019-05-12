<template>
    <div class="wrapper">
        <div class="container">

            <div class="add-container" v-if='newTask'>
                <div class="add-container-inside">
                    <input v-model="newTaskText" type="text">
                    <div v-on:click="addNewTask" class="add-new-task">Add</div>
                </div>
            </div>
            <div class="list-container">
                <!-- INCOMPLETE -->
                <transition-group name="task-group" tag="div" class="task-group-container">
                    <div class="task" v-for="task in tasksIncomplete" key="task">
                        <div class="list-item-inside">
                            <div class="task-title">{{task.name}}</div>
                            <div class="task-active">
                                <div class="checkbox" @click="toggleDone(task)" v-bind:class="{ active: task.done }"></div>
                            </div>
                        </div>
                    </div>
                </transition-group>

                 COMPLETE
                <transition-group name="task-group" tag="div" class="task-group-container">
                    <div class="task" v-for="task in tasksComplete" key="task">
                        <div class="list-item-inside">
                            <div class="task-title">{{task.name}}</div>
                            <div class="task-active">
                                <div class="checkbox" @click="toggleDone(task)" v-bind:class="{ active: task.done }"></div>
                            </div>
                        </div>
                    </div>
                </transition-group>

            </div>

            <div v-on:click="showNewTaskPopup" style="bottom: 55px !important" class="add-button">Add New Task</div>
            <router-link to="/changeLog" class="add-button" style="color: white; text-decoration: none">Change log</router-link>
        </div>
    </div>
</template>
<script>
	export default {
		name: 'list',
		data() {
			return {
				newTask: false,
				newTaskText: '',
				tasksIncomplete: [],
				tasksComplete: []
			}
		},
        mounted() {
			axios
				.get('http://192.168.0.103:8002/api/v1/tasks/complete')
				// .get('http://localhost:8002/api/v1/tasks/complete')
				.then(response => {
					this.tasksComplete = JSON.parse(response.data.tasks);
                }),
            axios
				.get('http://192.168.0.103:8002/api/v1/tasks/incomplete')
                // .get('http://localhost:8002/api/v1/tasks/incomplete')
                .then(response => {
                    this.tasksIncomplete = JSON.parse(response.data.tasks);
                })
        },
		watch: {
			tasks: {
				handler: function (val, oldVal) {

				},
				deep: true
			}
		},
		methods: {
			showNewTaskPopup: function () {
				this.newTask = true;
			},
			addNewTask: function () {
				if (this.newTaskText !== '') {
					const newTask = {name: this.newTaskText, done: false};
					this.tasksIncomplete.push(newTask);
					axios
					.post('http://192.168.0.103:8002/api/v1/tasks/new', {
						// .post('http://localhost:8002/api/v1/tasks/new', {
							name: newTask.name,
							done: newTask.done
						}).then((response) => console.log(response));
					axios
					.post('http://192.168.0.103:8002/api/v1/tasks/log', {
						// .post('http://localhost:8002/api/v1/tasks/log', {
							value: {newTask: true},
							key: 'newTask',
							name: newTask.name,
						}).then((response) => console.log(response));
					this.newTaskText = '';
					this.newTask = false;
				}
			},
			toggleDone: function (task) {
				task.done = !task.done;
				axios
                .post('http://192.168.0.103:8002/api/v1/tasks/setDone', {
                    // .post('http://localhost:8002/api/v1/tasks/setDone', {
				    id: task.id,
                    done: task.done
                }).then((response) => console.log(response));
				axios
				.post('http://192.168.0.103:8002/api/v1/tasks/log', {
					// .post('http://localhost:8002/api/v1/tasks/log', {
						value: {oldDone: ! task.done, newDone: task.done},
						key: 'changeDone',
						name: task.name,
					}).then((response) => console.log(response));

				if (task.done === true) {
					this.$delete(this.tasksIncomplete, this.tasksIncomplete.indexOf(task));
					this.tasksComplete.push(task);
				} else {
					this.$delete(this.tasksComplete, this.tasksComplete.indexOf(task));
					this.tasksIncomplete.unshift(task);
				}
			}
		}
	}
</script>

<style scoped>
    @font-face {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 300;
        src: local('Lato Light'), local('Lato-Light'), url(https://fonts.gstatic.com/s/lato/v14/S6u9w4BMUTPHh7USSwiPHA.ttf) format('truetype');
    }
    @font-face {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v14/S6uyw4BMUTPHjx4wWw.ttf) format('truetype');
    }
    @font-face {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v14/S6u9w4BMUTPHh6UVSwiPHA.ttf) format('truetype');
    }
    html,
    body {
        margin: 0;
        padding: 0;
        background-color: #1aa295;
        width: 100%;
        height: 100%;
        font-family: 'Lato';
        color: #FFFFFF;
        font-weight: 300;
        font-size: 13px;
    }
    .wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .wrapper .container {
        position: relative;
        width: 100%;
        height: 620px;
        background-color: #0a1721;
        border-radius: 10px;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
        overflow: hidden;
    }
    .wrapper .container .add-container {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 10;
        background-color: rgba(26, 162, 149, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .wrapper .container .add-container .add-container-inside {
        text-align: center;
    }
    .wrapper .container .add-container .add-container-inside .add-new-task {
        padding: 10px;
        cursor: pointer;
        font-weight: bold;
    }
    .wrapper .container .add-container .add-container-inside input {
        background-color: transparent;
        border: none;
        border-bottom: 1px solid #FFFFFF;
        padding: 10px;
        color: #FFFFFF;
    }
    .wrapper .container .add-container .add-container-inside input:focus {
        outline: none;
    }
    .wrapper .container .add-button {
        position: absolute;
        width: 90%;
        bottom: 10px;
        text-align: center;
        background-color: #1aa295;
        margin: 0 auto;
        left: 0;
        right: 0;
        padding: 10px 5px;
        font-weight: 400;
        cursor: pointer;
    }
    .wrapper .container .list-container .task {
        width: 90%;
        margin: 10px auto;
        background-color: #13222e;
        transition: all 0.5s;
    }
    .wrapper .container .list-container .task:hover {
        background-color: #1d3345;
        transform: scale(1.02);
    }
    .wrapper .container .list-container .task .list-item-inside {
        padding: 20px;
        display: flex;
        justify-content: space-between;
    }
    .wrapper .container .list-container .task .list-item-inside .task-title {
        text-transform: capitalize;
    }
    .wrapper .container .list-container .task .list-item-inside .task-active .checkbox {
        width: 15px;
        height: 15px;
        border: 1px solid #CCCCCC;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.2s;
        position: relative;
    }
    .wrapper .container .list-container .task .list-item-inside .task-active .checkbox.active {
        border: 1px solid #1aa295;
        background-color: #1aa295;
    }
    .task-group-enter-to {
        opacity: 1;
        transform: translateX(0%);
    }
    .task-group-leave-active {
        /*position: absolute;*/
    }
    .task-group-group-move {
        opacity: 1;
        transition: all 0.5s;
    }
    .task-group-enter,
    .task-group-leave-to {
        opacity: 0;
        transform: translateX(-100%);
    }
</style>