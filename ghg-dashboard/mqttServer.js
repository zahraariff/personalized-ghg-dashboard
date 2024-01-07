const mqtt = require('mqtt');
// const MongoClient = require('mongodb').MongoClient; //deprecated
const { MongoClient } = require('mongodb');

const mqttBrokerUrl = 'mqtt://test.mosquitto.org/'; // Replace with your Raspberry Pi's IP
const mqttTopic = 'mhz19/co2';

const mongoUri = 'mongodb+srv://zahraariff:nd6CyXk46GSJ6kg1@cluster0.q341x8n.mongodb.net/';
const dbName = 'test';

const protocol = 'mqtt'
const port = '1883'
const clientId = 'raspberry-pi-client'

// Create a new MongoClient
const client = new MongoClient(mongoUri);
// Connect to MongoDB
client.connect()
  .then(() => {
    console.log('Connected to MongoDB');

  })
  .catch(error => console.error('Error connecting to MongoDB:', error));


  // Connect to the open source MQTT Broker
  const mqttClient = mqtt.connect(mqttBrokerUrl);

  mqttClient.on('connect', () => {
    console.log('MQTT connected');

    mqttClient.subscribe(mqttTopic);
  });

  mqttClient.on('message', (topic, message) => {
    // Assuming the payload is a Buffer, convert it to a string
    const payloadString = message.toString();
    const db = client.db(dbName); // Specify the database
    const timestamp = new Date(); // Get the current timestamp

    // Your logic here
    onMessageCallback(payloadString);

    /// Store data in MongoDB
    db.collection('co2sensordata').insertOne({ co2: payloadString, timestamp: timestamp }, (err, result) => {
      if (err) throw err;

      console.log('Data inserted into MongoDB:', payloadString);
    });
  })

function onMessageCallback(payload) {
  // This function is called when a new message is received
  console.log('Received message:', payload);
  // Add your logic here
}
