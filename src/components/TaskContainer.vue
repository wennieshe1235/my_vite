<template>
    <article class="task_container">
    
      <button type="button" class="btn_empty" @click="taskClear">清空</button>
    
      <h1 class="title1">待辦事項</h1>
    
      <div class="task_add_block" ref="taskAddBlock">
        <input 
        type="text" 
        class="task_name" 
        placeholder="輸入待辦事項…"
        @focus="toggleShadow"
        @blur="toggleShadow"
        v-model.trim="taskText"
        @keyup.enter="taskAdd">
        
        <button type="button" 
        class="task_add"
        @click="taskAdd" >新增</button>
      </div>
    
      <div class="task_list_parent">
    
        <ul class="task_list" ref="taskList">
            <TaskItem :tasks="tasks" 
            @task-edit="taskEdit"
            @task-star="taskStar" 
            @task-swap="taskSwap"
            @task-remove="taskRemove"></TaskItem>
          
        </ul>
    
      </div>
    </article>
</template>

<!-- <script>
    import TaskItem from './TaskItem.vue';

    export default {
        components: { TaskItem },
        data(){
            return{
                taskText: "",
                tasks: [
                    // {
                    //     id: "a",
                    //     name: "一",
                    //     star: 0,
                    //     editable: false

                    // }
                ]
            };
        },
        beforeMount(){
            console.log("ttt");
            let tasks = JSON.parse(localStorage.getItem("tasks"));
            console.log(tasks);
            if(tasks){
                this.tasks = tasks;
            }
            
            
        },
        methods:{
            toggleShadow(){
                // console.log("aaa");
                // console.log(this.$refs.taskAddBlock); //取用到上述的DIV
                this.$refs.taskAddBlock.classList.toggle("-on") //DIV使用TOGGLE來加上類名-ON
                
                
            },
            taskAdd(){
                if(this.taskText != ""){
                    this.tasks.unshift({
                        id: Date.now(), //取得從1970年0 分0秒以來的毫秒數，當作id
                        name: this.taskText,
                        star: 0,
                        editable: false
                    });
                    this.taskText = "";

                    localStorage.setItem("tasks",JSON.stringify(this.tasks))
                }

            },
            taskClear(){
                let r = confirm("確認清空嗎?")
                if(r){
                    for(let i = 0; i < this.$refs.taskList.children.length; i++){
                        console.log(i);
                        this.$refs.taskList.children[i].classList.add('fade_out')

                    }

                    setTimeout(() => { //記得用框架寫的時候，箭頭涵式才可以讓this指向setup配置data
                        this.tasks = [];
                        localStorage.clear(); //clear代表全刪
                        // localStorage.removeItem("tasks") //如果只想要刪除特定的key鍵，用removeItem
                     },1000); //一秒之後等到上面的css淡出效果完成之後，再執行tasks清空功能
                    
                }
            },
            taskEdit(e, i){
                
                if(this.tasks[i].editable){
                    if(this.tasks[i].name == ""){
                        alert("請輸入資料");
                    }else{
                        this.tasks[i].editable = !this.tasks[i].editable;
                        localStorage.setItem("tasks",JSON.stringify(this.tasks))
                        
                    }
                }else{
                    this.tasks[i].editable = !this.tasks[i].editable;
                }
                
            },
            taskStar(e, i, star){
                // alert(star);
                this.tasks[i].star = star;
                localStorage.setItem("tasks",JSON.stringify(this.tasks))
                
                
            },
            taskSwap(e, i, direction){
                if(direction == 'up' && i != 0){
                    // alert("up");
                    // 寫死索引值
                    // [this.tasks[0], this.tasks[1]] = [this.tasks[1], this.tasks[0]]
                    // 動態索引值: 1改成i，0改成i-1
                    [this.tasks[i-1], this.tasks[i]] = [this.tasks[i], this.tasks[i-1]]
                    localStorage.setItem("tasks",JSON.stringify(this.tasks))



                }
                
                if(direction == 'down' && i != this.tasks.length - 1){
                    // alert("down");
                    // 寫死索引值
                    // [this.tasks[1], this.tasks[2]] = [this.tasks[2], this.tasks[1]]
                     // 動態索引值: 1改成i，2改成i+1
                     [this.tasks[i], this.tasks[i+1]] = [this.tasks[i+1], this.tasks[i]]
                    localStorage.setItem("tasks",JSON.stringify(this.tasks))
                }

            },
            taskRemove(e, i){
                console.log(e);
                let r = confirm("確認移除?");
                if(r){
                    e.target.closest("li").classList.add("fade_out");

                    setTimeout(() => {
                        this.tasks.splice(i, 1);
                        localStorage.setItem("tasks",JSON.stringify(this.tasks));
                    }, 1000);

                }
            }

        }
    }
</script> -->

<script setup>
import {ref, onBeforeMount} from "vue";
import TaskItem from "./TaskItem.vue";

//Data
const taskText = ref(""); //{value:""}
const tasks = ref([]);

//refs
const taskAddBlock = ref(null); //{value:元素}
const taskList = ref(null);  //{value:元素}

