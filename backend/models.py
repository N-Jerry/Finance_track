from pydantic import BaseModel
# pydantic helps us auto-create json schema from the models and acts like ORM

class Finance(BaseModel):
    amount: float
    category: str
    description: str
    is_income: bool
    date: str