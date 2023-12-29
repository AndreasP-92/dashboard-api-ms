from locust import HttpUser, task, between

class MyUser(HttpUser):
    wait_time = between(0, 1)
    generatedToken = ""

    def on_start(self):
        self.login()

    def login(self):
        response = self.client.post("/api/post/login", json={"email": "a@a.dk", "password": "123", "key": "AAJ-AWESOME-KEY"})
        if response.status_code != 202:
            raise Exception(f"Login failed with status code {response.status_code}")
        else:
            # print(response.json())
            self.generatedToken = response.json()["generatedToken"]
            # print(self.generatedToken)

    @task
    def verify_login(self):
        headers = {"x-access-token": self.generatedToken}
        response = self.client.post("/api/get/login/verify", headers=headers)
        if response.status_code != 200:
            raise Exception(f"Verify login failed with status code {response.status_code}")

    @task
    def get_one_user(self):
        response = self.client.get("/api/get/user/1")
        if response.status_code != 200:
            self.handle_error(f"Get one user failed with status code {response.status_code}")

    @task
    def get_all_users(self):
        response = self.client.get("/api/get/all/users")
        if response.status_code != 200:
            self.handle_error(f"Get all users failed with status code {response.status_code}")

    # Handle the error
    def handle_error(self, message):
        print(message)
