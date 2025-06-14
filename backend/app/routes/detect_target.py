from fastapi import APIRouter, UploadFile, File, HTTPException
import pandas as pd
from typing import Dict

router = APIRouter()

@router.post('/detect-target')
async def detect_target(file: UploadFile = File(...)) -> Dict:
    if not file.filename.lower().endswith('.csv'):
        raise HTTPException(status_code=400, detail='Only CSV files are supported.')
    try:
        df = pd.read_csv(file.file)
        candidates = [col for col in df.columns if col.lower() in ['target', 'label', 'y']]
        suggested = candidates[0] if candidates else df.columns[-1]
        return {"status": "success", "suggested_target": suggested, "columns": df.columns.tolist()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 