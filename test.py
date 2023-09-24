from kafka import KafkaConsumer
consumer = KafkaConsumer('topic1',bootstrap_servers=['localhost:9092'],api_version=(0, 10, 1))

try:
    for mgs in consumer :
        print(mgs.value)
except KeyboardInterrupt:
    pass