## Simple Node.js REST API using NewsAPI.org

This is a simple Node.js REST API that retrieves news articles using the NewsAPI.org API. The API allows you to search for news articles by keyword returns JSON data containing article metadata and URLs to the full article.

### Getting Started  🚀
To get started with this API, follow these steps:

1. Clone the repository to your local machine:
~~~bash 
   git clone https://github.com/conrad96/node-cache-redis 
~~~
2. Install dependencies:
~~~bash
    yarn install
~~~
3. Get an API key from NewsAPI.org by creating an account at https://newsapi.org/account. Once you have an API key,  create a .env file in the project root directory and add the following line:
    API_KEY=YOUR_API_KEY_HERE
4. start the server:
~~~bash
    yarn run start
~~~    
The api will be available on http://localhost:3000/

#### Endpoints
The API provides the following endpoints:

GET /search 
Retrieves a list of news articles based on the specified query parameters.

Query parameters:

q: The keyword or phrase to search for. Defaults to "world news".
    GET /search/:q


#### Example response:
    {
    "cached": true,
    "data": 
    [
        {
            "source": {
                "id": "google-news",
                "name": "Google News"
            },
            "author": null,
            "title": "Fitch upgrades Ghana's local-currency debt rating after domestic ... - Reuters",
            "description": "Fitch upgrades Ghana's local-currency debt rating after domestic ...  Reuters",
            "url": "https://consent.google.com/ml?continue=https://news.google.com/rss/articles/CBMieWh0dHBzOi8vd3d3LnJldXRlcnMuY29tL3dvcmxkL2FmcmljYS9maXRjaC11cGdyYWRlcy1naGFuYXMtbG9uZy10ZXJtLWxvY2FsLWN1cnJlbmN5LWlzc3Vlci1kZWZhdWx0LXJhdGluZy1jY2MtMjAyMy0wMy0yMi_SAQA?oc%3D5&gl=FR&hl=en-US&cm=2&pc=n&src=1",
            "urlToImage": null,
            "publishedAt": "2023-03-22T09:57:00Z",
            "content": "We use cookies and data to<ul><li>Deliver and maintain Google services</li><li>Track outages and protect against spam, fraud, and abuse</li><li>Measure audience engagement and site statistics to unde… [+1131 chars]"
        }, 
        ...
    ]} 