//lifecycle
onBeforeMount(() => {
    let all_tasks = JSON.parse(localStorage.getItem("tasks"));
    // console.log(tasks);
    if(all_tasks){
        tasks.value = all_tasks;
    }
})

//methods
function toggleShadow(){
    taskAddBlock.value.classList.toggle("-on") //DIV使用TOGGLE來加上類名-ON
}

function taskAdd(){
    if(taskText.value != ""){
        tasks.value.unshift({
            id: Date.now(), //取得從1970年0 分0秒以來的毫秒數，當作id
            name: taskText.value,
            star: 0,
            editable: false
        });
        taskText.value = "";

        localStorage.setItem("tasks",JSON.stringify(tasks.value))
    }

}

function taskClear(){
    let r = confirm("確認清空嗎?")
    if(r){
        for(let i = 0; i < taskList.value.children.length; i++){
            console.log(i);
            taskList.value.children[i].classList.add('fade_out')

        }

        setTimeout(() => { //記得用框架寫的時候，箭頭涵式才可以讓this指向setup配置data
            tasks.value = [];
            localStorage.clear(); //clear代表全刪
            // localStorage.removeItem("tasks") //如果只想要刪除特定的key鍵，用removeItem
            },1000); //一秒之後等到上面的css淡出效果完成之後，再執行tasks清空功能
        
    }
}

function taskEdit(e, i){
                
    if(tasks.value[i].editable){
        if(tasks.value[i].name == ""){
            alert("請輸入資料");
        }else{
            tasks.value[i].editable = !tasks.value[i].editable;
            localStorage.setItem("tasks",JSON.stringify(tasks.value))
            
        }
    }else{
        tasks.value[i].editable = !tasks.value[i].editable;
    }
    
}

function taskStar(e, i, star){
    // alert(star);
    tasks.value[i].star = star;
    localStorage.setItem("tasks",JSON.stringify(tasks.value))
    
    
}

function taskSwap(e, i, direction){
    if(direction == 'up' && i != 0){
        // alert("up");
        // 寫死索引值
        // [this.tasks[0], this.tasks[1]] = [this.tasks[1], this.tasks[0]]
        // 動態索引值: 1改成i，0改成i-1
        [tasks.value[i-1], tasks.value[i]] = [tasks.value[i], tasks.value[i-1]]
        localStorage.setItem("tasks",JSON.stringify(tasks.value))
    }

    if(direction == 'down' && i != tasks.value.length - 1){
            // alert("down");
            // 寫死索引值
            // [this.tasks[1], this.tasks[2]] = [this.tasks[2], this.tasks[1]]
                // 動態索引值: 1改成i，2改成i+1
                [tasks.value[i], tasks.value[i+1]] = [tasks.value[i+1], tasks.value[i]]
            localStorage.setItem("tasks",JSON.stringify(tasks.value))
        }
}

function taskRemove(e, i){
    console.log(e);
    let r = confirm("確認移除?");
    if(r){
        e.target.closest("li").classList.add("fade_out");

        setTimeout(() => {
            tasks.value.splice(i, 1);
            localStorage.setItem("tasks",JSON.stringify(tasks.value));
        }, 1000);

    }
}

</script>


<style lang="sass" scoped>
  article.task_container
    width: 600px
    margin: 0 auto
    border-radius: 5px
    padding: 10px
    box-shadow: 1px 1px 5px gray
    max-width: 100%
    h1.title1
      font-size: 2.4rem
      margin: 0 0 10px 0
  
    /* ===== 任務新增 ===== */
    div.task_add_block
      font-size: 0
      transition: transform .5s, box-shadow .5s
      &.-on
        box-shadow: 0 0 5px gray
        transform: scale(1.01)
        transform-origin: center center
  
      input.task_name
        width: calc(100% - 50px)
        border: 1px solid lightgray
        border-radius: 3px 0 0 3px
        height: 40px
        font-size: 2rem
        padding: 5px 10px
        outline: none
        display: inline-block
        vertical-align: top
    input.task_name::placeholder
      color: lightgray
  
    div
      &.task_add_block button.task_add
        display: inline-block
        width: 50px
        height: 40px
        vertical-align: top
        border: 1px solid lightgray
        border-left: 0
        background-color: white
        box-shadow: none
        font-size: 1.6rem
        cursor: pointer
        outline: none
        border-radius: 0 3px 3px 0
  
        &:active
          box-shadow: 1px 1px 3px lightgray inset, -1px -1px 3px lightgray inset
          background-color: #fcfcfc
          font-size: 1.5rem
      &.task_list_parent
        margin-top: 30px
        ul.task_list
          margin: 0
          padding: 0
          list-style: none
  
    /* ===== 清空按鈕 ===== */
    button.btn_empty
      float: right
      background: none
      background-color: white
      padding: 0
      margin: 0
      border: 1px solid lightgray
      border-radius: 3px
      height: 30px
      width: 50px
      outline: none
      font-size: 1.6rem
      cursor: pointer




</style>