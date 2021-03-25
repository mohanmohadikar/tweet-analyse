from flask import Flask, render_template, request, redirect, url_for, jsonify
import tweepy
import pandas as pd
import code
from bson.json_util import dumps
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import os
from dotenv import load_dotenv
app = Flask(__name__) 
dotenv_path = '/.env'
load_dotenv(dotenv_path)

d = {}


@app.route('/result', methods = ['POST'])
def result():
    print("u"*1000)
    print("working")
    print("u"*1000)
    login_json = request.get_json()

    if not login_json:
        return jsonify({'msg': 'Missing JSON'}), 400

    tname = login_json.get('name')
    global name
    name = tname
    print(name)
    tempfun()
    analyze()

    if not name:
        return jsonify({'msg': 'Username is missing'}), 400

    return jsonify({'name': name}), 200

def tempfun():
    print("ttttttt")
    print(name)

@app.route('/analyze', methods=['GET', 'POST', 'OPTIONS'])
def analyze():

    tname = "kadiii"
    if request.method == 'OPTIONS':
        print("v"*100)
        print("hhhehehe")
        tname = request.json
        print("o"*100)
        print(tname)
        print("o"*100)

    

    # code.interact(local=dict(globals(), **locals()))
    consumer_key = os.environ.get('CONSUMER_KEY')
    consumer_secret = os.environ.get('CONSUMER_SECRET')
    access_token = os.environ.get('ACCESS_TOKEN')
    access_token_secret = os.environ.get('ACCESS_TOKEN_SECRET')

    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)

    api = tweepy.API(auth)
    print('i'*1000)
    print(request)
    print(tname)
    print('i'*1000)


    #search_term = request.form['search']
    #search_term = "shardul"
    if(tname==None):
        tname = "shardul"
    search_term = tname
    tweets = api.search(search_term, count=500)

    data = pd.DataFrame(
        data=[tweet.text for tweet in tweets], columns=['Tweets'])

    head = data.head(10)


    sid = SentimentIntensityAnalyzer()

    listy = []

    tweetList = [tweets for tweets in data['Tweets']]

    print('+'*1000)
    print("imm")
    print(data.shape[0])
    print(head['Tweets'][0])
    print(tweetList[0])
    print('+'*1000)

    for index, row in data.iterrows():
        ss = sid.polarity_scores(row["Tweets"])
        listy.append(ss)

    se = pd.Series(listy)
    data['polarity'] = se.values

    # display(data.head(100))
    # print(se.values[0])

    print('-'*1000)
    print(se)
    print('-'*1000)

    negative = []
    for ne in se.values:
        if ne['neg'] > 0:
            negative.append(ne['neg'])

    print(len(negative))

    positive = []
    for ps in se.values:
        if ps['pos'] > 0:
            positive.append(ps['pos'])

    print(len(positive))
    neutral = []
    for nt in se.values:
        if nt['neu'] > 0:
            neutral.append(nt['neu'])

    print(len(neutral))

    neg_percent = round((len(negative)/500)*100, 2)

    pos_percent = round((len(positive)/500)*100, 2)
    neu_percent = round((len(neutral)/500)*100, 2)


    arr = []

    for i in range(len(tweetList)):
        arr.append({"id": i, "tweet": tweetList[i], "polarity": "0.2", "label": "netral"})


    resp = jsonify(arr)
    resp.headers.add("Access-Control-Allow-Origin", "*")
    resp.status_code = 200
    print("loaded")
    return resp

"""
@app.route('/analyze', methods=['GET'])
def audios():
    resp = dumps(d)
    return resp
"""
    
if __name__ == "__main__":
    app.run(debug=True)
