// KHAI BÁO THƯ VIỆN
#include <WiFi.h>  
#include <PubSubClient.h>
#include <DHT.h>

// KHAI BÁO PASS VÀ TÊN WIFI
const char* ssid = "MERCUSYS_83B1";
const char* password = "B5810B5810";

// KHAI BÁO BIẾN CỦA MILLIS()
unsigned long thoigian;
unsigned long hientai = 0;

// KHAI BÁO CÁC CỔNG I/O
#define led1 13
#define led2 12
#define led3 14
#define led4 27

#define btn1 15
#define btn2 2
#define btn3 4
#define btn4 5

// KHAI BÁO DHT11
const int DHTPIN = 18;
const int DHTTYPE = DHT11;
DHT dht(DHTPIN, DHTTYPE);

// KHAI BÁO MQTT
#define MQTT_SERVER "broker.mqttdashboard.com"
#define MQTT_PORT 1883
#define MQTT_USER "chechanh2003"
#define MQTT_PASSWORD "0576289825"
#define TOPIC_1 "Livingroom/device_1"
#define TOPIC_2 "Livingroom/device_2"
#define TOPIC_3 "Livingroom/device_3"
#define TOPIC_4 "Livingroom/device_4"

WiFiClient wifiClient;
PubSubClient client(wifiClient);

void setup_wifi() {
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  randomSeed(micros());
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void connect_to_broker() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    String clientId = "IoTLab4";
    clientId += String(random(0xffff), HEX);
    if (client.connect(clientId.c_str(), MQTT_USER, MQTT_PASSWORD)) {
      Serial.println("connected");
      client.subscribe(TOPIC_1);
      client.subscribe(TOPIC_2);
      client.subscribe(TOPIC_3);
      client.subscribe(TOPIC_4);
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 2 seconds");
      delay(2000);
    }
  }
}

void callback(char* topic, byte *payload, unsigned int length) {
  if (strcmp(topic, TOPIC_1) == 0) {
    device_1(topic, payload, length);
  } else if (strcmp(topic, TOPIC_2) == 0) {
    device_2(topic, payload, length);
  }else if (strcmp(topic, TOPIC_3) == 0) {
    device_3(topic, payload, length);
  }else if (strcmp(topic, TOPIC_4) == 0) {
    device_4(topic, payload, length);
  }
}

void device_1(char* topic, byte* payload, unsigned int length) {
  // Xử lý callback cho điều khiển tốc độ quạt
  String message;
  for (int i = 0; i < length; i++) {
    message += (char)payload[i];
  }
  // In ra mesage nhận được
  if(message == "ON"){
    Serial.println("DEVICE 1: " + message);
    digitalWrite(led1, HIGH);
  }else if(message == "OFF"){
    Serial.println("DEVICE 1: " + message);
    digitalWrite(led1, LOW);
  }
}

void device_2(char* topic, byte* payload, unsigned int length) {
  // Xử lý callback cho điều khiển tốc độ quạt
  String message;
  for (int i = 0; i < length; i++) {
    message += (char)payload[i];
  }
  // In ra mesage nhận được
  if(message == "ON"){
    Serial.println("DEVICE 2: " + message);
    digitalWrite(led2, HIGH);
  }else if(message == "OFF"){
    Serial.println("DEVICE 2: " + message);
    digitalWrite(led2, LOW);
  }
}

void device_3(char* topic, byte* payload, unsigned int length) {
  // Xử lý callback cho điều khiển tốc độ quạt
  String message;
  for (int i = 0; i < length; i++) {
    message += (char)payload[i];
  }
  // In ra mesage nhận được
  if(message == "ON"){
    Serial.println("DEVICE 3: " + message);
    digitalWrite(led3, HIGH);
  }else if(message == "OFF"){
    Serial.println("DEVICE 3: " + message);
    digitalWrite(led3, LOW);
  }
}

void device_4(char* topic, byte* payload, unsigned int length) {
  // Xử lý callback cho điều khiển tốc độ quạt
  String message;
  for (int i = 0; i < length; i++) {
    message += (char)payload[i];
  }
  // In ra mesage nhận được
  if(message == "ON"){
    Serial.println("DEVICE 4: " + message);
    digitalWrite(led4, HIGH);
  }else if(message == "OFF"){
    Serial.println("DEVICE 4: " + message);
    digitalWrite(led4, LOW);
  }
}



void setup() {
  pinMode(led1, OUTPUT);
  pinMode(led2, OUTPUT);
  pinMode(led3, OUTPUT);
  pinMode(led4, OUTPUT);

  pinMode(btn1, INPUT);
  pinMode(btn2, INPUT);
  pinMode(btn3, INPUT);
  pinMode(btn4, INPUT);
  
  dht.begin(); //Khởi động cảm biến

  Serial.begin(115200);
  Serial.setTimeout(500);
  setup_wifi();
  client.setServer(MQTT_SERVER, MQTT_PORT );
  client.setCallback(callback);
  connect_to_broker();
}

void send_data_on(char *a) {
  client.publish(a, "ON"); 
  delay(500);
}
void send_data_off(char *a) {
  client.publish(a, "OFF"); 
  delay(500);
}
void loop() {
  client.loop();
  if (!client.connected()) {
    connect_to_broker();
  }
  
  thoigian = millis();

  int trangthai_1 = digitalRead(btn1);
  int trangthai_2 = digitalRead(btn2);
  int trangthai_3 = digitalRead(btn3);
  int trangthai_4 = digitalRead(btn4);

  if(thoigian - hientai > 5000){
    hientai = millis();

    float doam = dht.readHumidity(); //Đọc độ ẩm
    float doC = dht.readTemperature(); //Đọc nhiệt độ C
    char text_doam[5];
    char text_doC[5];

    dtostrf(doam, 2, 0, text_doam);
    Serial.println(text_doam);
    client.publish("Livingroom/doam", text_doam);
    dtostrf(doC, 2, 1, text_doC);
    Serial.println(text_doC);
    client.publish("Livingroom/doC", text_doC);
  }

  if(trangthai_1 == 1){
    int trangthailed_1 = digitalRead(led1);
    if(trangthailed_1 == 1) {
      digitalWrite(led1, LOW);
      send_data_off(TOPIC_1);}
    else{
      digitalWrite(led1, HIGH);
      send_data_on(TOPIC_1);
    }
    delay(500);
  }

  if(trangthai_2 == 1){
    int trangthailed_2 = digitalRead(led2);
    if(trangthailed_2 == 1) {
      digitalWrite(led2, LOW);
      send_data_off(TOPIC_2);}
    else{
      digitalWrite(led2, HIGH);
      send_data_on(TOPIC_2);
    }
    delay(500);
  }

  if(trangthai_3 == 1){
    int trangthailed_3 = digitalRead(led3);
    if(trangthailed_3 == 1) {
      digitalWrite(led3, LOW);
      send_data_off(TOPIC_3);}
    else{
      digitalWrite(led3, HIGH);
      send_data_on(TOPIC_3);
    }
    delay(500);
  }

  if(trangthai_4 == 1){
    int trangthailed_4 = digitalRead(led4);
    if(trangthailed_4 == 1) {
      digitalWrite(led4, LOW);
      send_data_off(TOPIC_4);}
    else{
      digitalWrite(led4, HIGH);
      send_data_on(TOPIC_4);
    }
    delay(500);
  }
}
