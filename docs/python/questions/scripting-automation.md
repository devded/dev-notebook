# Scripting & Automation

> Add new questions below in the same format: `## Question? <Badge ... />` then the answer.

## How would you automate a repetitive task? <Badge type="tip" text="easy" />

::: details View Answer
Script it with Python: use `os`/`pathlib` for files, `shutil` for copy/move, `subprocess` to run commands, `schedule`/cron to run on a timer, and `requests` for web tasks. Wrap logic in functions and add logging.

```python
from pathlib import Path
for f in Path("downloads").glob("*.tmp"):
    f.unlink()      # delete temp files
```
:::

## How can Python be used for system administration? <Badge type="warning" text="medium" />

::: details View Answer
Automate provisioning, log parsing, backups, monitoring, and user management with `os`, `subprocess`, `shutil`, `psutil` (system metrics), and `paramiko` (SSH).

```python
import subprocess
out = subprocess.run(["df", "-h"], capture_output=True, text=True)
print(out.stdout)
```
:::

## What techniques can you use for parsing text files? <Badge type="warning" text="medium" />

::: details View Answer
Stream line by line, split on delimiters, use `str` methods (`split`, `strip`, `startswith`), regex for patterns, and dedicated parsers (`csv`, `json`) for structured formats.

```python
with open("access.log") as f:
    errors = [line for line in f if "ERROR" in line]
```
:::

## How do you manipulate CSV files? <Badge type="tip" text="easy" />

::: details View Answer
The `csv` module for row-level work, or pandas for bulk transforms.

```python
import csv
with open("in.csv") as src, open("out.csv", "w", newline="") as dst:
    reader = csv.DictReader(src)
    writer = csv.DictWriter(dst, fieldnames=reader.fieldnames)
    writer.writeheader()
    for row in reader:
        row["name"] = row["name"].title()
        writer.writerow(row)
```
:::

## How do you automate web browsing? <Badge type="warning" text="medium" />

::: details View Answer
For static pages, `requests` + `BeautifulSoup` (parse HTML). For dynamic/JS-heavy pages or real interaction, drive a real browser with `selenium` or `playwright`.

```python
from selenium import webdriver
driver = webdriver.Chrome()
driver.get("https://example.com")
driver.find_element("name", "q").send_keys("python")
```
:::