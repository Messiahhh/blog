---
sidebarDepth: 4
---
## Git

### 常用命令

``` shell
git init # 初始化git仓库
git add # 将改动添加到索引区域
git commit # 提交commit
git push # 推送给远程仓库
git pull # 拉远程仓库代码并合并(fetch + merge)
git clone # 拉仓库
git branch # 显示所有分支
git branch <name> # 创建分支
git checkout <file> # 切换分支
git checkout -b <file> # 创建分支并切换过去
git checkout -d <file> # 删除分支
git merge # 分支合并
git rebase # 分支合并
git log # 查看 commit 记录
git reflog # 查看历史命令
git status # 查看当前状态
git stash # 缓存当前的本地修改
git stash list # 查看缓存的本地修改
git stash pop # 取出缓存的本地修改
git checkout -- <file> # 用来丢弃工作目录中的修改
git reset HEAD <file> # 当我们不小心git add了文件，可以用该命令撤回
git reset --hard HEAD^ # 撤销一个commit，HEAD^^为撤销两个

git rm --cached <file> # 若我们git add 一个文件，通过该命令可以取消该文件的追踪
```

### 分支合并

> [参考](https://backlog.com/git-tutorial/cn/stepup/stepup1_4.html)

##### git merge

如图一，当我们处于`master`分支使用`git merge test`时，这种合并称之为`fast-forward`（快进）

![fast-forward](https://backlog.com/git-tutorial/cn/img/post/stepup/capture_stepup1_4_1.png)



它的结果如图二所示：

![fast-forward合并](https://backlog.com/git-tutorial/cn/img/post/stepup/capture_stepup1_4_2.png)



不过图三这种才是大部分情况可能的场景，我们通常从某个分支中新建一个`test`分支，而之后`master`分支可能已经被其他人更新过了。

![分支合并](https://backlog.com/git-tutorial/cn/img/post/stepup/capture_stepup1_4_3.png)



此时当我们在`master`分支使用`git merge test`，会产生一个新的分支。

![分支合并结果](https://backlog.com/git-tutorial/cn/img/post/stepup/capture_stepup1_4_4.png)



##### git rebase

使用`git merge`的好处是保持了原先的`commit`记录，但是历史记录会很复杂；而`git rebase`的好处是历史记录简单，但是会修改原先的`commit`记录。

![git-rebase](https://backlog.com/git-tutorial/cn/img/post/stepup/capture_stepup1_4_6.png)

我们处于`master`分支时使用`git rebase test`来合并分支，结果如图二：

![git-rebase结果](https://backlog.com/git-tutorial/cn/img/post/stepup/capture_stepup1_4_7.png)





### 版本回退和前进

通常我们使用`git reset --hard <commitID>`来实现对版本的控制

##### 版本回退

``` bash
git reset --hard Head^ # 回退到上个commit
git reset --hard Head^^ # 回退到上上个commit
git reset --hard <commitID> # 回退到某个具体commit
```



##### 版本前进

有的时候当我们回退了版本之后，又希望恢复到之前的版本，这时候我们就需要知道原先的`commitID`，比如我们可以使用`git reflog`来查看历史命令，以及当时所处在的`commitID`

``` bash
git reset --hard <commitID> # 前进到某个具体commit
```





### 合并Commit

很多时候我们会提交很多次`commit`，显得十分的杂乱，这时候可以使用`git rebase -i`来合并`commit`记录，实现美化的效果。

比如，我们现在分别有`A -> B -> C -> D -> E`这五个`commit`记录，我们希望把`C、D、E`合并成一个记录：

``` bash
git rebase -i <commit_B>
```

然后会出现可编辑的页面

``` bash
pick <commit_C> 我是commitC的message
pick <commit_D> 我是commitD的message
pick <commit_E> 我是commitE的message
```

我们可以把`commit_D`和`commit_E`的`pick`改成`squash`，再保存就会把这三个`commit`合并成一个新的`commit`，并在下一步可以手动更改新的`commit`的`message`。



### git原理

> [参考](https://zhuanlan.zhihu.com/p/96631135)

`commit`节点通过`tree`节点记录着某个时刻对应的文件信息，这些对应的文件保存在索引区域中（严格来说，这些文件被当作`object`节点存于`git`仓库中，索引指向着这些文件），当我们切换到某个`commit`时，会根据索引把对应的文件同步到工作目录中。

通常当我们修改工作目录中的文件后，通过`git add`把更新同步到索引中（即在`git`仓库中创建一个新的`object`结点，并更新索引的指向），然后使用`git commit`来生成一个新的`commit`节点（即先根据索引的指向生成一个`tree`节点，再生成`commit`节点），新的`commit`节点记录着新的文件信息。



假设`commitA`和`commitB`都记录着文件`test`，那么当我们处于`commitA`时并修改工作目录的文件后，或者已经同步到索引区域，只要还没有提交记录的话，这时候如果我们切换到`commitB`，那我们的本地修改会同步到`commitB`当中。

不过，如果我们在`commitA`记录着文件`a`，而`commitB`中不存在文件`a`，然后我们处于`commitA`时修改文件`a`，这时候直接切换到`commitB`就会失败，并且会提醒我们应该先提交我们的修改，或者可以使用`git stash`来把我们的修改暂存到`commitA`中。

比如我们可以先使用`git stash`暂存修改，然后就可以直接切换到`commitB`了，未来回到`commitA`时又可以使用`git stash pop`把暂存的修改内容拿出来。

##### git object

``` bash
# 显示所有object
ls .git/objects/
10/ ea/ 1c/ ... /info /pack

# 查看object类型/值，常见类型：blob(git add 后创建), tree和commit(git commit 后创建)
git cat-file -t 58c9 
git cat-file -p 58c9 # 58c9为想找的object的值
```

