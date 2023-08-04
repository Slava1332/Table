import time

import requests
from fake_useragent import UserAgent
import json
import psycopg2

ua = UserAgent()


def get_data():
    headers = {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "user-agent": f"{ua.random}",
        "bx-ajax": "true"
    }
    
    conn = psycopg2.connect(
        host="localhost",
        database='item_base',
        user='postgres',
        password='root',
        port='5432'
    )
    conn.autocommit = True
    
    c = 0
    for k in range(20):
        response = requests.get(
        url=f'https://www.c5game.com/napi/trade/search/v2/items/730/search?limit=10000&appId=730&page={k}&sort=0',
        headers=headers,
    )
        data = response.json().get('data').get('list')

        for i in range(500):
            c +=1
            print(c)
            time.sleep(0.01)
            c5price = data[i].get('cnyPrice')
            hash_name = data[i].get('marketHashName')
            if "'" in hash_name:
                hash_name = hash_name.replace("'", "''")
            with conn.cursor() as cursor:
                cursor.execute(
                    f"UPDATE item_base SET price_on_c5game = {c5price} where hash_name = '{hash_name}'"
                )
            print((data[i].get('marketHashName')))
    time.sleep(20)
    get_data()



def main():
    get_data()


if __name__ == '__main__':
    main()