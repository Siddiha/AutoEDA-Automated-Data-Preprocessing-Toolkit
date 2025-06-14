import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, MinMaxScaler, RobustScaler
from scipy.stats import skew
import argparse
import os

def detect_numeric_columns(df):
    """
    Detect numeric columns, excluding binary and ID-like columns.
    """
    numeric_cols = []
    for col in df.select_dtypes(include=[np.number]).columns:
        unique_vals = df[col].nunique()
        if unique_vals > 2 and not col.lower().endswith(('id', 'code')):
            numeric_cols.append(col)
    return numeric_cols

def auto_scale_features(df):
    """
    Apply StandardScaler, MinMaxScaler, and RobustScaler to each numeric column.
    Select the scaler that minimizes skewness for each column.
    Return the scaled DataFrame and a report of which scaler was used per column.
    """
    numeric_cols = detect_numeric_columns(df)
    scaler_report = {}
    scaled_data = df.copy()
    scalers = {
        'StandardScaler': StandardScaler(),
        'MinMaxScaler': MinMaxScaler(),
        'RobustScaler': RobustScaler()
    }
    for col in numeric_cols:
        best_scaler = None
        best_skew = None
        best_scaled = None
        for name, scaler in scalers.items():
            arr = df[[col]].dropna().values
            scaled = scaler.fit_transform(arr)
            col_skew = abs(skew(scaled.flatten()))
            if best_skew is None or col_skew < best_skew:
                best_skew = col_skew
                best_scaler = name
                best_scaled = scaler.fit_transform(df[[col]].values)
        scaler_report[col] = best_scaler
        scaled_data[col] = best_scaled
    return scaled_data, scaler_report

def main(input_csv, output_csv):
    """
    Main function to load CSV, scale features, and save results.
    """
    if not os.path.exists(input_csv):
        print(f"Input file not found: {input_csv}")
        return
    df = pd.read_csv(input_csv)
    scaled_df, scaler_report = auto_scale_features(df)
    scaled_df.to_csv(output_csv, index=False)
    print(f"Scaled data saved to: {output_csv}")
    print("Scaler report:")
    for col, scaler in scaler_report.items():
        print(f"  {col}: {scaler}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="AutoEDA Feature Scaling Script")
    parser.add_argument('--input', type=str, required=True, help='Path to input CSV file')
    parser.add_argument('--output', type=str, default='autoEDA_scaled_output.csv', help='Path to save scaled CSV file')
    args = parser.parse_args()
    main(args.input, args.output) 