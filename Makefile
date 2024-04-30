PKG = $(shell cat package.json | grep 'name' | sed -e 's/  "name": "//g' -e 's/",//g')
VERSION = $(shell cat package.json | grep 'version' | sed -e 's/  "version": "//g' -e 's/",//g')

# 本地测试构建docker镜像建议删掉node_modules，node_modules存在有时会导致报错
docker-build:
	docker build . -t $(PKG):$(VERSION)

# 请先创建自己的 buildx driver 实例，请看：https://juejin.cn/post/7296763284647542838
# 显式指定可执行 docker buildx build --platform linux/amd64,linux/arm64 . -t $(PKG):$(VERSION) --push
docker-buildx-build:
	docker buildx build --platform linux/amd64 . -t $(PKG):$(VERSION) --load

docker-run:
	docker run -d -p 80:80 $(PKG):$(VERSION)

docker-build-run: docker-build docker-run