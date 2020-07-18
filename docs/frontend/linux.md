---
sidebarDepth: 4
---
## Linux相关

> 呜呜呜，以前明明看过《Linux就是这个范》，感觉忘了好多。
>
> 这一节以后会慢慢补上。



``` shell
/etc/profile # 系统配置
/etc/passwd # 用户信息（用户ID，组ID等）
/etc/group # 用户组信息
/etc/shadow # 用户密码（密文保存）
/etc/sudoers # 可以给用户/用户组进行sudo的权限

~/.bashrc # 用户配置
~/.bash_history # 历史命令行
~/.ssh # 存放 ssh配置/公私钥
~/.ssh/authorized_keys # 放公钥，从而使用密钥登录服务器
```



一些命令

``` shell
ls -l | grep ^l # 获取当前目录下所有的符号链接
wc file.txt -l # 输出文件的行数
alias ..='cd ..' # 别名
useradd akara # 新建用户akara
passwd akara # root用户给普通用户修改密码
```
