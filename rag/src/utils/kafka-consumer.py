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
        jobId = job.get("jobId")
        repoName = job.get("repoName")
        accessToken= job.get("accessToken")
        projectId= job.get("projectId")
        
        print(f"🧩 Processing job {jobId} for {projectId}") 
        loadDocAndStore(repoName, accessToken,projectId)
    except Exception as e:
        print(f"❌ Error processing message: {e}")
