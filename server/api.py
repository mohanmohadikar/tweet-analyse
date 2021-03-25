from flask import Flask, jsonify, request, json
import json
import tweepy
import pandas as pd
import code
from bson.json_util import dumps
from keras_model import load_model
import os
from dotenv import load_dotenv
app = Flask(__name__) 
dotenv_path = '/.env'
load_dotenv(dotenv_path)


app = Flask(__name__)
#app.config["SQLALCHEMY_DB_URI"] = "sqlite:///example.db"

#db = SQLAlchemy(app)

arr = []

class Todo():
    id = "1"
    content = "ccc"

    def __str__(self):
        return f'{self.id} {self.content}'
    

def todo_serialize():
    return [
        {
            'id':'1',
            'content':'mohan'
        },
        {
            'id':'2',
            'content':'mona'
        },
        {
            'id':'3',
            'content':'mohit'
        },
    ]

@app.route('/', methods=['GET'])
def apimain():
    
    return "<h1>run-react-app</h1>"

@app.route('/api', methods=['GET'])
def index():
    if(len(arr)==0):
        create()
    resp = jsonify(arr)
    print("hihhhh")
    resp.headers.add("Access-Control-Allow-Origin", "*")
    resp.status_code = 200
    return resp

@app.route('/api/create', methods=['OPTIONS', 'POST'])
def create():
    print("u"*1000)
    print(request.data)
    print("u"*1000)
    if(request.data==b''):
        search_term = "#twitter"
    else:
        request_data = json.loads(request.data)
        search_term = request_data['content']

    print(search_term)
    
    print(search_term)


    consumer_key = os.environ.get('CONSUMER_KEY')
    consumer_secret = os.environ.get('CONSUMER_SECRET')
    access_token = os.environ.get('ACCESS_TOKEN')
    access_token_secret = os.environ.get('ACCESS_TOKEN_SECRET')

    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)


    api = tweepy.API(auth)

    tweets = api.search(search_term, count=500)

    data = pd.DataFrame(
        data=[tweet.text for tweet in tweets], columns=['Tweets'])

    head = data.head(10)

    listy = []
    print("here 1"*100)

    tweetList = [tweets for tweets in data['Tweets']]

    print("p"*1000)
    print(tweetList)
    print("p"*1000)


    print("here 5"*100)
    scoreList = []
    labelList = []
    model = load_model("model.h5")
    
    for i in range(len(tweetList)):
        scoreList.append(str(round(model(tweetList[i]).polarity, 1)))
    print("here 6"*100)
    for i in range(len(tweetList)):
        pLabel = 0
        print('0')
        scr = float(scoreList[i])
        print(scr)
        if(scr< -1*0.3):
            pLabel = "Negative"
        if(scr>= -1*0.3 and scr <= 0.3):
            pLabel = "Neutral"
        if(scr> 0.3):
            pLabel = "Positive"
        labelList.append(pLabel)

    
    global arr

    tempArr=[]
    print("here 2"*100)

    for i in range(len(tweetList)):
        print('heeee')
        print(tweetList[i])
        print(scoreList[i])
        print(labelList[i])
        tempArr.append({"id": i,"key_word": search_term, "tweet": tweetList[i], "score": scoreList[i], "label": labelList[i]})
        print(tweetList[i])

    arr = tempArr

    print("here 3"*100)


    

    resp = jsonify(json.dumps(arr))
    resp.headers.add("Access-Control-Allow-Origin", "*")
    resp.status_code = 200

    return resp

if __name__ == "__main__":
    app.run(debug=True)