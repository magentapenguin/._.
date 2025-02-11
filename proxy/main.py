import bottle, requests, bs4, urllib.parse

app = bottle.Bottle()


def requests_response_to_bottle_response(response: requests.Response, fl=False) -> bottle.HTTPResponse:
    bottle_response = bottle.HTTPResponse()
    bottle_response.status = response.status_code
    bottle_response.body = response.text
    return bottle_response

@app.route("/p/<url>", method="ANY")
def proxy(url):
    protocol = bottle.request.headers.get("X-Forwarded-Proto", "http")
    # Fix links if the request is a GET and the response is HTML
    response = requests.request(
        method=bottle.request.method,
        url="https://" + url,
        allow_redirects=False,
        timeout=10,
    )
    r = requests_response_to_bottle_response(response)
    if bottle.request.method == "GET" and "text/html" in r.content_type:
        print(r.body)
        r.body = fix_links(r.body)
    return r


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

if __name__ == "__main__":
    bottle.run(app, host="localhost", port=8080, debug=True)