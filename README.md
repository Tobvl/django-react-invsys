# Backend setup
pip install -r requirements.txt

django-admin startproject backend

cd backend
python manage.py startapp api

add models
python manage.py makemigrations
python manage.py migrate


# Frontend setup

yarn create vite [frontend > React > Javascript]

yarn add axios react-router-dom jwt-decode

create main project directories (src/ > components/, pages/, styles/, api.js, constants.js)