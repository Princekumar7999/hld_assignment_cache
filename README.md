Key-Value Store with LRU Cache
Overview
This project provides a simple key-value store with an LRU (Least Recently Used) cache built using Node.js and Express. The cache holds key-value pairs in memory for fast access, making it ideal for high-performance applications. Additionally, a Locust load testing script is included to benchmark the system under heavy loads.

Features
LRU Caching: Efficient storage of up to 5 million keys with a 1.5GB maximum cache size.

REST API: Supports PUT and GET operations.

Dockerized: Easy deployment via Docker.

Performance Testing: Includes a Locust script to stress-test the API.

Getting Started
Prerequisites
Make sure you have the following installed:

Node.js (version 18 or later)

Docker

Locust (for load testing - optional)

Running Locally
1. Clone the Repository

git clone https://github.com/your-repo/key-value-store.git
cd key-value-store
2. Install Dependencies

npm install
3. Start the Server

node index.js
4. API Endpoints
PUT /put: Inserts or updates a key-value pair.

json
Copy
{
  "key": "some-key",
  "value": "some-value"
}
GET /get?key=some-key: Retrieves the value for the specified key.

Running with Docker
1. Build the Docker Image

docker build -t key-value-store .
2. Run the Container

docker run -p 7171:7171 key-value-store
3. Test the API
Insert a key-value pair:


curl -X POST http://localhost:7171/put -H "Content-Type: application/json" -d '{"key":"foo","value":"bar"}'
Retrieve a value by key:


curl http://localhost:7171/get?key=foo
Load Testing with Locust
1. Install Locust

pip install locust
2. Run the Test

locust -f locustfile.py --host=http://localhost:7171
Then navigate to http://localhost:8089 to configure and start the test.

Design Choices & Optimizations
LRU Cache Implementation:

Used the lru-cache library to manage memory efficiently.

Configured the cache for 5 million keys and a maximum size of 1.5GB.

Alpine-based Docker Image:

The base image node:18-alpine was selected for its lightweight nature.

Only production dependencies are installed to reduce the final image size.

Performance Optimizations:

Key-value pools were pre-generated in Locust to reduce excessive randomization.

The FastHttpUser class in Locust was utilized to maximize request throughput.

Future Improvements
Persistence: Implement database-backed persistence (e.g., Redis).

Rate Limiting: Introduce rate-limiting to protect the API from abuse.

Error Handling and Logging: Improve error handling and implement detailed logging.

License
This project is licensed under the MIT License.

