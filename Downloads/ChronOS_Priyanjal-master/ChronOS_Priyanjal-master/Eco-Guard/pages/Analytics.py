import streamlit as st
import pandas as pd
import plotly.express as px

df = pd.read_csv("data/city_day.csv")
df = df.dropna()

st.title("AQI Analytics Dashboard")

city = st.selectbox("Select City", df["City"].unique())

city_df = df[df["City"] == city]

fig = px.line(
    city_df,
    x="Date",
    y="AQI",
    title=f"AQI Trend - {city}"
)

st.plotly_chart(fig, use_container_width=True)

# Download chart
st.download_button(
    "Download Chart as PNG",
    data=fig.to_image(format="png"),
    file_name="aqi_chart.png"
)
