from locust import HttpUser, FastHttpUser, task, between, constant
import random
import string

# Function to generate random strings for key-value testing
def random_string(length=10):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

class KeyValueTest(FastHttpUser):
    wait_time = constant(0)  # Simulates real users with delay
    keys_posted = []

    @task(2)  # 50% GET requests
    def get_value(self):
        key = random.choice(self.keys_posted) if self.keys_posted else random_string() 
        with self.client.get(f"/get?key={key}", name="/get", catch_response=True) as response:
            if response.status_code == 404:
                response.failure("Cache miss (Key not found)")
            elif response.status_code == 200:
                response.success()
            else:
                response.failure(f"Unexpected error: {response.text}")

    @task(2)  # 50% PUT requests
    def put_value(self):
        key = random_string()
        value = random_string(20)
        response = self.client.post("/put", json={"key": key, "value": value})
        if response.status_code == 200:
            self.keys_posted.append(key)
            response.success()
        else:
            response.failure(f"Failed to insert key: {response.text}")