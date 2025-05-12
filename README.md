# 🧩 finder-js

A simple Node.js tool for filtering or counting data via command-line arguments.

## 🚀 Usage  

The main entry point is app.js. It accepts the following command-line arguments:

▶️ Count items
```shell script
node app.js --count
```
Counts of People and Animals by counting the number of children and appending it in the name

🔍 Filter items 
```shell script
node app.js --filter=ry
```
Filtering a list of elements containing a pattern.

## Running Tests
Tests are written using Node.js’s built-in node:test module

Run tests with:
```shell script
node --test
```
Test files are located in the test/ directory.
