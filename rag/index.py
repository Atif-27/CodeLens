from load_repo import load_github_repo_fast  
from ingestor import chunk_and_store_in_qdrant

def loadDocAndStore(REPO, TOKEN ):
    repo_id = REPO.replace("/", "_")
    docs = load_github_repo_fast(REPO, TOKEN)
    chunk_and_store_in_qdrant(repo_id, docs)
