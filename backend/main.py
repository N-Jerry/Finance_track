from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import Finance

from database import (
    fectch_all,
    fectch_one,
    update_finance,
    delete_finance,
    create,
)
#App object
app = FastAPI()

origins = ['http://localhost:5173']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials = True,
    allow_methods = ['*'],
    allow_headers = ['*'],
)

# allow_headers: A list of HTTP request headers that should be supported for cross-origin requests.

@app.get("/")
def read_root():
    return {"msg":"Hey, working"}

@app.get("/api/finance/")
async def get_finance():
    response = await fectch_all()
    return response

@app.get("/api/finance/{id}", response_model=Finance)
async def get_finance_by_id(id: str):
    response = await fectch_one(id)
    if response:
        return response
    raise HTTPException(404, f"Record with id {id} not found")

@app.post("/api/finance/", response_model=Finance)
async def create_finance(finance: Finance):
    response = await create(finance.model_dump())
    if response:
        return response
    # 400 is status code for bad request
    raise HTTPException(400, "Something went wrong/ BAD REQUEST")

@app.put("/api/finance/{id}", response_model=Finance)
async def update(id: str, cnt: Finance):
    response = await update_finance(id, cnt)
    if response:
        return response
    # 400 is status code for bad request
    raise HTTPException(400, "Something went wrong/ BAD REQUEST")

@app.delete("/api/finance/{id}")
async def delete(id: str):
    response = await delete_finance(id)
    if response:
        return "Deletion successful"
    # 400 is status code for bad request
    raise HTTPException(400, "Something went wrong/ BAD REQUEST")