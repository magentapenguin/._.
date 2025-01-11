import bottle, requests, bs4, urllib.parse

app = bottle.Bottle()


@app.route("/p/<url:re:.*>", method="ANY")
def proxy(url):
    protocol = bottle.request.headers.get("X-Forwarded-Proto", "http")
    if bottle.request.
    return requests.request(
        method=bottle.request.method,
        url=protocol + "://" + url,
        headers=dict(bottle.request.headers.items()),
        data=bottle.request.body,
        cookies=bottle.request.cookies,
        allow_redirects=False,
        timeout=10,
    )


def fix_links(html):
    soup = bs4.BeautifulSoup(html, "html.parser")
    for tag in soup.find_all("a"):
        if tag.has_attr("href"):
            tag["href"] = fix_link(tag["href"])
    for tag in soup.find_all("form"):
        if tag.has_attr("action"):
            tag["action"] = fix_link(tag["action"])
    for tag in soup.find_all("img"):
        if tag.has_attr("src"):
            tag["src"] = fix_link(tag["src"])
    for tag in soup.find_all("script"):
        if tag.has_attr("src"):
            tag["src"] = fix_link(tag["src"])
    for tag in soup.find_all("link"):
        if tag.has_attr("href"):
            tag["href"] = fix_link(tag["href"])
    for tag in soup.find_all("iframe"):
        if tag.has_attr("src"):
            tag["src"] = fix_link(tag["src"])
    for tag in soup.find_all("object"):
        if tag.has_attr("data"):
            tag["data"] = fix_link(tag["data"])
    for tag in soup.find_all("embed"):
        if tag.has_attr("src"):
            tag["src"] = fix_link(tag["src"])
    for tag in soup.find_all("param"):
        if tag.has_attr("value"):
            tag["value"] = fix_link(tag["value"])
    for tag in soup.find_all("area"):
        if tag.has_attr("href"):
            tag["href"] = fix_link(tag["href"])
    for tag in soup.find_all("base"):
        if tag.has_attr("href"):
            tag["href"] = fix_link(tag["href"])
    return str(soup)


def fix_link(href):
    href = urllib.parse.urlsplit(href)
    if href.scheme in ["http", "https"]:
        return (
            "/p/"
            + href.netloc
            + href.path
            + ("?" + href.query if href.query else "")
            + ("#" + href.fragment if href.fragment else "")
        )
    return urllib.parse.urlunsplit(href)
