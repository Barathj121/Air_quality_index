import streamlit as st
import folium
from streamlit_folium import st_folium

def aqi_map_page():
    # Set up Streamlit app layout
    # st.set_page_config(layout="wide")
    st.title("Air Quality Aware Route Planner")
    st.write("This dashboard helps you plan your routes based on air quality.")

    # Create a two-column layout for the dashboard
    col1, col2 = st.columns([2, 3])

    # Sidebar information panel (Left Side)
    with col1:
        st.header("Route Information")
        
        # Dummy values for distance, time, and AQI data
        total_distance = "1175 km"
        total_stops = 12
        time_driven = "33 hours 19 minutes"
        current_aqi = 60  # Current air quality index value (Moderate)
        better_route_aqi = 30  # Air quality if the better route is taken (Good)
        
        # Custom CSS for styling
        st.markdown("""
        <style>
        .metric-container {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
        }
        .metric-box {
            padding: 10px;
            border-radius: 5px;
            text-align: center;
            border: 1px solid #ccc;
        }
        .metric-box h3 {
            font-size: 1.2em;
            margin: 0;
        }
        .metric-box p {
            font-size: 0.9em;
            margin: 5px 0 0;
        }
        .icon {
            font-size: 1.5em;
            margin-bottom: 5px;
        }
        </style>
        """, unsafe_allow_html=True)
        
        # Display information in a grid layout
        st.subheader("Trip Details")
        st.markdown("""
        <div class="metric-container">
            <div class="metric-box">
                <div class="icon">🛣️</div>
                <h3>Overall Distance</h3>
                <p>{}</p>
            </div>
            <div class="metric-box">
                <div class="icon">🛑</div>
                <h3>Total Stops</h3>
                <p>{}</p>
            </div>
            <div class="metric-box">
                <div class="icon">⏱️</div>
                <h3>Time Driven</h3>
                <p>{}</p>
            </div>
        </div>
        """.format(total_distance, total_stops, time_driven), unsafe_allow_html=True)
        
        st.subheader("Air Quality Comparison")
        st.markdown("""
        <div class="metric-container">
            <div class="metric-box">
                <div class="icon">🌫️</div>
                <h3>Current Route AQI</h3>
                <p>{} (Moderate)</p>
            </div>
            <div class="metric-box">
                <div class="icon">🌿</div>
                <h3>Better Route AQI</h3>
                <p>{} (Good)</p>
            </div>
        </div>
        """.format(current_aqi, better_route_aqi), unsafe_allow_html=True)
        
        st.write("Choose the route based on air quality conditions to ensure a healthier journey.")
        
        # Route selector
        selected_route = st.radio("Select Route:", ["Current Route (Moderate AQI)", "Better Route (Good AQI)"])

    # Map and Activity Logs section (Right Side)
    with col2:
        # Create Folium map
        center_coords = [37.7749, -122.4194]  # Example: San Francisco
        m = folium.Map(location=center_coords, zoom_start=12)
        
        # Define two routes: one with moderate air quality (current), one with good air quality (better)
        current_route_coords = [[37.7749, -122.4194], [37.7849, -122.4094], [37.7949, -122.3994]]  # Example coordinates
        better_route_coords = [[37.7749, -122.4194], [37.7649, -122.4294], [37.7549, -122.4394]]  # Example coordinates
        
        # Add the routes to the map
        folium.PolyLine(locations=current_route_coords, color="red", weight=5, opacity=0.8, tooltip="Current Route (Moderate AQI)").add_to(m)
        folium.PolyLine(locations=better_route_coords, color="green", weight=5, opacity=0.8, tooltip="Better Route (Good AQI)").add_to(m)
        
        # Display the map in Streamlit
        st_folium(m, width=700, height=500)
        
        # Add activity logs under the map
        st.subheader("Activity Log")
        st.write("""
        - 11:00 AM: Started trip from San Francisco.
        - 12:30 PM: Passed through moderate AQI area (AQI 60).
        - 1:45 PM: Reached charging station, stopped for 30 minutes.
        - 3:00 PM: Entered area with poor AQI (AQI 80), considering route change.
        - 4:15 PM: Switched to better route, AQI improved to 30.
        """)
