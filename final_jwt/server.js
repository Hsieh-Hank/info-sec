const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // 将你的HTML文件放在public文件夹中

// 模拟用户数据
const users = {
    'testuser': 'password123'
};


app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // 检查用户名和密码是否与预定义的用户凭据匹配
    if (username === 'testuser' && password === 'password123') {
        // 用户名和密码匹配，返回成功的响应
        res.status(200).json({ message: 'Login successful' });
    } else {
        // 用户名或密码不匹配，返回错误的响应
        res.status(401).json({ message: 'Invalid username or password' });
    }
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
