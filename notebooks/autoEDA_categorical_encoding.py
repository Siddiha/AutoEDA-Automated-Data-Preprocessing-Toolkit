import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
import argparse
import os

def detect_categorical_columns(df):
    """
    Detect categorical columns (object or category dtype).
    """
    return [col for col in df.columns if df[col].dtype == 'object' or str(df[col].dtype).startswith('category')]

def classify_categorical_columns(df, cat_cols):
    """
    Classify categorical columns as binary, low-cardinality, or high-cardinality.
    Returns a dict: {col: 'binary'|'low'|'high'}
    """
    col_types = {}
    for col in cat_cols:
        n_unique = df[col].nunique(dropna=False)
        if n_unique == 2:
            col_types[col] = 'binary'
        elif 3 <= n_unique <= 10:
            col_types[col] = 'low'
        elif n_unique > 10:
            col_types[col] = 'high'
    return col_types

def encode_categorical_columns(df, col_types):
    """
    Encode categorical columns based on their type.
    Returns the encoded DataFrame and a report of encodings used.
    """
    df_encoded = df.copy()
    encoding_report = {}
    preview = {}
    for col, ctype in col_types.items():
        before = df_encoded[col].head(8).tolist()
        if ctype == 'binary':
            le = LabelEncoder()
            df_encoded[col] = le.fit_transform(df_encoded[col].astype(str))
            encoding_report[col] = 'LabelEncoder'
        elif ctype == 'low':
            dummies = pd.get_dummies(df_encoded[col], prefix=col)
            df_encoded = pd.concat([df_encoded.drop(columns=[col]), dummies], axis=1)
            encoding_report[col] = 'OneHotEncoder'
        elif ctype == 'high':
            freq = df_encoded[col].map(df_encoded[col].value_counts())
            df_encoded[col] = freq
            encoding_report[col] = 'FrequencyEncoder'
        after_cols = [c for c in df_encoded.columns if c.startswith(col)] if ctype == 'low' else [col]
        after = df_encoded[after_cols].head(8).values.tolist() if ctype == 'low' else df_encoded[col].head(8).tolist()
        preview[col] = {'before': before, 'after': after, 'encoding': encoding_report[col]}
    return df_encoded, encoding_report, preview

def main(input_csv, output_csv):
    df = pd.read_csv(input_csv)
    cat_cols = detect_categorical_columns(df)
    col_types = classify_categorical_columns(df, cat_cols)
    df_encoded, encoding_report, preview = encode_categorical_columns(df, col_types)
    df_encoded.to_csv(output_csv, index=False)
    print(f"Encoded data saved to: {output_csv}")
    print("Encoding report:")
    for col, enc in encoding_report.items():
        print(f"  {col}: {enc}")
    print("\nPreview of encodings (first 8 rows):")
    for col, info in preview.items():
        print(f"\nColumn: {col} ({info['encoding']})")
        print("Before:", info['before'])
        print("After:", info['after'])

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="AutoEDA Categorical Encoding Script")
    parser.add_argument('--input', type=str, required=True, help='Path to input CSV file')
    parser.add_argument('--output', type=str, default='autoEDA_encoded_output.csv', help='Path to save encoded CSV file')
    args = parser.parse_args()
    main(args.input, args.output) 