from kafka import KafkaConsumer
from index import loadDocAndStore
import json

consumer = KafkaConsumer(
    'repo-ingest',
    bootstrap_servers='localhost:9092',
    group_id='rag-ingestor',
    enable_auto_commit=True,
    auto_offset_reset='latest',
    value_deserializer=lambda v: json.loads(v.decode('utf-8')) if v and v.strip() else None
)

print("✅ Worker started, waiting for jobs...")

for msg in consumer:
    print(msg)
    try:
        job = msg.value
        if not job:
            print("⚠️ Skipping empty or invalid message")
            continue
        job_id = job.get("job_id")
        repo_url = job.get("url")
        access_token= job.get("access_token")
        loadDocAndStore(repo_url, access_token)
    except Exception as e:
        print(f"❌ Error processing message: {e}")
