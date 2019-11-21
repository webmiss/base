
from selenium import webdriver
import websocket
ws = websocket.WebSocket(sslopt={"check_hostname": False})
ws.connect("wss://webmis.vip:9010")
ws.send("Hello, World")