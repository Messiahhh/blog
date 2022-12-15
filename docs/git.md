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

## 远程操作

``` shell
git remote # 查看远程仓库的信息
git remote add origin <url> # 添加仓库地址映射
git remote remove origin # 删除地址映射

git clone <url> # 拉取远程仓库到本地
```

大多数情况下，我们的本地仓库只需要和一个远程仓库进行关联，通常会使用`origin`来标识这个远程仓库，`origin`是个很特殊的标识，很多命令当没有指定`remote`时，会把`origin`作为`remote`。

少数情况下本地仓库会和多个远程仓库进行关联，比如当我们`fork`并`clone`了一个开源库时，通常会把原本的仓库作为`upstream`，`fork`生成的自己的远程仓库作为`origin`来进行区分。







### git fetch 

``` shell
git fetch # 获取所有分支
```



### git pull

``` shell
git pull origin main # 获取所有分支并进行当前分支的合并（合并有三种策略，merge（默认），rebase，只允许fast-forward的merge）
```



### git push

``` shell
git push origin main # 推送分支  
git push origin test --delete # 删除远程分支
```





## 版本回退

通常我们使用 `git reset --hard <commitID>`来实现对版本的控制

``` shell
git reset --hard HEAD^ # 回退到上一个commit
git reset head^ # 回退到上一个commit，区别时之前commit修改的内容并不会消失，而是保存在工作目录中
git revert HEAD # 回退当前commit

git reset --hard Head^ # 回退到上个commit
git reset --hard Head^^ # 回退到上上个commit
git reset --hard <commitID> # 前进到某个具体commit
```





## git rebase -i

``` shell
git rebase -i origin/main # 可以用来squash commit、删除commit以及其他的操作
```





很多时候我们会提交很多次 `commit`，显得十分的杂乱，这时候可以使用 `git rebase -i`来合并 `commit`记录，实现美化的效果。

比如，我们现在分别有 `A -> B -> C -> D -> E`这五个 `commit`记录，我们希望把 `C、D、E`合并成一个记录：

```bash
git rebase -i <commit_B>
```

然后会出现可编辑的页面

```bash
pick <commit_C> 我是commitC的message
pick <commit_D> 我是commitD的message
pick <commit_E> 我是commitE的message
```

我们可以把 `commit_D`和 `commit_E`的 `pick`改成 `squash`，再保存就会把这三个 `commit`合并成一个新的 `commit`，并在下一步可以手动更改新的 `commit`的 `message`。



## git cherry-pick

``` shell
git cherry-pick <commit> # cherry-pick 某个提交的代码
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

