from flask import Flask, request
from models import models
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['POST'])
def index():
    json = request.json
    print(json)
    data = models.get_stock_data(json["stock"], json["timeframe"])
    return {
        "response": data,
    }

@app.route('/', methods=['POST']) 
def Predict():
    return {
        "user": "user"
    }

if __name__ == '__main__':
    app.run(debug=True)