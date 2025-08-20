# Setup MONGODB
- Ensure you have a MONGODB account setup on https://www.mongodb.com/. Use this video https://www.youtube.com/watch?v=PWG7NlUDVaA&t=1537s from 39:00 onwards to learn how to setup the MONGODB account.

- Replace the MONGODB_URI in the .env file with the one from your cluster. It should be in this format:
'mongodb+srv://{username}:{pswd}@{clustername}.{randomstuff}.mongodb.net/?retryWrites=true&w=majority&appName={clustername}'
Insert the table name you want here:
'mongodb+srv://username:pswd@clustername.randomstuff.mongodb.net/**{INSERT_HERE}**?retryWrites=true&w=majority&appName=clustername'

- After setting the MONGODB_URI, run the below code in your terminal to apply the env vars.:
```
source .env
```

# Local Deployment
Follow the Steps listed in the /frontend and /backend directory to start both

# Docker deployment
- Ensure you have Docker installed, else install docker desktop through this https://www.docker.com/.

- run the below code to deploy the frontend and backend:
```
docker compose up --build
``` 

- Use ***localhost:8000*** (nginx deployment) to test your deployment. Using the frontend url directly might not work.