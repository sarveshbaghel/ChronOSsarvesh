from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Image
)
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from reportlab.lib.pagesizes import A4

import os


def generate_report(city, aqi_value, category, chart_path):

    file_path = "EcoGuard_Report.pdf"
    doc = SimpleDocTemplate(file_path, pagesize=A4)
    elements = []

    styles = getSampleStyleSheet()

    title_style = styles["Heading1"]
    normal_style = styles["Normal"]

    # Title
    elements.append(Paragraph("Eco-Guard AI Environmental Report", title_style))
    elements.append(Spacer(1, 20))

    # Content
    elements.append(Paragraph(f"<b>City:</b> {city}", normal_style))
    elements.append(Spacer(1, 10))

    elements.append(Paragraph(f"<b>Predicted AQI:</b> {round(aqi_value,2)}", normal_style))
    elements.append(Spacer(1, 10))

    elements.append(Paragraph(f"<b>Category:</b> {category}", normal_style))
    elements.append(Spacer(1, 20))

    elements.append(Paragraph("<b>Health Advisory:</b>", styles["Heading3"]))
    elements.append(Spacer(1, 10))

    if aqi_value <= 100:
        advice = "Air quality is acceptable."
    elif aqi_value <= 200:
        advice = "Avoid prolonged outdoor activities."
    else:
        advice = "Avoid outdoor exposure. Wear N95 mask."

    elements.append(Paragraph(advice, normal_style))
    elements.append(Spacer(1, 30))

    # Add Chart Image
    if os.path.exists(chart_path):
        img = Image(chart_path, width=5*inch, height=3*inch)
        elements.append(Paragraph("<b>Feature Importance Analysis:</b>", styles["Heading3"]))
        elements.append(Spacer(1, 15))
        elements.append(img)

    doc.build(elements)

    return file_path
