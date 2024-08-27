from models import Finance

#MongoDB driver
import motor.motor_asyncio

from bson import ObjectId


from pymongo import ReturnDocument

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017')

# We are connecting to a database called Finance_track(created automatically if not exsting)
database = client.Finance_track

# Creating a collection finance in our databse Finance_track
collection = database.finance


async def fectch_one(id: str):
    document = await collection.find_one({"_id": ObjectId(id)})
    document["id"] = str(document["_id"])
    del document["_id"]
    return document

async def fectch_all():
    cursor = collection.find({})
    result = []
    async for document in cursor:
        doc = {**document}
        doc["id"] = str(doc["_id"])
        del doc["_id"]
        result.append(doc)
    return result

async def create(finance: Finance):
    result = await collection.insert_one(finance)
    return finance

async def update_finance(id:str, cnt: Finance):
    cnt = dict(cnt)
    await collection.update_one({"_id": ObjectId(id)},{"$set":{**cnt}})
    document = await collection.find_one({"_id": ObjectId(id)})
    return document

async def delete_finance(id: str):
    
    await collection.delete_one({"_id":ObjectId(id)})
    return True