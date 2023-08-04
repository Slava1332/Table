import psycopg2
import json
from flask import Flask
from flask_restful import Api, Resource
from fake_useragent import UserAgent
import requests

ua = UserAgent()

app = Flask(__name__)
api = Api()

class Main(Resource):
    
    def get(self, page, first, second, game, first_minPrice, second_minPrice, countSteam,sort):
        connection = psycopg2.connect(
        host="localhost",
        user='postgres',
        password='root',
        port=5432,
        database='item_base'
        )
        for i in range(1):
            with connection.cursor() as cursor:
                cursor.execute(f"SELECT hash_name,amount_items_on_steam, {first}, {second}, {first}/{second} * 100 FROM {game} where {first} > {first_minPrice} and {second} > {second_minPrice} and amount_items_on_steam > {countSteam} order by {first} / {second} * 100 {sort} limit 100 offset {i*100}")
                with open(f'./json/response{i+1}.json', 'w') as file:
                    json.dump(cursor.fetchmany(200), file, indent=4, ensure_ascii=True)
        jso = f'./json/response{page}.json'
        with open(f'{jso}') as file:
            response = json.load(file)
            return response


class SearchName(Main):
    
    def get(self, page, first, second, game, first_minPrice, second_minPrice, countSteam,sort, name):
        super().get(page,first, second, game, first_minPrice, second_minPrice, countSteam,sort)
        connection = psycopg2.connect(
        host="localhost",
        user='postgres',
        password='root',
        port=5432,
        database='item_base'
        )
        for i in range(10):
            with connection.cursor() as cursor:
                cursor.execute(f"SELECT distinct on(hash_name) hash_name,amount_items_on_steam, {first}, {second}, {first}/{second} * 87 FROM {game} where {first} > {first_minPrice} and {second} > {second_minPrice} and amount_items_on_steam > {countSteam} and hash_name LIKE'%{name}%' order by {first} / {second} * 86 {sort} limit 100 offset {i*100}")
                with open(f'response{i+1}.json', 'w') as file:
                    json.dump(cursor.fetchmany(200), file, indent=4, ensure_ascii=True)
        jso = f'response{page}.json'
        with open(f'{jso}') as file:
            response = json.load(file)
            return response

class GetSales(Resource):
    def get(self, skin):
        ua = UserAgent()
        headers = {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
            "user-agent": f"{ua.random}",
            "bx-ajax": "true"
        }
        res = requests.get(url=f'https://steamcommunity.com/market/listings/730/{skin}',
                            headers=headers
                            )
        return res.text[res.text.find('var line1=')+10:].partition(';')[0]
        

api.add_resource(Main, "/api/<string:first>/<string:second>/<string:game>/<int:page>/min_price1=<int:first_minPrice>/min_price2=<int:second_minPrice>/count=<int:countSteam>/sort=<string:sort>")
api.add_resource(SearchName, "/api/<string:first>/<string:second>/<string:game>/<int:page>/min_price1=<int:first_minPrice>/min_price2=<int:second_minPrice>/count=<int:countSteam>/sort=<string:sort>/name=<string:name>")
api.add_resource(GetSales, "/api/sales/<string:skin>")
api.init_app(app)
if __name__ == '__main__':
    app.run(debug=True, port=5000, host="localhost")
    

