# API Gateway

## Overview
This API Gateway acts as the central hub for managing requests between 2 systems. Its provide routing, authentication, and communication between systems.

---

## Prerequisites

Before running the API Gateway, ensure that the following dependencies are set up and running:
- **Kafka Container**: The Kafka container must be up and running.
- **Team B Redis Container**: Ensure the Redis container from Team B is up.

---
## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SoftwareArchitecture-SquadTiger/API-Gateway.git
2. Navigate to the API-Gateway directory
   ```bash
   cd API-Gateway
3. Install all neccessary libraries
   ```bash
   npm install
4. Make sure the .env file is on the same level as the package.json and has the neccessary credentials
   ```bash
    #HOSTS
    HOST=<Current device IPv4 address>
    BROKER_HOST=<Kafka container IPv4 address>
    TEAM_A_FRONTEND_HOST=<Team A frontend IPv4 address>
    TEAM_B_FRONTEND_HOST=<Team B frontend IPv4 address>

    #PORTS
    PORT=5001
    TEAM_A_FRONTEND_PORT=3000
    TEAM_B_FRONTEND_PORT=7000
    TEAM_A_PORT=4000
    TEAM_B_PORT=6000
    BROKER_PORT=9093

    #Redis Config
    REDIS_PORT=6379
    REDIS_HOST<Redis container IPv4 address>
    REDIS_PASSWORD=iamAdmin

    #Auth
    JWS_PUBLIC_KEY_PATH=src\secret\jws_public.pem
    INTERNAL_API_KEY=291zhI0AhUzU99YJ3CrkqatoPtb_8tY42VpD4y9CcuHNsizecGlQZylwoicQhiYSUHczM93Zk-mJl_yyI17RlQ
5. Use this script to run the gateway
   ```bash
   npm run main
6. Wait for the log message: "Consumer has joined the group". Once this message appears, the gateway is ready to receive requests.
![alt text](https://ik.imagekit.io/6q4p6rifh/image.png?updatedAt=1736596912704)

## License
This project is licensed under the [MIT License](LICENSE).