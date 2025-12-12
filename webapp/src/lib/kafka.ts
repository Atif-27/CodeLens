import { Kafka } from "kafkajs";
import { v4 as uuidv4 } from "uuid";

const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["localhost:9092"]
});

const producer = kafka.producer();


export default async function ingestRepo(url: string, access_token: string) {
    const job_id = uuidv4();
    await producer.connect();
    await producer.send({
        topic: "repo-ingest",
        messages: [
            {
                value: JSON.stringify({
                    job_id: job_id,
                    url: url,
                    access_token: access_token,
                    timestamp: new Date().toISOString()
                })
            }
        ]
    });

    console.log(`✅ Enqueued repo ingestion job ${job_id} for ${url}`);
}


