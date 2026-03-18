import streamlit as st
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import plotly.express as px
import joblib
from sklearn.metrics import r2_score

st.title("Model Insights")

df = pd.read_csv("data/city_day.csv")
df = df[["PM2.5","PM10","NO2","CO","SO2","O3","AQI"]]
df = df.dropna()

model = joblib.load("model/aqi_model.pkl")

X = df.drop("AQI", axis=1)
y = df["AQI"]
y_pred = model.predict(X)

# Accuracy
r2 = r2_score(y, y_pred)
st.metric("Model R2 Score", round(r2,3))

# Feature Importance
importance = model.feature_importances_
features = X.columns

fig = px.bar(
    x=features,
    y=importance,
    title="Feature Importance"
)

st.plotly_chart(fig, use_container_width=True)

# Correlation Heatmap
st.subheader("Correlation Heatmap")

plt.figure(figsize=(8,6))
sns.heatmap(df.corr(), annot=True, cmap="coolwarm")
st.pyplot(plt)
