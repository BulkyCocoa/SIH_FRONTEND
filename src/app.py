from flask import Flask, request, jsonify
import pandas as pd
from prophet import Prophet
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

# Load the dataset
DATA_PATH = "GERUSOPPAORIGINAL.xlsx"  # Adjust path to your data file
df = pd.read_excel(DATA_PATH)
df['Date'] = pd.to_datetime(df['Date'])

# Prepare data for Prophet
level_data = df[['Date', 'Level']].rename(columns={'Date': 'ds', 'Level': 'y'})
storage_data = df[['Date', 'Storage']].rename(columns={'Date': 'ds', 'Storage': 'y'})

# Train models for Level and Storage
model_level = Prophet(yearly_seasonality=True, daily_seasonality=True)
model_level.fit(level_data)

model_storage = Prophet(yearly_seasonality=True, daily_seasonality=True)
model_storage.fit(storage_data)

# Monthly forecast endpoint
@app.route("/forecast-monthly", methods=["POST"])
def forecast_monthly():
    try:
        data = request.json
        if not data or "year" not in data:
            return jsonify({"error": "Missing 'year' in request data"}), 400

        year = int(data["year"])

        if year < 2021 or year < 2000 or year > 2050:
            return jsonify({"error": "Year must be between 2000 and 2050 and greater than 2020"}), 400

        # Generate future dates for the given year (monthly)
        start_date = f"{year}-01-01"
        end_date = f"{year}-12-31"
        future_dates = pd.date_range(start=start_date, end=end_date, freq="M")

        future_level = pd.DataFrame({"ds": future_dates})
        future_storage = pd.DataFrame({"ds": future_dates})

        forecast_level = model_level.predict(future_level)
        forecast_storage = model_storage.predict(future_storage)

        # Monthly aggregation
        forecast_level["Year-Month"] = forecast_level["ds"].dt.to_period("M")
        forecast_storage["Year-Month"] = forecast_storage["ds"].dt.to_period("M")

        monthly_level = forecast_level.groupby("Year-Month")["yhat"].mean()
        monthly_storage = forecast_storage.groupby("Year-Month")["yhat"].mean()

        # Convert Year-Month Period to string for response
        monthly_level_str = {str(key): value for key, value in monthly_level.items()}
        monthly_storage_str = {str(key): value for key, value in monthly_storage.items()}

        response = {
            "year": year,
            "monthly_level": monthly_level_str,
            "monthly_storage": monthly_storage_str,
        }
        return jsonify(response)

    except Exception as e:
        return jsonify({"error": "Internal Server Error", "message": str(e)}), 500


# Daily forecast endpoint
@app.route("/forecast-daily", methods=["POST"])
def forecast_daily():
    try:
        data = request.json
        if not data or "date" not in data:
            return jsonify({"error": "Missing 'date' in request data"}), 400

        selected_date = pd.to_datetime(data["date"])
        future_dates = pd.date_range(start=selected_date, periods=15)

        future_level = pd.DataFrame({"ds": future_dates})
        future_storage = pd.DataFrame({"ds": future_dates})

        forecast_level = model_level.predict(future_level)
        forecast_storage = model_storage.predict(future_storage)

        daily_level = [
            {"date": row["ds"].strftime("%Y-%m-%d"), "level": row["yhat"]}
            for _, row in forecast_level.iterrows()
        ]
        daily_storage = [
            {"date": row["ds"].strftime("%Y-%m-%d"), "storage": row["yhat"]}
            for _, row in forecast_storage.iterrows()
        ]

        return jsonify({
            "start_date": selected_date.strftime("%Y-%m-%d"),
            "daily_level": daily_level,
            "daily_storage": daily_storage
        })

    except Exception as e:
        return jsonify({"error": "Internal Server Error", "message": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
