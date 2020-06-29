from flask import Flask, jsonify, request
import requests as req
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/',methods = ['GET','POST'])
def get_weather():
    city = request.get_json()
    new_city = city['city']
    resp = req.get('http://api.openweathermap.org/data/2.5/weather?q='+ new_city +'&units=metric&APPID=67fddc841569cd4432f8dcefdae751c3')
    return jsonify (resp.text)

@app.route('/local/<lat>/<lon>',methods = ['GET'])
def get_local_weather(lat, lon):
    lat = lat
    lon = lon
    resp = req.get('http://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon='+ lon +'&units=metric&appid=67fddc841569cd4432f8dcefdae751c3')
    return resp.text