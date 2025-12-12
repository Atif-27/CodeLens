import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_openai import OpenAIEmbeddings
from langchain_qdrant import QdrantVectorStore
from qdrant_client import models


# Load environment variables
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")



# Initialize embeddings (Gemini)
embeddings=OpenAIEmbeddings(
    model="text-embedding-3-large",
)

# Connect to Qdrant
vector_db = QdrantVectorStore.from_existing_collection(
    embedding=embeddings,
    url="http://localhost:6333",
    collection_name="repos_all"
)

# Initialize Gemini chat model
llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash-lite",
    google_api_key=GOOGLE_API_KEY
)


def retriever(user_query: str , repo_id: str):
    # Retrieve top chunks
    search_result = vector_db.similarity_search(
        query=user_query,
        k=3,
        filter=models.Filter(
            must=[
                models.FieldCondition(
                    key="repo_id",
                    match=models.MatchValue(value=repo_id)
                )
            ]
        )
    )
    for i, res in enumerate(search_result, 1):
        print(f"\n🔹 Result {i}")
        print(f"📄 File: {res.metadata.get('path')}")
        print(res.page_content[:300], "...\n")


    # Prepare context
    context = "\n\n\n".join(
        f"Code snippet: {res.page_content}\nRepo: {res.metadata.get('repo_id')}, File: {res.metadata.get('source')}"
        for res in search_result
    )

    SYSTEM_PROMPT = f"""
    You are an expert AI assistant with deep knowledge of programming and software architecture.
    You have access to source code and documentation from a GitHub repository.
    Use the provided CONTEXT BLOCK to answer the user's question accurately.
    If the context does not include the answer, reply: "I'm sorry, but I don't know the answer to that question."

    Do NOT invent or guess answers.
    Do NOT mention that the context was provided by the user.
    Always sound confident and professional.

    START CONTEXT BLOCK
    {context}
    END OF CONTEXT BLOCK
    """


    # Ask Gemini model
    response = llm.invoke(f"{SYSTEM_PROMPT}\n\nUser question: {user_query}")
    paths= set()
    for res in search_result:
        paths.add(res.metadata.get("path"))
    # Print answer
    return response.content

