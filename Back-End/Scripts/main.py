import login as lg
import collection as cl
from playwright.async_api import async_playwright
import asyncio

async def init():
    playwright = await async_playwright().start()
    browser = await playwright.chromium.launch_persistent_context('./Scripts', headless=True)
    page = await browser.new_page()
    return playwright, browser, page


async def main():
    playwright, browser, page = await init()
    await lg.main(page)
    await cl.main(page)

    await page.close()
    await browser.close()
    await playwright.stop()

asyncio.run(main())