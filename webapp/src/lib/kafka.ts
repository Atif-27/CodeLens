import { url } from "inspector";
import { Kafka } from "kafkajs";
import { v4 as uuidv4 } from "uuid";




export default async function ingestRepo(repoName: string, accessToken: string, projectId: string) {
    const kafka = new Kafka({
        clientId: "my-app",
        brokers: ["localhost:9092"]
    });
    const producer = kafka.producer();
    const jobId = uuidv4();
    await producer.connect();
    await producer.send({
        topic: "repo-ingest",
        messages: [
            {
                value: JSON.stringify({
                    jobId: jobId,
                    repoName: repoName,
                    accessToken,
                    projectId,
                    timestamp: new Date().toISOString()
                })
            }
        ]
    });

    console.log(`✅ Enqueued repo ingestion job ${jobId} for ${repoName}`);
}


