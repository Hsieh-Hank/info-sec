安装Node.js和npm

首先，你需要安装Node.js，它会自动包含npm。在安装Node.js之前，请检查你的系统是否已经安装了Node.js和npm。在命令行中运行以下命令来检查：node -v, npm -v

下载Node.js安装包：

访问Node.js官方网站：[Node.js Downloads](https://nodejs.org/en)
下载适合你系统的Node.js安装包（推荐使用LTS版本）。

安装Node.js：

运行下载的安装包并按照提示完成安装过程。安装过程中请确保勾选“Add to PATH”选项，以便系统能够识别npm命令。  

验证安装：

安装完成后，打开新的命令行窗口，运行以下命令来验证安装是否成功：

node -v,npm -v  这两个命令应该分别返回Node.js和npm的版本号。  
  
初始化npm项目
在项目根目录中运行以下命令来初始化npm项目：npm init -y

运行以下命令来安装所需的npm包：npm install express jsonwebtoken body-parser

在项目根目录中运行以下命令来启动服务器：node server.js

在浏览器中打开http://localhost:3000 ，输入用户名和密码进行登录。服务器会验证用户凭证，并在验证成功后返回一个JWT token。

浏览器会将这个token存储在localStorage中
