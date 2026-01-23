# 📡 LinkBand-X  
**Mesh-Enabled Distress and Positioning System for Squad-Level Tactical Communication**

🏆 **AFP Ideathon 2025 – 1st Runner-Up**

LinkBand-X is an embedded, wearable communication system designed to enhance **squad-level situational awareness, positioning, and casualty response** in **GPS-denied and infrastructure-limited environments**.  
It leverages **LoRa mesh networking**, **RSSI–ToF data fusion**, and **encrypted distress signaling** to provide resilient, low-power tactical communication for military and training operations.

---

## 🧭 Project Overview
Modern tactical units often operate in environments where **GPS, cellular networks, and centralized communication systems are unreliable or unavailable**. Electronic warfare, terrain obstruction, and infrastructure disruption significantly increase mission risk and delay casualty response.

**LinkBand-X** addresses this gap through a **decentralized, self-healing mesh network** of wearable devices that:
- Provide **real-time relative positioning**
- Enable **automatic and manual distress signaling**
- Operate independently of satellites or cellular infrastructure
- Maintain communication resilience under node failure or signal loss

---

## ❗ Problem Statement
Squad-level units face persistent challenges:
- Delayed casualty detection and response  
- Reduced coordination in obstructed or hostile environments  
- Overdependence on voice radio communication  
- Vulnerability of GPS and centralized networks to jamming or spoofing  
- Increased cognitive load from manual status updates  

These limitations degrade decision-making speed and increase operational risk—especially in high-intensity missions where seconds are critical.

---

## ✅ Proposed Solution
LinkBand-X introduces a **peer-to-peer wearable communication platform** that enables:
- Direct device-to-device messaging  
- Continuous real-time position sharing  
- Automated casualty detection using inertial sensing  
- Secure distress alert forwarding to a base station  

The system removes reliance on fixed infrastructure while maintaining **secure, low-latency tactical awareness**.

---

## 💡 Key Capabilities & Value
- 🚑 **Immediate distress and casualty alerts**
- 📍 **GPS-independent positioning** using RSSI and Time-of-Flight data fusion
- 👥 **Enhanced squad coordination** via real-time visualization
- 🔐 **Encrypted communication** with anti-jamming techniques
- 🧠 **Reduced cognitive load** for dismounted soldiers
- 🎓 **Dual-use** for training and live operations

Field trials demonstrated:
- **<10 m localization accuracy**
- **>90% message delivery reliability at 350 m**
- Reliable operation in infrastructure-denied environments

---

## 🧩 System Architecture

### Hardware Platform
- **MCU:** ESP32 (LoRa 32 Development Kit)
- **Long-Range Communication:**  
  - LoRa (SX1276 / SX1262) using Chirp Spread Spectrum (CSS)
- **Short-Range Communication:**  
  - ESP-NOW (low-latency, infrastructure-free)
- **Positioning:**  
  - RSSI & Time-of-Flight (ToF) data fusion  
  - Optional GNSS (UC6580) fallback
- **Sensors:**  
  - Pulse / physiological sensor  
  - Expandable IMU for fall detection
- **Form Factor:**  
  - Wearable beacon (dog tag / wrist-mounted)
- **Power:**  
  - Ultra-low power operation for extended missions

---

## 🧠 Software & Data Flow
- **Networking:**  
  - Fully decentralized LoRa mesh  
  - Each node acts as transmitter and relay
- **Distress Handling:**  
  - Manual SOS button  
  - Automated alerts from sensor data
- **Security:**  
  - AES-encrypted payloads  
  - Frequency-Hopping Spread Spectrum (FHSS)
- **Base Station:**  
  - LoRa USB receiver  
  - Python (Flask / Streamlit) dashboard  
  - SQLite database for mission logging

---

## 📊 Base Station Dashboard
- Visualizes:
  - Soldier positions
  - Distress alerts
  - Signal strength and timestamps
- Logs mission data locally for:
  - After-action review
  - Training analysis
- Operates fully offline

---

## 🪖 Military Relevance
LinkBand-X directly supports **AFP modernization goals** by strengthening:
- Tactical communication resilience  
- Squad-level command and control  
- Casualty survivability in contested environments  

Its **LoRa-based mesh architecture** ensures:
- Operation in urban, mountainous, forested, and underground terrain
- Resistance to GPS jamming and spoofing
- Continuous operation during communication blackouts

The system is **modular and scalable**, enabling deployment across:
- Wearable soldier systems
- Unmanned platforms
- Fixed tactical sensors  

This positions LinkBand-X as a **defense IoT enabler** and a force multiplier for small-unit operations.

---

## 📌 Status
🧪 Prototype & field validation completed  
🚀 Ongoing improvements for scalability and robustness  

---

## 📚 References
Key references include works on LoRa-based positioning, mesh networking for tactical communication, and wearable casualty detection systems.  
(Full academic references available in project documentation.)

---

⭐ This project demonstrates the application of embedded systems, wireless communication, and systems engineering to real-world defense and safety challenges.
