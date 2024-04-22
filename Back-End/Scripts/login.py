from playwright.async_api import async_playwright
import asyncio
import creds
import json
import os

async def login(page):
    await page.goto('https://chick-fil-a.compliancemetrix.com/rql/p/acfareportsallreportsvtopissuesactivator')
    print('Navigation Complete, Logging in...')
    await page.fill('#input28', creds.get_username())
    await page.click('.button-primary')
    await page.fill('#input53', creds.get_password())
    await page.click('.button-primary')   
    print('Logged IN Successfully')
    await page.wait_for_load_state('domcontentloaded')
    c_path = os.path.join('.', 'Back-End', 'Scripts', 'cookies.json')
    cookies = await page.context.cookies()
    with open(c_path, 'w') as f:
        json.dump(cookies, f)
    print(f"Cookies saved to {c_path}")
    

async def main(page):
        try:
            await login(page)
        except Exception as e:
            print(e)