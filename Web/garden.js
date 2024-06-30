const firebaseConfig = {
    apiKey: "AIzaSyCicGfXXQju4GIdFoTcOkqErsWdJ1E6vwg",
    authDomain: "smart-home-bf604.firebaseapp.com",
    projectId: "smart-home-bf604",
    storageBucket: "smart-home-bf604.appspot.com",
    messagingSenderId: "60096826390",
    appId: "1:60096826390:web:4e442603c25acaba073937",
    measurementId: "G-3MTCLKCJS1"
  };

firebase.initializeApp(firebaseConfig); 
firebase.analytics(); 

var BTN_Device_2_ON = document.querySelector(".BTN_Device_2_ON")
var BTN_Device_2_OFF = document.querySelector(".BTN_Device_2_OFF")
var Device_2_ON = document.querySelector(".Device_2_ON")
var Device_2_OFF = document.querySelector(".Device_2_OFF")

var BTN_Device_3_ON = document.querySelector(".BTN_Device_3_ON")
var BTN_Device_3_OFF = document.querySelector(".BTN_Device_3_OFF")
var Device_3_ON = document.querySelector(".Device_3_ON")
var Device_3_OFF = document.querySelector(".Device_3_OFF")

var BTN_Device_4_ON = document.querySelector(".BTN_Device_4_ON")
var BTN_Device_4_OFF = document.querySelector(".BTN_Device_4_OFF")
var Device_4_ON = document.querySelector(".Device_4_ON")
var Device_4_OFF = document.querySelector(".Device_4_OFF")

var Name_Room = document.querySelector(".Name_Room")
window.addEventListener("scroll", function() {
    if (window.scrollY > 75) {
            Name_Room.classList.add("setcontrol")
    }
    else{
        Name_Room.classList.remove("setcontrol")
    }

});

var thanhtruot = document.querySelector('.thanh_truot')
var do_sang = 1;
thanhtruot.oninput = function() {
    do_sang = this.value
    console.log(this.value)
    var dbRef3 = firebase.database().ref().child('garden').child("device").child("led").set({
        dosang: do_sang,
        status: "1",
      })
     if (this.value >= 0 && this.value <= 25) {
        Device_2_ON.src = 'Image/ledon1.png';
    } else if (this.value > 25 && this.value <= 50) {
        Device_2_ON.src = 'Image/ledon2.png';   
    } else if (this.value > 50 && this.value <= 75) {
        Device_2_ON.src = 'Image/ledon3.png';  
    } else {
        Device_2_ON.src = 'Image/ledon4.png';  
    }
}
BTN_Device_2_ON.addEventListener("click", function(){
    thanhtruot.classList.remove("hiden")
    Device_2_ON.classList.remove("hiden")
    Device_2_OFF.classList.add("hiden")
    BTN_Device_2_OFF.classList.remove("set_btn")
    BTN_Device_2_ON.classList.add("set_btn")
    var dbRef3 = firebase.database().ref().child('garden').child("device").child("led").set({
        dosang: do_sang,
        status: "1",
      })
})
BTN_Device_2_OFF.addEventListener("click", function(){
    thanhtruot.classList.add("hiden")
    Device_2_ON.classList.add("hiden")
    Device_2_OFF.classList.remove("hiden")
    BTN_Device_2_ON.classList.remove("set_btn")
    BTN_Device_2_OFF.classList.add("set_btn")
    var dbRef3 = firebase.database().ref().child('garden').child("device").child("led").set({
        dosang: do_sang,
        status: "0",
      })
})

BTN_Device_3_ON.addEventListener("click", function(){
    Device_3_ON.classList.remove("hiden")
    Device_3_OFF.classList.add("hiden")
    BTN_Device_3_OFF.classList.remove("set_btn")
    BTN_Device_3_ON.classList.add("set_btn")
    var dbRef3 = firebase.database().ref().child('garden').child("device").child("tuoicay").set({
        status: "1",
      })
})
BTN_Device_3_OFF.addEventListener("click", function(){
    Device_3_ON.classList.add("hiden")
    Device_3_OFF.classList.remove("hiden")
    BTN_Device_3_ON.classList.remove("set_btn")
    BTN_Device_3_OFF.classList.add("set_btn")
    var dbRef3 = firebase.database().ref().child('garden').child("device").child("tuoicay").set({
        status: "0",
      })
})

