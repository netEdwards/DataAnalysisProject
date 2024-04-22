from playwright.async_api import async_playwright
import asyncio
import os
import json
import random


async def log_response(response):
    if response.url == 'https://chick-fil-a.compliancemetrix.com/rql/queue/':
        print('Response found saving...')
        json_data = await response.json()
        data_dir = os.path.join('.', 'Back-End', 'data')
        if not os.path.exists(data_dir):
            os.makedirs(data_dir)
        rand = random.randint(0, 100000)
        filename = f'response_data{rand}.json'
        file_path = os.path.join(data_dir, filename)
        with open(file_path, 'w') as f:
            json.dump(json_data, f)
            print(f'Response saved to {file_path}')
        

async def main(page):
    p = async_playwright()
    await asyncio.sleep(10)
    await page.wait_for_load_state('domcontentloaded')
    await page.wait_for_load_state('networkidle')
    await page.wait_for_selector("css=table > tbody > tr", timeout=30000)
    rows = await page.query_selector_all("css=table > tbody > tr")
    for i in range(len(rows)):
        print(f'Starting row {i+1}')
        print(f'{len(rows)} - Rows')
        link = await rows[i].query_selector('a')
        await link.click()
        await page.wait_for_load_state('domcontentloaded')
        await page.wait_for_load_state('networkidle')
        await page.reload()
        page.on('response', log_response)
        await page.wait_for_load_state('domcontentloaded')
        await page.wait_for_load_state('networkidle')
        page.remove_listener('response', log_response)
        await page.go_back()
        print('Response saved...')
        await page.reload()
        await page.wait_for_load_state('domcontentloaded')
        await page.wait_for_load_state('networkidle')
        rows = await page.query_selector_all("css=table > tbody > tr")
    
    