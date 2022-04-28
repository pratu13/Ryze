Steps to reproduce:


```bash
brew install pipenv 
pipenv --python 3.9
pipenv shell
pip install -r requirements.txt
python app.py
```
## Deployment
In the repo root:  
### Backend setup:  
1. `heroku git:remote -a ryze-lms-be`
2. `git remote rename heroku heroku-backend`
3. Setup done.  
### Backend deployment:  
1. `git subtree push --prefix backend/ heroku-backend master`

### Frontend setup:  
1. `heroku git:remote -a ryze-lms`
2. `git remote rename heroku heroku-frontend`
3. Setup done.    
### Frontend deployment:
1. `git subtree push --prefix frontend/app/ heroku-frontend master`

## Mongo Dump and Restore
- Dump command `mongodump  --archive='ryze_stub' --uri="mongodb+srv://ryze:ryze@cluster0.nfe6y.mongodb.net/ryze_stub_restore_1?retryWrites=true&w=majority"`
- Restore command `mongorestore  --archive=./assets/ryze_stub --uri="mongodb+srv://ryze:ryze@cluster0.nfe6y.mongodb.net/ryze_stub_restore_1?retryWrites=true&w=majority" --nsFrom="ryze_stub.*" --nsTo="ryze_stub_restore_1.*"`