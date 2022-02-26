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
Backend setup:  
1. `heroku git:remote -a ryze-lms-be`
2. `git remote rename heroku heroku-backend`
3. Setup done.
Backend deployment:  
1. `git subtree push --prefix backend/ heroku-backend master`

Frontend setup:  
1. `heroku git:remote -a ryze-lms`
2. `git remote rename heroku heroku-frontend`
3. Setup done.
Frontend deployment:
1. `git subtree push --prefix frontend/app/ heroku-frontend master`