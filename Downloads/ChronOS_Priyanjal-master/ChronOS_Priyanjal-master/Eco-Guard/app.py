import streamlit as st

st.set_page_config(
    page_title="Eco-Guard AI",
    layout="wide",
    page_icon="🌍"
)

# Load CSS
with open("assets/style.css") as f:
    st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)

st.title("Eco-Guard AI")
st.markdown("### Smart Environmental Intelligence Platform")
st.markdown("---")
