from upstash_redis import Redis
import json
import time
from utils.load_repo import loadDocAndStore


redis = Redis.from_env()
QUEUE_NAME = "repo-ingest-queue"
print("✅ Worker started, waiting for jobs...")

while True:
    try:
        # Fetch one job from the queue (from the right end)
        job_data = redis.rpop(QUEUE_NAME)

        # If queue is empty, wait and retry
        if job_data is None:
            time.sleep(2)
            continue

        # Parse the job data
        job = json.loads(job_data)
        jobId = job.get("jobId")
        repoUrl = job.get("repoName")
        accessToken= job.get("accessToken")
        projectId= job.get("projectId")

        print(f"🧩 Processing job {jobId} for {projectId}")
        loadDocAndStore(repoUrl, accessToken, projectId)

    except Exception as e:
        print(f"❌ Error processing job: {e}")
        time.sleep(2)
