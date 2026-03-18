import pickle
import os
import numpy as np

MODEL_PATH = os.path.join(os.path.dirname(__file__), "saved_model.pkl")

with open(MODEL_PATH, "rb") as f:
    model, label_encoder = pickle.load(f)


def predict_crop(temperature, humidity, rainfall):

    features = np.array([[temperature, humidity, rainfall]])

    prediction = model.predict(features)
    probabilities = model.predict_proba(features)

    crop = label_encoder.inverse_transform(prediction)[0]

    confidence = float(np.max(probabilities) * 100)

    return {
        "crop": crop,
        "confidence": round(confidence, 2)
    }
