var kafka = require('kafka-node'),
    Producer = kafka.Producer,
    KeyedMessage = kafka.KeyedMessage,
    client = new kafka.KafkaClient(),
    producer = new Producer(client),
    km = new KeyedMessage('key', 'message'),
    payloads = [
        { topic: 'spec_BPC', messages: JSON.stringify({'mti':'0800','24':801}), partition: 0 },
        //{ topic: 'topic2', messages: ['hello', 'world', km] }
    ];
producer.on('ready', function (payloads) {
    producer.send(payloads, function (err, data) {
        console.log(data);
    });
});
 
producer.on('error', function (err) {})