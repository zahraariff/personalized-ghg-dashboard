const mqtt = require('mqtt');
// const MongoClient = require('mongodb').MongoClient; //deprecated
const { MongoClient } = require('mongodb');
const { timestamp } = require('rxjs');

const mqttBrokerUrl = 'mqtt://test.mosquitto.org/'; // Replace with your Raspberry Pi's IP
const mqttTopic = 'mhz19/co2';
const mqttTopic2 = 'mhz19/c02/sensor2';

const mongoUri = 'mongodb+srv://zahraariff:nd6CyXk46GSJ6kg1@cluster0.q341x8n.mongodb.net/';
const dbName = 'test';

const protocol = 'mqtt'
const port = '1883'
const clientId = 'raspberry-pi-client'

// Create a new MongoClient
const client = new MongoClient(mongoUri);
// Connect to MongoDB
// client.connect()
//   .then(() => {
//     console.log('Connected to MongoDB');

//   })
//   .catch(error => console.error('Error connecting to MongoDB:', error));


  // Connect to the open source MQTT Broker
  const mqttClient = mqtt.connect(mqttBrokerUrl);

  mqttClient.on('connect', () => {
    console.log('MQTT connected');

    // mqttClient.subscribe(mqttTopic, mqttTopic2);
    mqttClient.subscribe('mhz19/#');

  });

  mqttClient.on('message', (topic, message) => {
    // Assuming the payload is a Buffer, convert it to a string
    const payloadString = message.toString();
    const db = client.db(dbName); // Specify the database
    const timestamp = new Date(); // Get the current timestamp
    let sensorName, location;

    // Your logic here
    onMessageCallback(payloadString);
    
    // Handle different topics
  if (topic === 'mhz19/co2') {
    // Handle co2 topic
    console.log('Received message on sensor1 topic:', payloadString);
    sensorName = 'mhz19-sensor1';
    location = 'fsktm';
  } else if (topic == 'mhz19/co2/sensor2') {
    // Handle sensor2 topic
    console.log('Received message on sensor2 topic:', payloadString);
    sensorName = 'mhz19-sensor2';
    location = 'ias';
  } else {
    // Handle other topics (if needed)
    console.log('Received message on unknown topic:', topic, payloadString);
  }

    /// Store data in MongoDB
    // db.collection('co2sensordata').insertOne({ 
    //   co2: payloadString, 
    //   timestamp: timestamp,
    //   sensorName: sensorName,
    //   location: location
    //  }, (err, result) => {
    //   if (err) throw err;

    //   console.log('Data inserted into MongoDB:', payloadString, 'Sensor:', sensorName, 'Location:', location);
    // });
  })

function onMessageCallback(payload) {
  // This function is called when a new message is received
  console.log('Received message:', payload);
  // console.log(timestamp.getDate());
  // Add your logic here
}
