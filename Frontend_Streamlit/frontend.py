import streamlit as st
import requests
import plotly.graph_objects as go
import json

# API URL for air quality data
latest_api = "http://localhost:3030/api/aqi/latest"

# Load recommendations and health advice from a JSON file
def load_recommendations():
    with open('recommendations.json', 'r') as f:
        return json.load(f)

recommendations = load_recommendations()

# Function to get air quality data from an API or fallback to placeholder data
def get_air_quality_data():
    try:
        response = requests.get(latest_api)
        if response.status_code == 200:
            api_data = response.json().get("data", {})
            
            # Handle negative values and ensure proper data handling
            def sanitize_value(value, default=0):
                return value if value >= 0 else default
            
            data = {
                "PM25": sanitize_value(api_data.get("PM2.5", 999)),
                "PM10": sanitize_value(api_data.get("PM10", 999)),
                "NO2": sanitize_value(api_data.get("NO2", 999)),
                "SO2": sanitize_value(api_data.get("SO2", 999)),
                "CO": sanitize_value(api_data.get("CO", 999)),
                "Ozone": sanitize_value(api_data.get("Ozone", 999)),
                "Temperature": api_data.get("Temperature", 999),
                "Pressure": api_data.get("Pressure", 999),
                "Humidity": api_data.get("Humidity", 999),
                "WindSpeed": api_data.get("WS", 999),
                "WindDirection": api_data.get("WD", 999),
                "SolarRadiation": api_data.get("SR", 999),
                "AQI": api_data.get("AQI", 999),
            }
            return data
        else:
            st.error(f"Error fetching data from API: {response.status_code}")
            raise Exception("API call failed")
    except Exception as e:
        st.error(f"Failed to fetch data: {str(e)}")
        # Fallback placeholder data
        data = {
            "PM25": 999,
            "PM10": 999,
            "NO2": 999,
            "SO2": 999,
            "CO": 999,
            "Ozone": 999,
            "Temperature": 999,
            "Pressure": 999,
            "Humidity": 999,
            "WindSpeed": 999,
            "WindDirection": 999,
            "SolarRadiation": 999,
            "AQI": 999,
        }
        return data


def get_location():
    try:
        # Assume a function or an API call is made here
        # Simulate failure
        raise Exception("API call failed")
    except:
        return "Coimbatore, India"

# Function to display AQI meter with color coding
def display_aqi_gauge(aqi):
    for key, value in recommendations['recommendations'].items():
        range_start, range_end = map(int, key.split('-'))
        if range_start <= aqi <= range_end:
            aqi_level = value['level']
            color = value['color']
            break

    fig = go.Figure(go.Indicator(
        mode="gauge+number",
        value=aqi,
        title={'text': f"AQI: {aqi_level}"},
        gauge={
            'axis': {'range': [0, 500]},
            'bar': {'color': color},
            'steps': [
                {'range': [0, 50], 'color': 'green'},
                {'range': [51, 100], 'color': 'yellow'},
                {'range': [101, 200], 'color': 'orange'},
                {'range': [201, 300], 'color': 'red'},
                {'range': [301, 400], 'color': 'purple'},
                {'range': [401, 500], 'color': 'maroon'},
            ],
        }
    ))
    st.plotly_chart(fig, use_container_width=True)

# Function to get appropriate icon for each pollutant
def get_icon_for_pollutant(pollutant):
    icons = {
        "PM25": "icons/dust_1.png",
        "PM10": "icons/dust_11.png",
        "NO2": "icons/dioxide_1.png",
        "SO2": "icons/sulfur_1.png",
        "CO": "icons/cobalt_1.png",
        "Ozone": "icons/ozone_1.png",
        "Temperature": "icons/temperature_1.png",
        "Pressure": "icons/storm_1.png",
        "Humidity": "icons/humidity_1.png",
        "WindSpeed": "icons/wind_vane_1.png",
        "WindDirection": "icons/wind_vane_1.png",
        "SolarRadiation": "icons/sun_1.png",
    }
    return icons.get(pollutant, "icons/default.png")

