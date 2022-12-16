---
sidebarDepth: 4
---
# Git

## 基础命令

``` shell
# 初始化git仓库
git init 

# 查看提交记录
git log 

# 查看历史命令
git reflog 

# 查看当前状态
git status 
```

### git restore 

``` shell
# 工作目录内容添加进索引区域
git add <name>
git add .

# 当修改了工作区的文件但还未暂存更改（git add）时，可以通过该命令放弃更改
git restore <name> 
git restore .

# 当修改了工作区的文件并且暂存更改时，可以通过该命令放弃暂存更改，变成尚未git add的状态
git restore --staged <name>
git restore --staged .
```



### git commit

``` shell
# 根据暂存区的内容生成新的commit
git commit
git commit -m 'feat: moyu' 

# 可以用来重写当前的commit内容和消息，可以用来保证提交记录的简洁
git commit --amend 
git commit --amend --reset-author 
```



### git branch

``` shell
# 显示所有分支
git branch 

# 显示所有远程分支
git branch -r

# 创建分支
git branch <name> 

# 删除本地分支
git branch -D <name> 

# 修改分支名
git branch -m <nameA> <nameB> 

# 切换分支
git checkout <name> 

# 切换到上一个分支
git checkout - 

# 创建分支并切换过去
git checkout -b <name> 


# 查看分支的track信息
git branch -vv

# 设置当前分支的上游分支，等价于--set-upstream
git branch -u origin/feature
```

### git tag

``` shell
# 查看所有tag
git tag 

# 给当前commit打tag
git tag v1.0.1 

# 给某个commit打tag
git tag v1.0.1 <commit> 

# 删除tag
git tag --delete v1.0.1 
```

### git stash

``` shell
# 暂存工作区的修改
git stash 

# 查看已stash的内容
git stash list 

# 释放最新stash的内容到工作区
git stash pop 0 

# 清空暂存区的内容
git stash clear
```

## 分支合并

`git`存在两种分支合并的策略，即`git merge`和`git rebase`。本人强烈建议使用`git rebase`来进行分支管理，首先这种策略十分简单，而且能保证提交历史非常简洁。



### git merge

``` shell
# 合并目标分支
git merge <name> 
```

使用`git merge`时，根据分支情况的不同会存在两种合并情况， `fast-forward`（快进）和`non-fast-forward`。多人协作的时候多数是`non-fast-forward`的情况，此时合并分支会创建一个新的提交。



#### fast-forward

