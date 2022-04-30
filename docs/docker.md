---
sidebarDepth: 4
---

# Docker

## 安装

### WSL

`windows`系统下安装Docker需要几个前置条件，首先`windows`版本需要大于`v1903`，并且我们需要启用`Window Subsystem Linux(WSL2)`，可以根据微软的[官方指南](https://docs.microsoft.com/zh-cn/windows/wsl/install-win10)进行环境的安装。

安装好`WSL`后我们可以在终端通过输入`wsl`来切换成对应的Linux发行版。

搭建好基础环境之后我们就可以直接安装`Docker desktop`软件，安装好`Docker`后我们就可以在终端使用`Docker`命令，或者是借助`Docker desktop`桌面应用来直接执行各种操作，本博客重点介绍命令行下的操作。

``` bash
docker version # 验证安装成功
```

> 最好修改一下镜像源来加速镜像的获取



## 基础

使用`Docker`时，我们通常会使用他人的镜像`image`或自己打包的`image`在容器`container`中运行。

### image

> 部分命令可以省略image一词

``` bash
docker image ls # 本地所有镜像
docker image rm <name> # 删除镜像
docker image pull akara/my-image # akara/my-image为组名/镜像名
docker image pull hello-world # 如果不指定组名，则默认拉取library组内的镜像（官方镜像）
```



### container

> 部分命令可以省略container一词

``` bash
docker container ls # 查看正在运行中的容器。或者 docker ps
docker container ls --all # 查看所有的容器，包括没有运行的容器。或者 docker ps -a
```

当我们本地存在镜像`image`，就可以运行在容器中了。通常情况运行完成后，容器会**自动退出运行**状态。

``` bash
docker container run hello-world # 运行容器，如果本地不存在该镜像，则会自动拉取远程镜像
```

我们可以在运行容器的时候加上`-it`标识，实现**通过终端访问容器内部**，在退出终端后容器会**退出运行**。

``` bash
docker container run -it hello-world /bin/bash # 选择/bin/bash作为shell
```

我们可以通过`-d`搭配`-it`使用，`-d`的作用是让容器在后台运行，从而实现类似守护进程的效果。

``` bash
docker run -p 8000:3000 -itd  koa-demo  /bin/bash
```

当容器在后台运行时，我们可以使用`docker attach`或`docker exec`来进入容器，通常推荐使用`docker exec`

``` bash
docker exec -it <containerID> /bin/bash
```

------

很多时候我们的容器内部都跑着HTTP服务器，通常是无法被外部直接访问的，为此我们需要实现主机和容器之间的**端口映射**。

``` bash
docker container run -p 8000:3000 -it hello-world /bin/bash
```

像这里我们使用`-p 8000:3000`实现了端口映射，可以通过本机的8000端口访问目标容器的3000端口。除了`-p`我们还可以使用`-P`来实现随机端口映射。

------

我们也可以手动退出容器。

``` bash
docker container stop <containerID> # 优雅的退出
docker container kill <containerID> # 粗暴的退出

docker container start <containerID> # 启动容器
```

无论是容器自动运行结束，还是我们手动退出容器，容器本身还是占据着硬盘空间，我们可以使用`rm`命令彻底删除容器

``` bash
docker container rm <containerID>
```



## 打包镜像

通过编写`Dockerfile`我们可以实现将本地项目打包成`Docker`镜像`image`，从而提供给他人运行在容器`container`当中。

通常使用`.dockerignore`文件指出哪些文件不要被打包进镜像当中。

``` markdown
.git
node_modules
```



### Dockerfile

``` dockerfile
# Dockerfile
FROM node:8.4 # 新镜像基于node镜像
COPY . /app # 将当前目录文件都复制进镜像的/app文件夹下
WORKDIR /app # 指定工作目录为/app
RUN npm install --registry=https://registry.npm.taobao.org 
EXPOSE 3000 # 容器暴露的端口
CMD node app.js # 容器启动后执行的操作
```

> 如果我们使用`docker run -it xxx /bin/bash`，则`CMD`命令不会执行。使用`docker run -it xxx`的话，会执行`CMD`的命令。

``` bash
docker image build -t <image_name> . # 构建镜像，通过-t指定镜像名
```



