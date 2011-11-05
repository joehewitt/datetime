default: test

# Pitcairn is handy place where is Pacific Standard Time whole year
test:
	TZ=Pacific/Pitcairn vows test/*-test.js

.PHONY: test