BTN_Device_4_ON.addEventListener("click", function(){
    Device_4_ON.classList.remove("hiden")
    Device_4_OFF.classList.add("hiden")
    BTN_Device_4_OFF.classList.remove("set_btn")
    BTN_Device_4_ON.classList.add("set_btn")
    var dbRef3 = firebase.database().ref().child('garden').child("device").child("catco").set({
        status: "1",
      })
})
BTN_Device_4_OFF.addEventListener("click", function(){
    Device_4_ON.classList.add("hiden")
    Device_4_OFF.classList.remove("hiden")
    BTN_Device_4_ON.classList.remove("set_btn")
    BTN_Device_4_OFF.classList.add("set_btn")
    var dbRef3 = firebase.database().ref().child('garden').child("device").child("catco").set({
        status: "0",
      })
})

var Value_Temp = document.querySelector(".Value_Temp")
var temp_garden = firebase.database().ref().child('garden').child("sensor").child("temp")
temp_garden.on('value', function(snap) {Value_Temp.innerText = snap.val()})
var Value_Humidity = document.querySelector(".Value_Humidity")
var humidity_garden = firebase.database().ref().child('garden').child("sensor").child("humidity")
humidity_garden.on('value', function(snap) {Value_Humidity.innerHTML = snap.val()})

var value_3 = document.querySelector(".value_3")
var light_garden = firebase.database().ref().child("garden").child("sensor").child("light")
light_garden.on("value", function(snap){value_3.innerHTML = snap.val()})

var value_2 = document.querySelector(".value_2")
var rain_garden = firebase.database().ref().child("garden").child("sensor").child("rain")
rain_garden.on("value", function(snap){value_2.innerHTML = snap.val()})

var status_led_living = firebase.database().ref().child('garden').child("device").child("led").child("status")
status_led_living.on('value', function(snap) {if(snap.val()==1){
    thanhtruot.classList.remove("hiden")
    Device_2_ON.classList.remove("hiden")
    Device_2_OFF.classList.add("hiden")
    BTN_Device_2_OFF.classList.remove("set_btn")
    BTN_Device_2_ON.classList.add("set_btn")
}
else{
    thanhtruot.classList.add("hiden")
    Device_2_ON.classList.add("hiden")
    Device_2_OFF.classList.remove("hiden")
    BTN_Device_2_ON.classList.remove("set_btn")
    BTN_Device_2_OFF.classList.add("set_btn")
}})


var status_tv_living = firebase.database().ref().child('garden').child("device").child("tuoicay").child("status")
status_tv_living.on('value', function(snap) {if(snap.val()=="1"){
    Device_3_ON.classList.remove("hiden")
    Device_3_OFF.classList.add("hiden")
    BTN_Device_3_OFF.classList.remove("set_btn")
    BTN_Device_3_ON.classList.add("set_btn")
}
else{
    Device_3_ON.classList.add("hiden")
    Device_3_OFF.classList.remove("hiden")
    BTN_Device_3_ON.classList.remove("set_btn")
    BTN_Device_3_OFF.classList.add("set_btn")
}})

var status_hutbui_living = firebase.database().ref().child('garden').child("device").child("catco").child("status")
status_hutbui_living.on('value', function(snap) {if(snap.val()==1){
    Device_4_ON.classList.remove("hiden")
    Device_4_OFF.classList.add("hiden")
    BTN_Device_4_OFF.classList.remove("set_btn")
    BTN_Device_4_ON.classList.add("set_btn")
}
else{
    Device_4_ON.classList.add("hiden")
    Device_4_OFF.classList.remove("hiden")
    BTN_Device_4_ON.classList.remove("set_btn")
    BTN_Device_4_OFF.classList.add("set_btn")
}})