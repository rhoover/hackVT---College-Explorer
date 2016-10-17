#!/bin/bash

#compile critical sccss into css
npm run sass-compile-critical
#remove style element from head
sed -i '/<style id=\"critical\">/d' app/index.html
#grab critical-css info
CSS=$(cat app/css/critical.css)
#append said info, with spaces, into pre-approved slot
sed -i "/<\!-- critical CSS -->/ a \ \ \ \ <style id=\"critical\">$CSS</style>" app/index.html
#remove unnecessary file
rm app/css/critical.css
