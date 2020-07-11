var app = new Vue({
    el: '#app',
    data: {
        gameStart: false,//是否已開始遊戲
        gameEnd: false,//是否已結束遊戲
        score: 0, //目前得分
        num1: 1, //第一個數字
        num2: 1,  //第二個數字
        operator: ['+', '-', 'X', '÷'],//運算子
        ans: '', //使用者答案
        random: 0, // 隨機運算子
        timer: '',//計時器
        time: 0 //目前時間
    },
    methods: {
        startGame() {
            const vm = this;
            if (vm.gameStart == false) {
                vm.gameStart = true;
                vm.changeQuestion();
                vm.timer = window.setInterval(() => {
                    vm.time++;
                }, 1000)
            }
        },
        //切換為遊戲畫面 先改變題目一次 並開始計時
        Random(isOperator = false, min, max) {
            if (isOperator == true) {
                return Math.floor(Math.random() * 4);
            } else {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
        },
        //數字隨機化
        changeQuestion() {
            const vm = this;
            vm.random = vm.Random(true);//隨機選擇運算子
            if (vm.time >= 0 && vm.time <= 20) {
                vm.num1 = vm.Random(false, 1, 9);
                vm.num2 = vm.Random(false, 1, 9);
            }
            else if (vm.time > 20 && vm.time <= 40) {
                vm.num1 = vm.Random(false, 10, 99);
                vm.num2 = vm.Random(false, 10, 99);
            }
            else {
                vm.num1 = vm.Random(false, 100, 999);
                vm.num2 = vm.Random(false, 100, 999);
            }
        },
        //隨機改變題目，並根據時間選擇數字位數
        checkAns(){
            const vm = this;
            let math = {
                '+': function (x, y) { return x + y },
                '-': function (x, y) { return x - y },
                'X': function (x, y) { return x * y },
                '÷': function (x, y) { return Math.round(x / y * 10) / 10 }//除法一律四捨五入到小數第一位
            };
            let realAns = math[vm.operator[vm.random]](vm.num1, vm.num2);
            if (vm.ans == realAns) {
                if (vm.time >= 0 && vm.time <= 40) {
                    vm.score++;
                }
                else {
                    vm.score += 5;
                }
                // console.log(true);
                vm.ans = '';
                vm.changeQuestion();
            } else {
                if (vm.score >= 0) {
                    vm.score--;
                }
                // console.log(false);
                vm.ans = '';
                vm.changeQuestion();
            }
        },
        //檢查使用者答案，答對會依照時間給予分數，答錯則扣一分，答完改變題目
        reStart () {
            const vm = this;
            vm.gameStart = false;
            vm.gameEnd = false;
            vm.score = 0;
            vm.time = 0;
        }
        //重新開始 並將變數初始化
    },
    watch: {
        time: function(){
            const vm = this;
            if(vm.time > 60){
                clearInterval(vm.timer);
                vm.gameStart = false;
                vm.gameEnd = true;
            }
        }
        //監控遊戲時間 遊戲時間到切換畫面
    },
});