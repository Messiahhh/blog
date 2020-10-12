---
sidebarDepth: 4
---
## Git

##### 常用命令

``` shell
git init # 初始化git仓库
git add # 将改动添加到缓存区（index）
git commit # 提交commit
git push # 推送给远程仓库
git pull # 拉远程仓库代码并合并(fetch + merge)
git clone # 拉仓库
git branch # 创建分支
git checkout <file> # 切换分支
git checkout -b <file> # 创建分支并切换过去
git checkout -d <file> # 删除分支
git merge # 分支合并
git rebase # 分支合并
git log # 查看 commit 记录
git status # 查看当前状态

# 其他命令
git rm --cached <file> # 若我们git add 一个文件，通过该命令可以取消该文件的追踪

git checkout -- <file>
# a文件若缓存区有缓存。当我们工作目录中修改a的内容，可以使用该命令删除我们的更改

git reset --hard HEAD^ # 撤销一个commit，HEAD^^为撤销两个
```



##### git object

``` shell
# 显示所有object
ls .git/objects/
10/ ea/ 1c/ ... /info /pack

# 查看object类型/值，常见类型：blob(git add 后创建), tree和commit(git commit 后创建)
git cat-file -t 58c9 
git cat-file -p 58c9 # 58c9为想找的object的值
```

[参考](https://zhuanlan.zhihu.com/p/96631135)



##### git merge VS git rebase 

这两种方法通常都是用于分支的合并，不过其原理是不同的。

![待合并项目](https://upload-images.jianshu.io/upload_images/305877-5dece524b7130343.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

比如该图，在Feature分支上改动，想要合并进Master分支。我们通常有两种方法:`git merge`和`git rebase`。

``` shell
git merge feature
# 或者
git rebase feature
```





![git merge](https://upload-images.jianshu.io/upload_images/305877-c4ddfcf679821e2f.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)



![git rebase](https://upload-images.jianshu.io/upload_images/305877-467ba180733adca1.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

git merge 保存了完成的历史记录，而git rebase 则尽量简化了历史记录（重写了历史记录）。



##### 合并commit

依靠`git rebase -i`来合并美化`commit`记录

``` shell
git rebase -i xxxx # commit 号
git rebase -i HEAD~3 # 或者这种写法
```

之后在Vim里把对应的pick字段改成squash，再之后修改`commit msg`即可。