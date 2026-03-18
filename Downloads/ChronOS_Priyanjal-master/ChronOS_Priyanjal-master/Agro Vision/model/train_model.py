import pandas as pd
import pickle
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder

# Load dataset
data = pd.read_csv("../data/crop_dataset.csv")

# Features and Target
X = data[["temperature", "humidity", "rainfall"]]
y = data["crop"]

# Encode crop labels
label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y_encoded, test_size=0.2, random_state=42
)

# Train model
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Save model
with open("saved_model.pkl", "wb") as f:
    pickle.dump((model, label_encoder), f)

print("Model trained and saved successfully!")
