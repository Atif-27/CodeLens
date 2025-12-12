import os, uuid, hashlib
from dotenv import load_dotenv
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from qdrant_client import QdrantClient
from qdrant_client.models import PointStruct
from qdrant_client.http.models import VectorParams, Distance

load_dotenv()

QDRANT_HOST = os.getenv("QDRANT_HOST", "localhost")
QDRANT_PORT = int(os.getenv("QDRANT_PORT", 6333))


embeddings = OpenAIEmbeddings(model="text-embedding-3-large")
qdrantClient = QdrantClient(host=QDRANT_HOST, port=QDRANT_PORT)


def hash_text(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def chunk_and_store_in_qdrant(repo_id: str, documents: list):
    print(f"🧩 Splitting {len(documents)} documents for repo: {repo_id} ...")
    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    chunks = splitter.split_documents(documents)
    print(f"✅ Created {len(chunks)} chunks from {len(documents)} files.")

    # Create collection if not exists
    if not qdrantClient.collection_exists("repos_all"):
        qdrantClient.create_collection(
        collection_name="repos_all",
        vectors_config=VectorParams(size=3072, distance=Distance.COSINE)
    )   
        
    # Embed all chunks at once (faster)
    vectors = embeddings.embed_documents([chunk.page_content for chunk in chunks])

    # Prepare points
    points = []
    for vector, doc in zip(vectors, chunks):
        points.append(
            PointStruct(
                id=str(uuid.uuid4()),
                vector=vector,
                payload={
                    "page_content": doc.page_content,
                    "repo_id": repo_id,
                    "metadata": {
                        "repo_id": repo_id,
                        "path": doc.metadata.get("path", ""),
                        "sha": doc.metadata.get("sha", ""),
                        "source": doc.metadata.get("source", ""),
                        "hash": hash_text(doc.page_content),
                    },
                },
            )
        )



    print(f"📦 Uploading {len(points)} vectors for {repo_id} to Qdrant...")
    qdrantClient.upsert(collection_name="repos_all", points=points)
    print(f"✅ Successfully stored vectors for repo: {repo_id}.")
