import streamlit as st
import joblib
import pandas as pd
import plotly.express as px
from utils.report_generator import generate_report
from utils.helper import get_aqi_category

st.title("Download Environmental Report")

model = joblib.load("model/aqi_model.pkl")

df = pd.read_csv("data/city_day.csv")
df = df[["PM2.5","PM10","NO2","CO","SO2","O3","AQI"]]
df = df.dropna()

X = df.drop("AQI", axis=1)

importance = model.feature_importances_

# Create feature importance chart
fig = px.bar(
    x=X.columns,
    y=importance,
    title="Feature Importance"
)

chart_path = "feature_importance.png"
fig.write_image(chart_path)

city = st.text_input("Enter City Name")
aqi = st.number_input("Enter Predicted AQI")

if st.button("Generate Report"):

    category = get_aqi_category(aqi)

    file_path = generate_report(city, aqi, category, chart_path)

    with open(file_path, "rb") as f:
        st.download_button(
            "Download Professional PDF Report",
            f,
            file_name="EcoGuard_Report.pdf"
        )
