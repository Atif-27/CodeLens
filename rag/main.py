from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware  
from pydantic import BaseModel
from chat import retriever
from dotenv import load_dotenv
from load_repo import get_github_files
import os
load_dotenv()


app = FastAPI(title="CodeLens RAG API")
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
    return {"status": "Fast API running"}

@app.post("/query")
def query_repo(request: QueryRequest):
    try:
        print(request.query, request.repoId)
        repoId=request.repoId.replace("/","_")
        answer = retriever(request.query,repoId )
        return {"answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class CostRequest(BaseModel):
    repoId: str
    accessToken: str
    
@app.get("/cost")
def repo_files(repoId: str, accessToken: str | None = None):
    try:
        access_token = accessToken or os.getenv("GITHUB_TOKEN")
        files = get_github_files(repoId, access_token)
        return {"cost": len(files)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
