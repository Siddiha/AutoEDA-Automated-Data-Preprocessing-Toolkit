from fastapi import APIRouter, UploadFile, File, HTTPException
import pandas as pd
from typing import Dict

router = APIRouter()

@router.post('/summary-stats')
async def summary_stats(file: UploadFile = File(...)) -> Dict:
    if not file.filename.lower().endswith('.csv'):
        raise HTTPException(status_code=400, detail='Only CSV files are supported.')
    try:
        df = pd.read_csv(file.file)
        stats = df.describe(include='all').fillna('').to_dict()
        return {"status": "success", "summary": stats, "columns": df.columns.tolist(), "shape": df.shape}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 