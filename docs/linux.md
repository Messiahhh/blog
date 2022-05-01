---
sidebarDepth: 4
---
# Linux

> 完善中

## Shell

1. 脚本以`#!/bin/bash`开头
2. 可通过`chmod +x ./index.sh`使其可执行

### 变量

```  shell
name="akara" # 声明变量 等号前后要粘着
echo $name # 使用变量
echo ${name} # 使用变量 *推荐
readonly name # 使变量只读
unset name # 删除变量，不能删除只读变量
```

`Shell`变量可分为当前脚本下的局部变量，以及环境变量。



``` shell
# 字符串（单引号）
name='akara'
# 字符串（双引号）
name="akara"
```

单引号字符串内部字符会原样输出，即内部不能有变量和转义符号。

``` shell
# 单引号
name='akara'
echo 'i am ${name}' # i am ${name}

# 双引号
name='akara'
echo "i am ${name}"" # i am akara
```



``` shell
arr=("a" "b" "c") # 数组
echo ${arr[0]} # "a"
echo ${arr[@]} # 输出数组所有项 "a" "b" "c"
```

### 传递参数

``` shell
echo "$1 $2 $3"
./index.sh a b c # a b c
```

### 运算符

`shell`中进行运算通常使用反引号配合`expr`来实现

``` shell
a=10
b=20

echo `expr $a + $b`
```

**条件判断：**

``` shell
if [ $name == 'akara' ] # 注意，一定要留出空格
then
    echo "相等"
fi
```

补充：判断相等时可以用`==`，也可以直接用`=`

**逻辑运算：**

``` shell
name="akara"
age=22

if [[ $name == 'akara' && $age == 20 ]]
then
    echo "相等"
else 
    echo "不相等"
fi
```

### 输出重定向

``` shell
echo "hello" > index.js # 覆盖
echo "hello" >> index.js # 不覆盖，添加到文件尾部
```

可以通过重定向，让我们在执行某些脚本时屏蔽输出

``` shell
./index.sh > /dev/null
```





## 常用命令

很简单的命令就不写了。



### ls

``` shell
ls 
ls -a # 隐藏文件 
ls -l # 显示完整信息，包括读写执行的权限等
```

通过`ls -l`可以看到完整的文件信息，如下：

``` shell
-rwxr-xr-x 1 root root 27776 Apr 17 2012 test.txt
```

其中`- rwx r-x r-x`由四部分组成：文件类型、拥有者权限、拥有者所属用户组权限、其他用户权限。

文件类型中，`-`表示普通文件，`d`表示目录，`l`表示软链接（硬链接无特殊标记）

权限包括`rwx`，即读、写、执行。可以使用数字来代表权限，读：4、写：2、执行：1。因此`r-x`对应着`5`。



### chmod

通过`ls`可以看到一个文件的操作权限，而通过`chmod`可以修改文件的权限。

``` shell
chmod 777 text.txt
```

或者

``` shell
chmod +x test.txt # 使其可执行
```



### alias

用于起命令的别名

``` shell
alias ..='cd ..'
```



### grep

用于字符串查找

``` shell
grep 'content' test.txt
-e # 正则查找 
```



### 管道

管道用来实现进程之间的通信，具体来说就是把一个程序的输出作为另一个程序的输入

``` shell
cat test.txt | wc # 通过cat得到test.txt内容，把该内容作为wc命令的输入
```



### sudo

让普通用户临时具备`root`用户的权限

``` shell
sudo ls
```



### ssh

``` shell
ssh user@host
-p # 指定端口号，默认是ssh的22端口号
ssh host # 以root用户登录
```

另外，`~/.ssh/config`用于存储服务器相关的配置，如：

``` shell
# ssh config
#
#
host myserver
        hostName 111.111.111.111
        User root
        port 2045
```

我们只需要使用`ssh myserver`即可快速连接服务器



### ssh-keygen

用来创建密钥，生成的密钥存放于`~/.ssh/`下

``` shell
ssh-keygen
```



### whoami

``` shell
whoami # 输出我的名字
```



### who

``` shell
who # 输出当前主机所有登录用户的信息
```



### useradd

添加用户，`adduser`命令也行，但是二者略有差异

``` shell
useradd akara
```



### passwd 

修改用户密码

``` shell
passwd akara
```



### export

用于我们在配置文件`/etc/profile`或`~/.bashrc`中使用`export`来设置环境变量。

``` shell
# /etc/profile
export name="aka"
```



### wc

用于计算文件的字数、行数等信息

``` shell
wc -l test.txt # 输出行数
```



### man

用于查询一个命令的使用方法

``` shell
man ls
```



### whereis

用于查找文件，通常可以拿来查配置文件或可执行文件的位置

``` shell
whereis profile
# profile: /etc/profile.d /etc/profile
```



### which

也是用于查找文件，通常用来查可执行文件。

``` shell
which bash
```





### ln

用于创建链接，链接分为软链接（符号链接）和硬链接

``` shell
ln /bin/bash sh # 默认创建硬链接
ln -s /bin/bash sh # 软链接
```



软链接可以理解成windows中的快捷方式；硬链接可以看成一个文件拥有不同的路径。



### tar

用于打包压缩文件。

我们会经常看到这样的文件：`*.tar.gz`、`*.tar.bz2`、`*.tar.xz`。这些都是通过`tar`打包而成的，后缀的不同是因为其所采用的压缩算法不同。

压缩比：`gz` < `bz2` < `xz`

压缩速度：`gz` > `bz2` > `xz`

**压缩文件：**

``` bash
# 多种方式
tar -zcvf filename.tar.gz FILES # z表示gz
tar -jcvf filename.tar.bz2 FILES # j表示bz2
tar -Jcvf filename.tar.xz FILES # J表示xz
```

**解压缩文件：**

``` shell
tar -vx -f filename
# or
tar -vxf filename
```



### crontab

定时任务。

``` shell
crontab -l # 查看定时任务
```





### clear

清空输出



## 常见配置文件

### 核心配置

`/etc/profile`： 系统级配置

`~/.bashrc`：用户级配置

当我们更改配置后，通过`source ~/.bashrc`使其生效



### 用户信息

`/etc/passwd`：用户信息（用户ID，组ID等）

`/etc/group`: 用户组信息

`/etc/shadow`: 用户密码（密文报错）

`/etc/sudoers`：用户的`sudo`权限



### ssh

个人的`ssh`相关文件在`~/.ssh`下，包括个人的私钥、公钥、SSH配置文件`config`、`authorized_keys`、`known_hosts`。

通常我们在服务器的`authorized_keys`存放我们自己电脑的公钥，之后就无需使用密码来连接服务器了。

在我们成功连接服务器后，我们电脑的`known_hosts`文件也会记录下服务器的公钥。



### 其他

`~/.bash_history`：记录历史命令行