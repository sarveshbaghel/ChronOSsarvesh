import streamlit as st
import numpy as np
import joblib
from utils.helper import get_aqi_category

model = joblib.load("model/aqi_model.pkl")

st.title("AQI Prediction")

col1, col2, col3 = st.columns(3)

with col1:
    pm25 = st.slider("PM2.5", 0.0, 500.0, 50.0)
    pm10 = st.slider("PM10", 0.0, 500.0, 80.0)

with col2:
    no2 = st.slider("NO2", 0.0, 300.0, 40.0)
    co = st.slider("CO", 0.0, 10.0, 1.0)

with col3:
    so2 = st.slider("SO2", 0.0, 200.0, 10.0)
    o3 = st.slider("O3", 0.0, 300.0, 30.0)

if st.button("Predict AQI"):

    input_data = np.array([[pm25, pm10, no2, co, so2, o3]])
    prediction = model.predict(input_data)[0]

    category = get_aqi_category(prediction)

    st.markdown("## Prediction Result")

    if prediction <= 100:
        st.success(f"AQI: {round(prediction,2)} - {category}")
    elif prediction <= 200:
        st.warning(f"AQI: {round(prediction,2)} - {category}")
    else:
        st.error(f"AQI: {round(prediction,2)} - {category}")