# Function to get units for various metrics
def get_unit_for_metric(metric):
    units = {
        "Temperature": "°C",
        "Pressure": "Pa",
        "Humidity": "%",
        "WindSpeed": "m/s",
        "WindDirection": "°",
        "SolarRadiation": "W/m²",
    }
    return units.get(metric, "µg/m³")

# Main dashboard layout
def main():
    st.set_page_config(page_title="Air Quality Dashboard", layout="wide")

    # Inject custom CSS to adjust the padding and layout
    st.markdown("""
        <style>
            .stAppViewBlockContainer {
                padding-top: 2.2rem !important;
            }
            .recommendations-health-container {
                font-size: 12px; /* Reduce font size for recommendations */
            }
            .location-container {
                display: flex;
                align-items: center;
            }
            .location-container img {
                margin-right: 10px;
            }
            .pollutant-container {
                font-size: 14px; /* Increase font size for air quality measurements */
            }
        </style>
    """, unsafe_allow_html=True)

    # Get data from APIs
    data = get_air_quality_data()
    location = get_location()

    # Sidebar with navigation
    with st.sidebar:
        st.title("Navigation")
        st.markdown("🏠 Dashboard")
        st.markdown("🗺️ AQI Map")
        st.markdown("📊 Data Tables")
        st.markdown("🔮 Air Quality Forecasts")
        st.markdown("📅 Calendar History")

    # Main page: Header
    col1, col2 = st.columns([3, 1])
    with col1:
        st.markdown("<h1 class='air-quality-title'>Air Quality Dashboard</h1>", unsafe_allow_html=True)
    with col2:
        st.markdown(f"""
            <div class="location-container">
                <img src="icons/gps_1.png" width="20">
                <h2 style="font-size:16px;">{location}</h2>
            </div>
        """, unsafe_allow_html=True)

    # Pollutants display with increased font size
    pollutant_cols = st.columns([0.7, 0.7, 0.7, 0.7, 0.7, 0.7])
    pollutants = ["PM25", "PM10", "NO2", "SO2", "CO", "Ozone"]
    for idx, pollutant in enumerate(pollutants):
        with pollutant_cols[idx]:
            st.image(get_icon_for_pollutant(pollutant), width=20)
            st.markdown(f"""
                <div class="pollutant-container">
                    <p style='font-size:12px;'><b>{pollutant}</b></p>
                    <p style='font-size:12px;'>{data[pollutant]:.2f} µg/m³</p>
                </div>
            """, unsafe_allow_html=True)

    # Other metrics display with increased font size
    more_cols = st.columns([0.7, 0.7, 0.7, 0.7, 0.7, 0.7])
    others = ["Temperature", "Pressure", "Humidity", "WindSpeed", "WindDirection", "SolarRadiation"]
    for idx, other in enumerate(others):
        with more_cols[idx]:
            st.image(get_icon_for_pollutant(other), width=20)
            st.markdown(f"""
                <div class="pollutant-container">
                    <p style='font-size:12px;'><b>{other}</b></p>
                    <p style='font-size:12px;'>{data[other]:.2f} {get_unit_for_metric(other)}</p>
                </div>
            """, unsafe_allow_html=True)

    # AQI Gauge and Recommendations
    col1, col2 = st.columns([1, 2])
    with col1:
        st.write("### Air Quality Meter")
        display_aqi_gauge(data['AQI'])

    with col2:
        st.write("### Recommendations and Health Advice")
        range_key = next(key for key, value in recommendations['recommendations'].items()
                         if int(key.split('-')[0]) <= data['AQI'] <= int(key.split('-')[1]))
        recommendation = recommendations['recommendations'][range_key]

        st.markdown(f"<div class='recommendations-health-container'>", unsafe_allow_html=True)
        st.write(f"### 📝 {recommendation['advice']}")
        st.write(f"### 💡 {recommendation['health_advice']}")
        st.write(f"### 🚶 {recommendation['travel_suggestions']}")
        st.markdown("</div>", unsafe_allow_html=True)

if __name__ == "__main__":
    main()
