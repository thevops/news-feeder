# news-feeder
Check changes on websites and send notification

Skrypty nie są długie warto je przejrzeć i zrozumieć :)


## Schemat działania

webshot.js - zapisuje zrzut ekranu strony internetowej. Zmodyfikowana wersja https://github.com/yaph/webshots

Skrypt *feeder.sh* uruchamia *webshot.js* dla każdego adresu z pliku źródłego (np. links.txt). Jeżeli aktualny zrzut ekranu różni się od poprzedniego, skrypt wysyła powiadomienie (do dostosowania indywidualnie).


## Wymagania

- Linux :)
- phantomjs
- jpeg-compare


## INSTALACJA

### phantomjs

```
cd /tmp
export PHANTOM_JS="phantomjs-2.1.1-linux-x86_64"
wget https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-2.1.1-linux-x86_64.tar.bz2 # http://phantomjs.org/download.html
tar xvjf $PHANTOM_JS.tar.bz2
mv $PHANTOM_JS /usr/local/share
ln -sf /usr/local/share/$PHANTOM_JS/bin/phantomjs /usr/local/bin
phantomjs --version
```


### jpeg-compare

https://github.com/danielgtaylor/jpeg-archive

## Format pliku links.txt

Przykład

```
link01 https://wordpress.org/news/
link02 https://www.wordfence.com/blog/category/wordpress-security/
link03 https://wordpress.org/news/category/security/
link04 https://blog.wpscans.com/
link05 https://developer.joomla.org/security-centre.html
```

Przed pierwszym uruchomienie należy stworzyć puste obrazki dla każdego linku:

```
cat links.txt | awk '{print $1}' | xargs -i convert -size 32x32 xc:white {}.old.jpg
```