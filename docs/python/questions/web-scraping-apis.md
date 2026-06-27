# Web Scraping & APIs

> Add new questions below in the same format: `## Question? <Badge ... />` then the answer.

## How does web scraping work in Python? <Badge type="warning" text="medium" />

Fetch a page (`requests`), parse the HTML (`BeautifulSoup` or `lxml`), then extract data via tags/selectors. For JS-rendered pages, drive a real browser (`selenium`/`playwright`). Respect `robots.txt` and rate limits.

```python
import requests
from bs4 import BeautifulSoup

html = requests.get("https://example.com").text
soup = BeautifulSoup(html, "html.parser")
titles = [h.text for h in soup.select("h2.title")]
```

## What is Selenium used for? <Badge type="warning" text="medium" />

Automating a real browser — for testing or scraping dynamic, JavaScript-heavy pages where `requests` can't see the rendered content. It can click, type, scroll, and wait for elements.

```python
from selenium import webdriver
driver = webdriver.Chrome()
driver.get("https://example.com")
driver.find_element("css selector", "button#load").click()
```

## What are APIs and how do you use them? <Badge type="tip" text="easy" />

An API is a contract for programs to exchange data, usually JSON over HTTP. Call them with `requests`, passing params/headers/auth and handling the JSON response and status codes.

```python
r = requests.get("https://api.example.com/users",
                 headers={"Authorization": "Bearer TOKEN"})
r.raise_for_status()
users = r.json()
```

## How do you handle JSON data? <Badge type="tip" text="easy" />

The `json` module: `loads`/`dumps` for strings, `load`/`dump` for files. `requests` responses expose `.json()` directly.

```python
import json
data = json.loads('{"a": 1}')      # str -> dict
text = json.dumps(data, indent=2)  # dict -> str
```

## What's the difference between REST and SOAP APIs? <Badge type="warning" text="medium" />

REST is an architectural style — lightweight, usually JSON over HTTP, stateless, flexible. SOAP is a stricter protocol using XML envelopes with formal contracts (WSDL) and built-in standards (security, transactions). REST dominates modern web APIs; SOAP lingers in enterprise/legacy systems.

## How do you parse XML in Python? <Badge type="warning" text="medium" />

Use `xml.etree.ElementTree` (stdlib) or `lxml` for speed/XPath.

```python
import xml.etree.ElementTree as ET
root = ET.fromstring("<users><user>Alice</user></users>")
for u in root.findall("user"):
    print(u.text)
```

## How do you handle rate limits while scraping? <Badge type="warning" text="medium" />

Throttle requests (sleep/backoff), respect `Retry-After` headers, cache responses, use exponential backoff on 429s, and rotate sessions where allowed.

```python
import time
for url in urls:
    r = requests.get(url)
    if r.status_code == 429:
        time.sleep(int(r.headers.get("Retry-After", 5)))
    time.sleep(1)   # be polite
```

## What is XPath and how is it used? <Badge type="warning" text="medium" />

A query language for navigating XML/HTML node trees — select elements by path, attribute, or position. Common with `lxml` and Selenium.

```python
from lxml import html
tree = html.fromstring(page)
tree.xpath('//div[@class="price"]/text()')
```

## How do you build a simple web scraper? <Badge type="tip" text="easy" />

```python
import requests
from bs4 import BeautifulSoup

def scrape_titles(url):
    soup = BeautifulSoup(requests.get(url).text, "html.parser")
    return [a.get_text(strip=True) for a in soup.select("a.title")]
```
