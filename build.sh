npm run build
rm -rf ../concessionaria_api/resources/views/app/
mkdir -p ../concessionaria_api/resources/views/app/
cp dist/index.html ../concessionaria_api/resources/views/app/index.blade.php
rm -rf ../concessionaria_api/public/static
cp -r dist/static ../concessionaria_api/public/