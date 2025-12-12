from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware  
from pydantic import BaseModel
from chat import retriever

app = FastAPI(title="DevSync RAG API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class QueryRequest(BaseModel):
    query: str
    repoId: str

@app.get("/")
def root():
    return {"status": "RAG API running"}

@app.post("/query")
def query_repo(request: QueryRequest):
    try:
        print(request.query, request.repoId)
        repoId=request.repoId.replace("/","_")
        answer = retriever(request.query,repoId )
        return {"answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
