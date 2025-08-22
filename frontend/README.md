# Local Deployment
Go to /backend first and follow the steps listed there to deploy the backend server locally

Change **package.json** file contents:
Add 
```
  "private": true,
  "proxy": "http://localhost:3001", # ADD THIS
```

***NOTE: For docker deployment, undo the change, else it will not work.***

After the above change is done, run:
```
pnpm install
pnpm run dev
```