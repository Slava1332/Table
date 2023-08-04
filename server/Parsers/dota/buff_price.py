import requests
from fake_useragent import UserAgent
import json
import psycopg2

ua = UserAgent()


def get_data():
    c =0
    conn = psycopg2.connect(
            host="localhost",
            database='item_base',
            user='postgres',
            password='root',
            port='5432'
        )
    conn.autocommit = True
    for j in range(1,260):
        headers = {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
            "user-agent": f"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
            "bx-ajax": "true"
        }
        response = requests.get(
            url=f'https://buff.163.com/api/market/goods?game=dota2&page_num={j+1}&_=1689244707089&page_size=80',
            headers=headers, cookies={"display_appids": "[730\054 570\054 1]","client_id": "vihekXI0NmwYvz3U_tOYOQ","session": "1-RXHk2DKpm_HvMQeMWc4-Db4DEUHvqiQr3OQVrTc-sbEz2036606633","P_INFO": "7-9817960111|1688315216|1|netease_buff|00&99|null&null&null#RU&null#10#0|&0||7-9817960111","csrf_token": "ImY1ZGQ1ZWVmMjQ4NjNiNTdjMDFmYTE0OTY2ODRmNTM4OTI0OWIzMWYi.F4M49Q.G_7GxMrdUfQ3Qepk9nufaBG90Uc","S_INFO": "1688315216|0|0&60##|7-9817960111", "NTES_YD_SESS": "LfCRFzZ0wMwc7QOhpV5hIAdY8V6hoRITMD43uutfhocEy_VfRItk7psMzLA5C7G8x59Dsd9RfElXR80UBQVorInM0Tj1X6qhBDqf6Bjk45l.xTulgjpNGXaH14nY2whHjYZFYVNqTD9LsOdNUwfot9oMNWLwEyRGTipWsncXVEO.AP1TfLcMA55eoSptYRl_RnSC_II0.xiLEXi6Cz0XGIKloVBlgAQiHH7CbUYPF22YK","game": "csgo","remember_me":"U1101707761|vARiZK15HSxiUSV469YHk7bKKH4DMhkQ","Locale-Supported":"ru","Device-Id": "OvPVsvwWqQxl5517hRuD", "csrf_token": "IjNlYTA1YTBlNmQyNTgxMzg3NDNiZGQ1ZDRkMjM0YTY3MTRiNjY2ZjIi.F5R2zQ.TTAyzYDHPManwbfEeiHmbcPzQaA"}
        )
        
        for i in range(80):
            price = response.json().get('data').get('items')[i].get("sell_min_price")
            hash_name = response.json().get('data').get('items')[i].get("market_hash_name")
            if "'" in hash_name:
                    hash_name = hash_name.replace("'", "''")
            with conn.cursor() as cursor:
                cursor.execute(
                    f"UPDATE dota SET buff_price = {price} where hash_name = '{hash_name}'"
                )
        c = c+1
        print(price)
        print(hash_name)
        print(c)


def main():
    get_data()


if __name__ == '__main__':
    main()
