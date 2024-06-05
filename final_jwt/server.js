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

// 记录登录尝试次数和锁定时间
const loginAttempts = {};
const LOCK_TIME = 10 * 60 * 1000; // 10 分钟锁定时间

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!loginAttempts[username]) {
        loginAttempts[username] = { attempts: 0, lockUntil: 0 };
    }

    const userAttempts = loginAttempts[username];

    // 检查是否被锁定
    if (Date.now() < userAttempts.lockUntil) {
        return res.status(403).json({ message: 'Account is locked. Try again later.', attempts: userAttempts.attempts });
    }

    // 检查用户名和密码是否匹配
    if (username === 'testuser' && password === 'password123') {
        // 重置登录尝试次数
        userAttempts.attempts = 0;

        // 生成 JWT
        const token = jwt.sign({ username }, 'your_jwt_secret', { expiresIn: '1h' });

        // 返回 JWT 和成功信息
        res.status(200).json({ message: 'Login successful', token });
    } else {
        // 增加登录尝试次数
        userAttempts.attempts += 1;

        if (userAttempts.attempts >= 3) {
            // 锁定用户
            userAttempts.lockUntil = Date.now() + LOCK_TIME;
            return res.status(403).json({ message: 'Account is locked. Try again later.', attempts: userAttempts.attempts });
        }

        res.status(401).json({ message: 'Invalid username or password', attempts: userAttempts.attempts });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// 添加路由以处理成功登录后的跳转
app.get('/hello.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'hello.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
