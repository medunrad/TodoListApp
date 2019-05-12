<template>
    <div class="wrapper">
        <div class="container">
            <div class="list-container">
                <transition-group name="task-group" tag="div" class="task-group-container">
                    <div class="task" v-for="log in logs" key="task">
                        <div class="list-item-inside">
                            <div class="task-title">Task: {{log.name}}</div>
                            <div v-if="log.key === 'newTask'">
                                <i>task created</i>
                            </div>
                            <div v-else>
                                <i>old: {{JSON.parse(log.value).oldDone}}, new {{JSON.parse(log.value).newDone}}</i>
                            </div>
                        </div>
                    </div>
                </transition-group>
            </div>
            <router-link to="/" class="add-button" class="add-button" style="color: white; text-decoration: none">Tasks</router-link>
        </div>
    </div>
</template>
<script>
	export default {
		name: 'changeLog',
        data() {
			return {
				logs: []
			}
        },
        mounted() {
			this.getLogs();
        },
        methods: {
			getLogs: function () {
				axios
					.get('http://192.168.0.103:8002/api/v1/tasks/changeLog')
					.then(response => {
						this.logs = JSON.parse(response.data.logs).slice(0, 11);
					})
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
        padding: 10px;
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
</style>