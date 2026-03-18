def get_aqi_category(aqi):
    if aqi <= 50:
        return "Good 😊"
    elif aqi <= 100:
        return "Moderate 😐"
    elif aqi <= 200:
        return "Poor 😷"
    elif aqi <= 300:
        return "Very Poor ⚠"
    else:
        return "Severe 🚨"