![fast-forward](https://backlog.com/git-tutorial/cn/img/post/stepup/capture_stepup1_4_1.png)



![fast-forward合并](https://backlog.com/git-tutorial/cn/img/post/stepup/capture_stepup1_4_2.png)

#### non-fast-forward

![分支合并](https://backlog.com/git-tutorial/cn/img/post/stepup/capture_stepup1_4_3.png)

![分支合并结果](https://backlog.com/git-tutorial/cn/img/post/stepup/capture_stepup1_4_4.png)

### git rebase

``` shell
# 合并目标分支
git rebase <name> 
```



![git-rebase](https://backlog.com/git-tutorial/cn/img/post/stepup/capture_stepup1_4_6.png)

![git-rebase结果](https://backlog.com/git-tutorial/cn/img/post/stepup/capture_stepup1_4_7.png)

#### 冲突

`git rebase`时如果碰到代码冲突，在解决完冲突后通过`git add .`和`git rebase --continue`可进入下一步；如果又不想要合并了，也可以通过`git rebase --abort`放弃合并。





## 远程操作

``` shell
git remote # 查看远程仓库的信息
git remote add origin <url> # 添加仓库地址映射
git remote remove origin # 删除地址映射

git clone <url> # 拉取远程仓库到本地
```

大多数情况下，我们的本地仓库只需要和一个远程仓库进行关联，此时通常会使用特殊的标识`origin`来代表这个远程仓库。

在少数情况下本地仓库需要和多个远程仓库进行关联，一种常见的场景是我们想要给*Github*的某个开源库贡献代码，这时候我们会先`fork`并把`fork`后生成的仓库`clone`到本地，此时`origin`代表着自己的远程仓库，通常我们还会手动通过`git remote add upstream <url>`来关联原本的开源库用于更新最新代码，此时`upstream`代表原本的开源库。



### Remote-Tracking Branch 

远程仓库的分支通常被称为**远程分支**（*Remote Branch*），通常可以在Github或Gitlab上进行查看。

与之相关的一个重要概念叫做**远程跟踪分支**（*Remote-Tracking Branch*），通常以类似`origin/master`的形式表示，在执行如`git fetch`、`git push`、`git pull`这样的远程操作后git会自动移动对应的远程跟踪分支，以确保它总是指向远程仓库对应的分支。

在使用`git clone`来生成本地仓库时，不仅默认会使用`origin`来表示远程仓库，还会自动给本地分支建立追踪关系，如`master`分支会自动追踪`origin/master`，此时也会把`master`分支称为***Tracking Branch***，把`origin/master`称为**上游分支**（Upstream branch）。事实上，当不指定分支信息直接执行`git push`或`git pull`时，会根据当前分支的追踪关系来决定目标分支。

#### git branch -vv

使用`git branch -vv`可以查看所有的追踪信息



#### 设置上游分支

``` shell
# 希望feature分支跟踪origin/master分支的四种写法
git branch -u origin/master <branchname>
git branch -u origin/master # 不指定branchname时默认为当前分支

git branch --set-upstream-to=origin/master <branchname>
git branch --set-upstream-to=origin/master
```



### git fetch 

``` shell
# 获取所有remote的远程提交和分支
git fetch 

# 拉取origin remote的远程提交和分支
git fetch origin 
```

`git fetch`会拉取目标`remote`的所有提交并更新本地的远程跟踪分支。因此可以直接`git rebase`最新的远程跟踪分支来获取最新的代码，比如：

``` shell
git fetch && git rebase origin/master
```



### git pull

本质上，`git pull`命令会使用给定的参数运行`git fetch`命令，并默认使用`git merge`策略来合并目标分支，因此`git pull origin master`等价于`git fetch origin master && git merge origin/master`。

我们也可以调整`git pull`时采用的分支合并策略：

``` shell
git config pull.rebase false # git merge（默认）
git config pull.rebase true # git rebase（个人推荐）
git config pull.ff only # git merge but fast-forward only
```



### git push

`git push`用于推送指定分支到目标`remote`。

``` shell
git push origin main # 将本仓库的main分支推送到origin的main分支

git push origin test --delete # 删除远程分支
```

更进阶的用法，我们可以把本地的`A`分支推送到远程的`B`分支

``` shell
git push origin branchA:branchB
```





## 版本回退

通过`git reset --hard`即可实现版本回退和前进，本质上是切换`HEAD`指针所指向的提交，`HEAD^`表示`HEAD`的上一个提交，`HEAD~2`表示`HEAD`的上两个提交。

``` shell
# 回退到上一个commit
git reset --hard HEAD^ 
git reset --hard Head^^ 
git reset --hard Head~3 

 # 回退到上一个commit，但当前commit修改的内容并不会消失，而是保存在工作目录中
git reset head^
```

除了`git reset`，我们还可以使用`git revert`来撤销某次的提交，`git revert`会产生一个新的提交。

``` shell
# 撤销当前commit
git revert HEAD 
```





## git rebase -i

``` shell
git rebase -i origin/main 
```

通过交互式的`git rebase`可以实现提交的压缩、删除、顺序切换、编辑某个历史提交等功能。



## git cherry-pick

``` shell
git cherry-pick <commit>
```





## 底层原理

> [参考](https://zhuanlan.zhihu.com/p/96631135)

`commit`节点通过 `tree`节点记录着某个时刻对应的文件信息，这些对应的文件保存在索引区域中（严格来说，这些文件被当作 `object`节点存于 `git`仓库中，索引指向着这些文件），当我们切换到某个 `commit`时，会根据索引把对应的文件同步到工作目录中。

通常当我们修改工作目录中的文件后，通过 `git add`把更新同步到索引中（即在 `git`仓库中创建一个新的 `object`结点，并更新索引的指向），然后使用 `git commit`来生成一个新的 `commit`节点（即先根据索引的指向生成一个 `tree`节点，再生成 `commit`节点），新的 `commit`节点记录着新的文件信息。

假设 `commitA`和 `commitB`都记录着文件 `test`，那么当我们处于 `commitA`时并修改工作目录的文件后，或者已经同步到索引区域，只要还没有提交记录的话，这时候如果我们切换到 `commitB`，那我们的本地修改会同步到 `commitB`当中。

不过，如果我们在 `commitA`记录着文件 `a`，而 `commitB`中不存在文件 `a`，然后我们处于 `commitA`时修改文件 `a`，这时候直接切换到 `commitB`就会失败，并且会提醒我们应该先提交我们的修改，或者可以使用 `git stash`来把我们的修改暂存到 `commitA`中。

比如我们可以先使用 `git stash`暂存修改，然后就可以直接切换到 `commitB`了，未来回到 `commitA`时又可以使用 `git stash pop`把暂存的修改内容拿出来。

### git object

```bash
# 显示所有object
ls .git/objects/
10/ ea/ 1c/ ... /info /pack

# 查看object类型/值，常见类型：blob(git add 后创建), tree和commit(git commit 后创建)
git cat-file -t 58c9 
git cat-file -p 58c9 # 58c9为想找的object的值
```

## 其他

### .gitkeep

`git`通常无法追踪空文件夹，如果我们追踪空文件夹，可以在该文件夹下新建一个空的 `.gitkeep`文件。





> 当我们新建文件 `akara.txt`，并使用 `git add .`添加进缓存区。此时我们可以：
>
> 1. `git commit -m ''`： 提交记录。
> 2. `git reset HEAD <file>`: 释放缓存。类似的还有 `git rm --cached <file>`用来删除缓存区的内容
>
> 当我们新建文件 `akara.txt`，并使用 `git add .`添加进缓存区，之后修改该文件的内容。此时我们可以：
>
> 1. `git add .`：缓存修改后的内容。
> 2. `git checkout -- <file> `：丢弃修改的内容。本质是用原本缓存区的内容替代工作目录中的文件内容。

