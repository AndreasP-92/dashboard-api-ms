from locust import HttpUser, task, between

class MyUser(HttpUser):
    wait_time = between(0, 1)
    generatedToken = ""
    failed_requests = 0
    total_requests = 0
    logged_in = False

#     def on_request_failure(self, request_type, name, response_time, exception):
#         self.failed_requests += 1
#         self.total_requests += 1

#     def on_start(self):
#         self.login()

#     def stop_if_high_failure_rate(self):
#         failure_rate = self.failed_requests / self.total_requests if self.total_requests > 0 else 0
#         print(f"Failure rate: {failure_rate}")
#         if failure_rate > 0.6:  # Adjust the threshold as needed
#             self.environment.runner.quit()

#     def on_stop(self):
#         self.stop_if_high_failure_rate()

    # def login(self):
    #     response = self.client.post("/api/post/login", json={"email": "a@a.dk", "password": "123", "key": "AAJ-AWESOME-KEY"})
    #     if response.status_code != 202:
    #         raise Exception(f"Login failed with status code {response.status_code} and response {response.text}")
    #     else:
    #         self.generatedToken = response.json()["generatedToken"]
    #         self.logged_in = True

    
    # @task
    # def verify_login(self):
    #     if(self.logged_in == True):
    #         headers = {"x-access-token": self.generatedToken}
    #         response = self.client.post("/api/get/login/verify", headers=headers)
    #         if response.status_code != 200:
    #             self.handle_error(f"Verify login failed with status code {response.status_code}")

    #         self.stop_if_high_failure_rate()

    @task
    def get_one_user(self):
        response = self.client.get("/api/get/user/1")
        if response.status_code != 200:
            self.handle_error(f"Get one user failed with status code {response.status_code}")

        # self.stop_if_high_failure_rate()

    @task
    def get_all_users(self):
        response = self.client.get("/api/get/all/users")
        if response.status_code != 200:
            self.handle_error(f"Get all users failed with status code {response.status_code}")

        # self.stop_if_high_failure_rate()

    # Handle the error
    # def handle_error(self, message):
    #     print(message)