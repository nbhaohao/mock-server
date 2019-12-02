# mock-server-gui
一个带有界面的 mock 数据服务器，使用 TypeScript，React，Node.js 技术实现。
## 动机
在平时开发中，会遇到页面提前完成，而接口还没有完成的情况，我平时会用 `setTimeout` 和 `Promise` 来模拟延迟返回数据，因为我不想配置一些类似 `mock.js` 的工具，感觉很麻烦，可能之后会去了解一下。

使用 `mock-server-gui`，我们可以指定具体的请求地址，来返回我们设置的模拟数据。假设我们真实的 API 地址是 `api.test.com`，我们可以指定 `api.test.com/users` 作为返回 mock 数据的路由，如果后端已经实现了另外的接口，比如 `api.test.com/userInfo`，那么 `mock-server-gui` 就会作为代理服务器，去请求 `userInfo` 的数据。

总结来说，我们可以代理一个 API 地址，配置我们想要返回模拟数据的路由，如果这个 API 地址的请求路径我们没有配置，那么就还是发送真正的请求。
## 安装
``` bash
# npm 
npm install mock-server-gui -g

# yarn
yarn global add mock-server-gui
```
## 使用
### 启动服务器
``` bash
# 使用命令
mock-server-start 

# 看到下方输出文字后，代表本地服务器启动成功

# 服务器启动成功，正在监听9000端口
# 网页端启动成功，http://localhost:9000/mockServer/static/index.html/#/manage
```
看到启动成功后，我们可以使用浏览器打开我们的管理页面：`http://localhost:9000/mockServer/static/index.html/#/manage`
### 创建一个 mock 项目
![创建项目](https://i.loli.net/2019/12/02/jBqEvGKVY6Wd8i4.png)
### 添加一个 mock 路由
![添加路由](https://i.loli.net/2019/12/02/zSRa2WvYl3QX7LZ.png)
### 发送请求
使用 POSTMAN 测试一下：
![发送请求](https://i.loli.net/2019/12/02/VniyTBL58Q3pa1Z.png)
## 注意
如果在真实环境中使用，假设后端已经实现了 10 个接口，而你设置了其中一个路由作为 mock 请求，那么其他剩余的 9 个接口都将经过代理转发来获得数据，听起来不是特别好，因为按道理来说，我们只想代理其中一个请求，不应该影响到其他剩余的请求，所以**在开发过程中请谨慎使用！！！可能由于代理转发的原因，造成一些 BUG。**
