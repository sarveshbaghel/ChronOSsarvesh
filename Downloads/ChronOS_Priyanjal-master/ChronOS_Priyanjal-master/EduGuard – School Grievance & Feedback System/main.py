import streamlit as st
import pandas as pd
import os
from PIL import Image

# -------------------------------
# Page Config
# -------------------------------
st.set_page_config(page_title="Siksha-Suraksha", page_icon="🎓", layout="wide")

# -------------------------------
# Custom CSS
# -------------------------------
st.markdown(
    """
    <style>
    body {
        background-color: #f4f6f9;
        color: #333333;
    }
    .logo-container {
        display: flex;
        justify-content: center;
        margin: 20px 0;
    }
    .logo-container img {
        border-radius: 50%%;
        width: 180px;
        height: 180px;
        object-fit: cover;
        border: 5px solid #1565c0;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    }
    input, textarea, select {
        color: white !important;
        background-color: #222 !important;
    }
    </style>
    """,
    unsafe_allow_html=True
)

# -------------------------------
# Sidebar Navigation
# -------------------------------
st.sidebar.title("📌 Navigation")
page = st.sidebar.radio(
    "",
    ["Home", "Submit Complaint", "Feedback", "Admin Login", "Admin Dashboard","Feedback Dashboard"]
)

# -------------------------------
# Logo
# -------------------------------
logo_path = "sikshasuraksha.JPG"
if os.path.exists(logo_path):
    st.markdown('<div class="logo-container"></div>', unsafe_allow_html=True)
    st.image(logo_path, width=180)
else:
    st.warning("⚠️ Logo not found! Please place 'sikshasuraksha.JPG' in project folder.")

# -------------------------------
# Session State
# -------------------------------
if "is_admin" not in st.session_state:
    st.session_state.is_admin = False

if page == "Home":
    st.title("🎓 School Complaint & Feedback Portal")
    st.write("Welcome to **Siksha-Suraksha** — a platform to raise and resolve school-related issues.")

elif page == "Submit Complaint":
    st.header("📝 Submit a Complaint")

    with st.form("complaint_form", clear_on_submit=True):
        student_name = st.text_input("Student Name")
        school_name = st.text_input("School Name")
        address = st.text_area("Address")
        phone_number = st.text_input("Phone Number")
        father_name = st.text_input("Father's Name")
        mother_name = st.text_input("Mother's Name")

        categories = ["Teacher Absenteeism", "Infrastructure Issue", "Bullying", "Other"]
        category = st.selectbox("Complaint Category", categories)
        details = st.text_area("Complaint Details")
        anonymous = st.checkbox("Submit anonymously?")
        submit_complaint = st.form_submit_button("🚀 Submit Complaint")

    if submit_complaint:
        if anonymous:
            student_name, school_name, address, phone_number, father_name, mother_name = (
                "Anonymous", "N/A", "N/A", "N/A", "N/A", "N/A"
            )

        new_complaint = {
            "student_name": student_name,
            "school_name": school_name,
            "address": address,
            "phone_number": phone_number,
            "father_name": father_name,
            "mother_name": mother_name,
            "category": category,
            "details": details,
            "status": "Pending"
        }

        file_exists = os.path.isfile("complaints.csv")
        complaints_df = pd.DataFrame([new_complaint])
        complaints_df.to_csv("complaints.csv", mode="a", header=not file_exists, index=False)

        st.success("✅ Complaint submitted successfully!")


elif page == "Feedback":
    st.header("💡 Feedback")

    with st.form("feedback_form", clear_on_submit=True):
        name = st.text_input("Your Name")
        feedback_text = st.text_area("Your Feedback")
        submit_feedback = st.form_submit_button("📩 Submit Feedback")

    if submit_feedback:
        new_feedback = {"name": name, "feedback": feedback_text}
        file_exists = os.path.isfile("feedback.csv")
        feedback_df = pd.DataFrame([new_feedback])
        feedback_df.to_csv("feedback.csv", mode="a", header=not file_exists, index=False)

        st.success("✅ Thank you for your feedback!")


elif page == "Admin Login":
    st.header("🔑 Admin Login")

    with st.form("login_form"):
        admin_id = st.text_input("Admin ID")
        admin_pass = st.text_input("Password", type="password")
        login_button = st.form_submit_button("Login")

    if login_button:
        if admin_id == "manan31" and admin_pass == "byteedu":
            st.session_state.is_admin = True
            st.success("✅ Login successful! Go to Admin Dashboard.")
        else:
            st.error("❌ Invalid ID or Password.")

elif page == "Feedback Dashboard":
    if not st.session_state.is_admin:
        st.error("⚠️ Please login as admin first!")
    else:
        st.header("📋 Feedback Dashboard")

        required_columns = [
            "name", "feedback"
        ]

        try:
            feedback_df = pd.read_csv("feedback.csv")
        except FileNotFoundError:
            feedback_df = pd.DataFrame(columns=required_columns)

        # Ensure all required columns exist
        for col in required_columns:
            if col not in feedback_df.columns:
                feedback_df[col] = ""

        # Convert columns to string type to avoid type issues
        feedback_df['name'] = feedback_df['name'].astype(str)
        feedback_df['feedback'] = feedback_df['feedback'].astype(str)

        if feedback_df.empty or feedback_df.shape[0] == 0:
            st.info("No feedback submitted yet.")
        else:
            for i, row in feedback_df.iterrows():
                with st.expander(f"Feedback {i + 1} - From: {row['name']}"):
                    st.write(f"**Name:** {row['name']}")
                    st.write(f"**Feedback:** {row['feedback']}")



elif page == "Admin Dashboard":
    if not st.session_state.is_admin:
        st.error("⚠️ Please login as Admin first!")
    else:
        st.header("📊 Admin Dashboard")

        required_columns = [
            "student_name", "school_name", "address", "phone_number",
            "father_name", "mother_name", "category", "details", "status"
        ]

        try:
            complaints_df = pd.read_csv("complaints.csv")
        except FileNotFoundError:
            complaints_df = pd.DataFrame(columns=required_columns)

        # Ensure all required columns exist
        for col in required_columns:
            if col not in complaints_df.columns:
                complaints_df[col] = ""

        # Convert category column to string to avoid type issues
        complaints_df['category'] = complaints_df['category'].astype(str)

        if complaints_df.empty:
            st.info("No complaints submitted yet.")
        else:
            for i, row in complaints_df.iterrows():
                with st.expander(f"📌 Complaint {i+1}: {str(row['category'])}"):
                    st.write(f"**Student:** {row['student_name']}")
                    st.write(f"**School:** {row['school_name']}")
                    st.write(f"**Address:** {row['address']}")
                    st.write(f"**Phone:** {row['phone_number']}")
                    st.write(f"**Father's Name:** {row['father_name']}")
                    st.write(f"**Mother's Name:** {row['mother_name']}")
                    st.write(f"**Details:** {row['details']}")
                    st.write(f"**Status:** {row['status']}")

                    new_status = st.selectbox(
                        f"Update Status for Complaint {i+1}",
                        ["Pending", "Checked", "Solved"],
                        index=["Pending", "Checked", "Solved"].index(row['status']) if row['status'] in ["Pending", "Checked", "Solved"] else 0,
                        key=f"status_{i}"
                    )

                    if new_status != row['status']:
                        complaints_df.at[i, 'status'] = new_status
                        complaints_df.to_csv("complaints.csv", index=False)
                        st.success(f"✅ Status updated to {new_status}")


