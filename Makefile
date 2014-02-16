BIN = ./node_modules/.bin
default: test

test: 
	$(BIN)/vows test/*-test.js

.PHONY: test
