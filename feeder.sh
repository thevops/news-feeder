#!/bin/bash

# requirements: phantomjs, imagemagick, script webshot.js, jpeg-compare


# jpeg-compare from
# https://github.com/danielgtaylor/jpeg-archive

# before first use execute command:
# cat links.txt | awk '{print $1}' | xargs -i convert -size 32x32 xc:white {}.old.jpg

news_file="news.log"
links_file="links.txt"

# clear news_file
true > "$news_file"


function check-news() {
	link=$1
	name=$2

	phantomjs webshot.js "$link" 1366 768 "$name".new.jpg

	cmp_val=`jpeg-compare "$name".new.jpg "$name".old.jpg`

	if [[ "$cmp_val" -gt 5 ]]
	then
		echo "$link $cmp_val" >> "$news_file"
	fi

	mv "$name".new.jpg "$name".old.jpg
}



# -------------------         [ MAIN ]         ------------------- #

while IFS= read -r line || [[ -n "$line" ]]
do
    name=`echo "$line" | cut -d' ' -f1`
    link=`echo "$line" | cut -d' ' -f2`
    check-news "$link" "$name"
done < "$links_file"


# notification


if [[ `cat "$news_file" | wc -l` -gt 0 ]]
then
	sed -i '1 i\```' "$news_file"
	echo "\`\`\`" >> "$news_file"
	#send content of $news_file
fi

