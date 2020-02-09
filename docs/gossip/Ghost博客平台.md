
# 用Ghost搭建你的博客
> 本文为初学前端时所写，未进行勘误便移植了过来，若有错误请见谅。

## Ghost

Ghost是一个现代化的，开源的，基于Node.js的博客发布平台，它的前端管理系统基于Ember.js， 后端的模板引擎采用的handlebars， 而默认数据库是MySQL，当然，你也可以使用其他类型的数据库。



## Ghost1.0

如果用过1.0版本以前的Ghost的同学，会对Ghost版本的更新感到头疼，而一些配置问题也让人心烦。

好在，就在一个月前，Ghost推出了Ghost1.0.0，并在一个月内升级到了1.6.2（到目前为止）

大版本的提升，主要是因为一个东西的出现，那就是Ghost-Cli。



## Ghost-CLI

有了Ghost-Cli，你可以

- 快速安装Ghost
- 自动配置MySQL, Nginx , SSL等
- 快捷的更新版本（只用一行命令就可以）
- 其他等等





## 你需要先做些准备（官方推荐

-  Ubuntu 16.04操作系统的服务器（官方只推荐这个操作系统
-  MySQL（默认
-  Nginx
-  Node
  - 支持的版本： >= 4.5 < 5.*
  - 推荐的版本： >= 6.9 < 7.*
  -  将会被支持的版本： 8.* （Ghost 只支持LTS的Node，如目前的6， 将来的LTS
- 服务器至少1GB 内存（可以使用swap）
- 需要一个非root用户来执行```ghost```命令



## Follow me



### 1GB内存？ 你需要Swap

你可以看[这个](https://www.digitalocean.com/community/tutorials/how-to-add-swap-space-on-ubuntu-16-04)，或者在命令行中输入（官方推荐方法）

```bash
$dd if=/dev/zero of=/var/swap bs=1k count=1024k
$mkswap /var/swap
$swapon /var/swap
$echo '/var/swap swap swap default 0 0' >> /etc/fstab
```

### 用非root用户执行ghost命令

增加用户

```
$adduser <user>
```

给用户sudo权限

```
$usermod -G sudo <user>
```

切换到非root用户

```
$su - <user>
```

### 用apt-get安装MySQL和Nginx以及Node

如果你已经安装好这些东西，跳过就行

**Update package lists**

```
$sudo apt-get update
```

**Upgrade installed packages**

```
$sudo apt-get upgrade
```

**Install NGINX**

```
$sudo apt-get install nginx
```

**Open Firewall for HTTP/HTTPS**

```
$sudo ufw allow 'Nginx Full'
```

**Install MySQL**

```
$sudo apt-get install mysql-server
```

**Add the NodeSource APT repository for Node 6**

```
$curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash
```

**install Node.js**

```
$sudo apt-get install -y nodejs
```

安装Ghost-CLI

```
$sudo npm i -g ghost-cli
```

或者使用yarn(>= 0.23.x)

```
$sudo yarn global add ghost-cli
```



准备工作完成。

## 安装Ghost

新建一个文件夹

```
$sudo mkdir -p /var/www/ghost
```

> ！！安装在/root文件夹下就失败

给这个文件夹你的用户的权限([user] 换成你的非root用户名)

```
$sudo chown [user]:[user] /var/www/ghost
```

切换到新文件夹里

```
$cd /var/www/ghost
```

安装

```
ghost install
```

然后会蹦出一系列的问题，包括

- 域名
- MySQL信息（localhost, 用户名，密码， 数据库名）
- Nginx
- SSL
- 其他
- 最后一步会提示你是否要启动服务



## 完成

现在，你输入你的域名，应该就能成功的访问了。

输入

```
域名/ghost
```

可以进入网站的后台系统，可以进行发布，更换主题等各种功能



## 其他

[官方文档](https://docs.ghost.org/v1/docs/introduction)

你可以使用ghost config来更改配置

你也可以用ghost start/stop/restart来管理你的应用

你也可以用ghost install 来更新你的应用

等等...
