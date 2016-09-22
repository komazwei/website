# Makefile for Agrista website
#

build:
	@npm run build
	@echo
	@echo "Build finished. The static files are in the public directory."

deploy:
	@make build
	@aws s3 sync dist s3://staging-www.agrista.com --region eu-central-1 --acl=public-read --delete --cache-control="max-age=1576800000" --exclude "*.html"
	@aws s3 sync dist s3://staging-www.agrista.com --region eu-central-1 --acl=public-read --delete --cache-control="max-age=0, no-cache" --exclude "*" --include "*.html"
	@echo
	@echo "Sync finished. The static files are online."
