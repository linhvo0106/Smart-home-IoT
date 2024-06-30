// FRIEBASE
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
// KHAI BÁO BIẾN MQTT
var mqtt;
var clientID = "clientID - "+parseInt(Math.random() * 100);/*Tạo ID tự động */
var reconnectTimeout=2000;
var host="broker.hivemq.com";
var port=8000;
//MQTT
function MQTTconnect(){
    console.log("connecting to " + host + " " + port);
    mqtt = new Paho.MQTT.Client(host,Number(port),clientID);
    mqtt.onMessageArrived = onMessageArrived;
    mqtt.connect({
        onSuccess: onConnect
    }); 
}
function onConnect(){
    var  topic_1 =  "Livingroom/device_1";
    var  topic_2 =  "Livingroom/device_2";
    var  topic_3 =  "Livingroom/device_3";
    var  topic_4 =  "Livingroom/device_4";
    var  topic_5 = "Livingroom/doC"
    var  topic_6 = "Livingroom/doam"
    mqtt.subscribe(topic_1);
    mqtt.subscribe(topic_2);
    mqtt.subscribe(topic_3);
    mqtt.subscribe(topic_4);
    mqtt.subscribe(topic_5);
    mqtt.subscribe(topic_6);
    console.log("Da nhan")
    
}
function publish_message(messwater, chude){
    var topic = chude;
    Message = new Paho.MQTT.Message(messwater);
    Message.destinationName = topic;
    mqtt.send(Message);
}
//ĐỘ SÁNG LED
var thanhtruot = document.querySelector('.thanh_truot')
var do_sang = 1;
thanhtruot.oninput = function() {
    do_sang = this.value
    console.log(this.value)
    var dbRef3 = firebase.database().ref().child('livingroom').child("device").child("led").set({
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
function onMessageArrived({ payloadString, destinationName }) {
    if(destinationName == "Livingroom/device_1"){
        if(payloadString == "ON"){
            var dbRef1 = firebase.database().ref().child('livingroom').child("device").child("maylanh").set({
                status: "1",
                temp: valueTemp1
            })
        }else{
            var dbRef1 = firebase.database().ref().child('livingroom').child("device").child("maylanh").set({
                status: "0",
                temp: valueTemp1
            })
        }
    }else if(destinationName == "Livingroom/device_2"){
        if(payloadString == "ON"){
            var dbRef3 = firebase.database().ref().child('livingroom').child("device").child("led").set({
                dosang: do_sang,
                status: "1",
              })
        }else{
            var dbRef3 = firebase.database().ref().child('livingroom').child("device").child("led").set({
                dosang: do_sang,
                status: "0",
              })
        }
    }else if(destinationName == "Livingroom/device_3"){
        if(payloadString == "ON"){
            var dbRef1 = firebase.database().ref().child('livingroom').child("device").child("tv").set({
                status: "1",
              })
        }else{
            var dbRef1 = firebase.database().ref().child('livingroom').child("device").child("tv").set({
                status: "0",
              })
        }
    }else if(destinationName == "Livingroom/device_4"){
        if(payloadString == "ON"){
            var dbRef1 = firebase.database().ref().child('livingroom').child("device").child("hutbui").set({
                status: "1",
              })
        }else{
            var dbRef1 = firebase.database().ref().child('livingroom').child("device").child("hutbui").set({
                status: "0",
              })
        }
    }else if(destinationName == "Livingroom/doC"){
        var dbRef1 = firebase.database().ref().child('livingroom').child("sensor").child("temp").set({
            value : payloadString,
          })
    }else if(destinationName == "Livingroom/doam"){
        var dbRef1 = firebase.database().ref().child('livingroom').child("sensor").child("humidity").set({
            value : payloadString,
        })
    }
}
// KHAI BÁO BIẾN DEVICE
var BTN_Device_1_ON = document.querySelector(".BTN_Device_1_ON")
var BTN_Device_1_OFF = document.querySelector(".BTN_Device_1_OFF")
var Device_1_ON = document.querySelector(".Device_1_ON")
var Device_1_OFF = document.querySelector(".Device_1_OFF")

var control_device_1 = document.querySelector(".Control_Device_1")
var status_tv_living = firebase.database().ref().child('livingroom').child("device").child("maylanh").child("temp")
status_tv_living.on('value', function(snap) {valueTemp1 = snap.val()})
var btnup = document.querySelector(".fa-chevron-up")
var btndown = document.querySelector(".fa-chevron-down")
var text_value_device_1 = document.querySelector(".text_value_device_1")

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
// HÀM XỬ LÝ HIỆU ỨNG TRƯỢT
window.addEventListener("scroll", function() {
    if (window.scrollY > 75) {
            Name_Room.classList.add("setcontrol")
    }
    else{
        Name_Room.classList.remove("setcontrol")
    }
});
// DEVICE 1
BTN_Device_1_ON.addEventListener("click", function(){
    publish_message('ON',"Livingroom/device_1")
    Device_1_ON.classList.remove("hiden")
    Device_1_OFF.classList.add("hiden")
    BTN_Device_1_OFF.classList.remove("set_btn")
    BTN_Device_1_ON.classList.add("set_btn")
    control_device_1.classList.remove("hiden")
    text_value_device_1.innerHTML = valueTemp1 + " °C"
    var dbRef1 = firebase.database().ref().child('livingroom').child("device").child("maylanh").set({
        status: "1",
        temp: valueTemp1
    })
})
BTN_Device_1_OFF.addEventListener("click", function(){
    publish_message('OFF',"Livingroom/device_1")
    Device_1_ON.classList.add("hiden")
    Device_1_OFF.classList.remove("hiden")
    BTN_Device_1_ON.classList.remove("set_btn")
    BTN_Device_1_OFF.classList.add("set_btn")
    control_device_1.classList.add("hiden")
    var dbRef3 = firebase.database().ref().child('livingroom').child("device").child("maylanh").set({
        status: "0",
        temp: valueTemp1
      })
})
// TEMP MÁY LẠNH
btnup.addEventListener("click", function(){
    if(valueTemp1<32){
        text_value_device_1.innerHTML = ++valueTemp1 + " °C"
        var dbRef3 = firebase.database().ref().child('livingroom').child("device").child("maylanh").set({
            status: "1",
            temp: valueTemp1
          })
    }
})
btndown.addEventListener("click", function(){
    if(valueTemp1> 16){
        text_value_device_1.innerHTML = --valueTemp1 + " °C"
        var dbRef3 = firebase.database().ref().child('livingroom').child("device").child("maylanh").set({
            status: "1",
            temp: valueTemp1
          })
    }
})
// DEVICE 2
BTN_Device_2_ON.addEventListener("click", function(){
    publish_message('ON',"Livingroom/device_2")
    thanhtruot.classList.remove("hiden")
    Device_2_ON.classList.remove("hiden")
    Device_2_OFF.classList.add("hiden")
    BTN_Device_2_OFF.classList.remove("set_btn")
    BTN_Device_2_ON.classList.add("set_btn")
    var dbRef3 = firebase.database().ref().child('livingroom').child("device").child("led").set({
        dosang: do_sang,
        status: "1",
      })
    
})
BTN_Device_2_OFF.addEventListener("click", function(){
    publish_message('OFF',"Livingroom/device_2")
    thanhtruot.classList.add("hiden")
    Device_2_ON.classList.add("hiden")
    Device_2_OFF.classList.remove("hiden")
    BTN_Device_2_ON.classList.remove("set_btn")
    BTN_Device_2_OFF.classList.add("set_btn")
    var dbRef3 = firebase.database().ref().child('livingroom').child("device").child("led").set({
        dosang: do_sang,
        status: "0",
      })
})
// DEVICE 3
BTN_Device_3_ON.addEventListener("click", function(){
    publish_message('ON',"Livingroom/device_3")
    Device_3_ON.classList.remove("hiden")
    Device_3_OFF.classList.add("hiden")
    BTN_Device_3_OFF.classList.remove("set_btn")
    BTN_Device_3_ON.classList.add("set_btn")
    var dbRef1 = firebase.database().ref().child('livingroom').child("device").child("tv").set({
        status: "1",
      })
})
BTN_Device_3_OFF.addEventListener("click", function(){
    publish_message('OFF',"Livingroom/device_3")
    Device_3_ON.classList.add("hiden")
    Device_3_OFF.classList.remove("hiden")
    BTN_Device_3_ON.classList.remove("set_btn")
    BTN_Device_3_OFF.classList.add("set_btn")
    var dbRef1 = firebase.database().ref().child('livingroom').child("device").child("tv").set({
        status: "0",
      })
})
//DEVICE 4
BTN_Device_4_ON.addEventListener("click", function(){
    publish_message('ON',"Livingroom/device_4")
    Device_4_ON.classList.remove("hiden")
    Device_4_OFF.classList.add("hiden")
    BTN_Device_4_OFF.classList.remove("set_btn")
    BTN_Device_4_ON.classList.add("set_btn")
    var dbRef1 = firebase.database().ref().child('livingroom').child("device").child("hutbui").set({
        status: "1",
      })
})
BTN_Device_4_OFF.addEventListener("click", function(){
    publish_message('OFF',"Livingroom/device_4")
    Device_4_ON.classList.add("hiden")
    Device_4_OFF.classList.remove("hiden")
    BTN_Device_4_ON.classList.remove("set_btn")
    BTN_Device_4_OFF.classList.add("set_btn")
    var dbRef1 = firebase.database().ref().child('livingroom').child("device").child("hutbui").set({
        status: "0",
      })
})
// LẤY DATA VỀ
var Value_Temp = document.querySelector(".Value_Temp")
var temp_living = firebase.database().ref().child('livingroom').child("sensor").child("temp").child("value")
temp_living.on('value', function(snap) {Value_Temp.innerText = snap.val()})
var Value_Humidity = document.querySelector(".Value_Humidity")
var humidity_living = firebase.database().ref().child('livingroom').child("sensor").child("humidity").child("value")
humidity_living.on('value', function(snap) {Value_Humidity.innerHTML = snap.val()})

var value_3 = document.querySelector(".value_3")
var light_bedroom = firebase.database().ref().child("livingroom").child("sensor").child("light")
light_bedroom.on("value", function(snap){value_3.innerHTML = snap.val()})

var value_2 = document.querySelector(".value_2")
var dust_bedroom = firebase.database().ref().child("livingroom").child("sensor").child("dust")
dust_bedroom.on("value", function(snap){value_2.innerHTML = snap.val()})

var status_led_living = firebase.database().ref().child('livingroom').child("device").child("led").child("status")
status_led_living.on('value', function(snap) {if(snap.val()=="1"){
    publish_message('ON',"Livingroom/device_2")
    Device_2_ON.classList.remove("hiden")
    thanhtruot.classList.remove("hiden")
    Device_2_OFF.classList.add("hiden")
    BTN_Device_2_OFF.classList.remove("set_btn")
    BTN_Device_2_ON.classList.add("set_btn")
}
else{
    publish_message('OFF',"Livingroom/device_2")
    Device_2_ON.classList.add("hiden")
    thanhtruot.classList.add("hiden")
    Device_2_OFF.classList.remove("hiden")
    BTN_Device_2_ON.classList.remove("set_btn")
    BTN_Device_2_OFF.classList.add("set_btn")
}})

var status_maylanh_living = firebase.database().ref().child('livingroom').child("device").child("maylanh").child("status")
status_maylanh_living.on('value', function(snap) {if(snap.val()=="1"){
    publish_message('ON',"Livingroom/device_1")
    Device_1_ON.classList.remove("hiden")
    Device_1_OFF.classList.add("hiden")
    BTN_Device_1_OFF.classList.remove("set_btn")
    BTN_Device_1_ON.classList.add("set_btn")
    control_device_1.classList.remove("hiden")
    text_value_device_1.innerHTML = valueTemp1 + " °C"
}
else{
    publish_message('OFF',"Livingroom/device_1")
    Device_1_ON.classList.add("hiden")
    Device_1_OFF.classList.remove("hiden")
    BTN_Device_1_ON.classList.remove("set_btn")
    BTN_Device_1_OFF.classList.add("set_btn")
    control_device_1.classList.add("hiden")
}})

var status_tv_living = firebase.database().ref().child('livingroom').child("device").child("tv").child("status")
status_tv_living.on('value', function(snap) {if(snap.val()=="1"){
    publish_message('ON',"Livingroom/device_3")
    Device_3_ON.classList.remove("hiden")
    Device_3_OFF.classList.add("hiden")
    BTN_Device_3_OFF.classList.remove("set_btn")
    BTN_Device_3_ON.classList.add("set_btn")
}
else{
    publish_message('OFF',"Livingroom/device_3")
    Device_3_ON.classList.add("hiden")
    Device_3_OFF.classList.remove("hiden")
    BTN_Device_3_ON.classList.remove("set_btn")
    BTN_Device_3_OFF.classList.add("set_btn")
}})

var status_hutbui_living = firebase.database().ref().child('livingroom').child("device").child("hutbui").child("status")
status_hutbui_living.on('value', function(snap) {if(snap.val()=="1"){
    publish_message('ON',"Livingroom/device_4")
    Device_4_ON.classList.remove("hiden")
    Device_4_OFF.classList.add("hiden")
    BTN_Device_4_OFF.classList.remove("set_btn")
    BTN_Device_4_ON.classList.add("set_btn")
}
else{
    publish_message('OFF',"Livingroom/device_4")
    Device_4_ON.classList.add("hiden")
    Device_4_OFF.classList.remove("hiden")
    BTN_Device_4_ON.classList.remove("set_btn")
    BTN_Device_4_OFF.classList.add("set_btn")
}})