import time
import requests
from fake_useragent import UserAgent
import json
import psycopg2

ua = UserAgent()
headers = {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "user-agent": f"{ua.random}",
    "bx-ajax": "true"
}


def get_course(header):
    course = requests.get(url='https://www.currency.me.uk/charts-fetch.php?c1=CNY&c2=USD&t=1', headers=header)
    with open('cny_to_usd.json', 'w') as file:
        json.dump(course.json(), file, indent=4, ensure_ascii=True)
    inform = course.json()
    cny_to_usd = float(inform[0].get('y'))
    # print(cny_to_usd)
    return cny_to_usd



count = requests.get(
    url='https://steamcommunity.com/market/search/render/?query=&start=1&count=100&search_descriptions=0&sort_column=popular&sort_dir=desc&appid=570&norender=1',
    headers=headers,
)

with open('hash_name.json', 'w') as file:
    json.dump(count.json(), file, indent=4, ensure_ascii=True)
count_items = count.json().get("total_count")
print(count_items)

_start = 1
def get_data(params, header, _start):
    start = _start
    try:
        conn = psycopg2.connect(
            host="localhost",
            database='item_base',
            user='postgres',
            password='root',
            port='5432'
        )
        print("[INFO] Connection to DataBase is successfully")
        """autocommit для того, чтобы данные вносились в бд"""
        conn.autocommit = True
        current_course = 0.138472

        for i in range(start, count_items, 100):
            response = requests.get(
                url=f"https://steamcommunity.com/market/search/render/?query=&start={i}{params}&norender=1",
                headers=header)
            data = response.json()
            start += 100
            
            for j in range(100):

                sell_listings = data.get("results")[j].get('sell_listings')
                hash_name = data.get("results")[j].get('name')
                buy_price = float(data.get("results")[j].get('sale_price_text')[1:])
                buy_price = round(buy_price / current_course, 2)
                print(hash_name)
                print(buy_price)
                print(sell_listings)
                start += 100
                if "'" in hash_name:
                    hash_name = hash_name.replace("'", "''")
                with conn.cursor() as cursor:
                    cursor.execute(
                        f"UPDATE item_base SET buy_price = {buy_price}, amount_items_on_steam = {sell_listings} where hash_name = '{hash_name}'"
                    )
            time.sleep(30)

    except Exception as ex:
        print(ex)
        time.sleep(40)
        get_data('&count=100&search_descriptions=0&sort_column=popular&sort_dir=desc&appid=730&norender=1', headers,
                 start)
    finally:
        start = 1
        get_data('&count=100&search_descriptions=0&sort_column=popular&sort_dir=desc&appid=730&norender=1', headers,
                 start)


def main():
    get_data('&count=100&search_descriptions=0&sort_column=popular&sort_dir=desc&appid=730&norender=1', headers, 1)


if __name__ == '__main__':
    main()
