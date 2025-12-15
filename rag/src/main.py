from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware  
from pydantic import BaseModel
from utils.chat import retriever
from dotenv import load_dotenv
from utils.load_repo import get_github_files
import os


load_dotenv()

app = FastAPI(title="CodeLens RAG API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class QueryRequest(BaseModel):
    query: str
    projectId: str


@app.get("/")
def root():
    return {"status": "Fast API running"}

@app.post("/query")
def query_repo(request: QueryRequest):
    try:
        print(request.query, request.projectId)
        answer = retriever(request.query,request.projectId )
        return {"answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class CostRequest(BaseModel):
    repoName: str
    accessToken: str
    
@app.get("/cost")
def repo_files(repoName: str, accessToken: str ):
    try:
        access_token = accessToken or os.getenv("GITHUB_TOKEN")
        files = get_github_files(repoName, access_token)
        return {"cost": len(files)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
