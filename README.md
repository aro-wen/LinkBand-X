# 📡 LinkBand-X

<div align="center">

![ESP32](https://img.shields.io/badge/ESP32-Embedded_Systems-E7352C?style=for-the-badge\&logo=espressif)
![LoRa](https://img.shields.io/badge/LoRa-Mesh_Networking-blue?style=for-the-badge)
![IoT](https://img.shields.io/badge/IoT-Tactical_Communication-orange?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-Dashboard-3776AB?style=for-the-badge\&logo=python)
![Status](https://img.shields.io/badge/Status-Prototype_Validated-success?style=for-the-badge)

### Mesh-Enabled Distress and Positioning System for Squad-Level Tactical Communication

🏆 **AFP Ideathon 2025 – 1st Runner-Up**

A wearable defense IoT platform that enables GPS-independent positioning, distress signaling, and resilient squad-level communication using LoRa mesh networking.

</div>

---

## 🎖️ Competition Recognition

**LinkBand-X** was developed and presented during the **AFP Ideathon 2025**, where it was awarded:

🥈 **1st Runner-Up**

The project was recognized for its innovative application of embedded systems, wireless communication, and tactical situational awareness technologies to address real-world military communication challenges.

---

## 📖 Overview

Modern tactical operations often occur in environments where traditional communication infrastructure is unavailable or compromised.

GPS signals may be degraded or jammed, cellular coverage may be nonexistent, and centralized communication systems may become unreliable during combat or disaster-response scenarios.

**LinkBand-X** provides a decentralized communication solution through a network of wearable devices capable of:

* Real-time squad awareness
* Relative positioning
* Distress alert propagation
* Casualty detection
* Infrastructure-independent communication

The system operates using a self-healing LoRa mesh network, ensuring communication continuity even when individual nodes become unavailable.

---

## 🚨 Problem Statement

Squad-level units frequently face:

* Delayed casualty identification
* Limited situational awareness
* Dependence on voice radio communication
* GPS spoofing and jamming risks
* Communication blackouts in obstructed environments
* Increased cognitive workload from manual reporting

These limitations can slow decision-making and reduce operational effectiveness during critical missions.

---

## 💡 Proposed Solution

LinkBand-X introduces a wearable peer-to-peer communication platform that provides:

### 📍 Position Awareness

* GPS-independent localization
* RSSI and Time-of-Flight data fusion
* Relative position estimation between squad members

### 🚑 Distress Detection

* Manual SOS activation
* Automated emergency detection
* Real-time alert propagation through the mesh network

### 📡 Communication Resilience

* Infrastructure-free operation
* Self-healing LoRa mesh routing
* Node-to-node message relaying

### 🔐 Secure Communication

* AES-encrypted payloads
* Frequency-Hopping Spread Spectrum (FHSS)
* Anti-jamming communication techniques

---

## 🏗️ System Architecture

```text
Wearable Node
│
├── ESP32 LoRa Development Kit
├── Pulse Sensor
├── Optional IMU
├── SOS Button
│
▼
LoRa Mesh Network
│
├── Node Relay
├── Distress Forwarding
├── Position Sharing
└── Status Updates
│
▼
Base Station
│
├── LoRa Receiver
├── Python Dashboard
├── SQLite Database
└── Mission Monitoring
```

---

## ⚙️ Hardware Components

| Component                   | Purpose                    |
| --------------------------- | -------------------------- |
| ESP32 LoRa Development Kit  | Main Processing Unit       |
| SX1276 / SX1262 LoRa Module | Long-range communication   |
| Pulse Sensor                | Physiological monitoring   |
| IMU (Optional)              | Fall and motion detection  |
| UC6580 GNSS Module          | Optional GPS fallback      |
| SOS Button                  | Manual distress activation |

---

## 🛠️ Technology Stack

### Embedded Systems

* ESP32
* Arduino Framework
* ESP-NOW
* LoRa

### Networking

* LoRa Mesh Networking
* RSSI Localization
* Time-of-Flight Estimation
* FHSS

### Software

* Python
* Flask
* Streamlit
* SQLite

### Security

* AES Encryption
* Secure Payload Transmission

---

## 📊 Dashboard Features

The command dashboard provides:

### 🗺️ Situational Awareness

* Soldier positioning
* Squad status monitoring
* Mission tracking

### 🚨 Distress Monitoring

* Emergency alerts
* Casualty notifications
* Response tracking

### 📈 Analytics

* Signal strength monitoring
* Communication logs
* Timestamped mission events

### 📝 Mission Logging

* Offline data storage
* After-action review support
* Training evaluation records

---

## 📈 Performance Results

Field testing demonstrated:

| Metric                    | Result           |
| ------------------------- | ---------------- |
| Localization Accuracy     | < 10 meters      |
| Message Delivery Rate     | > 90%            |
| Communication Range       | Up to 350 meters |
| Infrastructure Dependency | None             |

The platform remained operational in infrastructure-denied environments while maintaining reliable message forwarding between nodes.

---

## 🪖 Defense Applications

LinkBand-X supports:

* Squad-level command and control
* Search and rescue missions
* Disaster response operations
* Military field exercises
* Tactical communication resilience

The architecture is scalable and can be adapted for:

* Wearable soldier systems
* Unmanned ground vehicles
* Fixed tactical sensors
* Remote monitoring stations

---

## 🔬 Research Contributions

This project explores the intersection of:

* Embedded Systems
* Internet of Things (IoT)
* Wireless Mesh Networking
* Tactical Communication Systems
* Positioning and Localization
* Defense Technology

It demonstrates how low-cost commercial hardware can be leveraged to create resilient communication networks for safety-critical applications.

---

## 📌 Project Status

| Milestone                | Status         |
| ------------------------ | -------------- |
| System Design            | ✅ Complete     |
| Prototype Development    | ✅ Complete     |
| Field Validation         | ✅ Complete     |
| Competition Presentation | ✅ Complete     |
| Scalability Improvements | 🚧 In Progress |

---

## 👩‍💻 Team

Developed as part of **AFP Ideathon 2025**.

**Leila Arowen A. Dumindin**
BS Computer Engineering
Pamantasan ng Lungsod ng Maynila

---

## 📚 References

Research references include studies on:

* LoRa-based localization
* Tactical mesh networking
* Wearable emergency communication systems
* Casualty detection technologies
* Defense IoT architectures

Full academic references are available in the project documentation.

---

<div align="center">

### 📡 Reliable Communication When Infrastructure Fails

Built with LoRa, ESP32, and a mission to improve tactical situational awareness.

⭐ Star this repository if you found the project interesting.

</div>
