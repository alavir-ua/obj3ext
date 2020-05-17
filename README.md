## obj3ext

A module for writing an array of objects to a file of your choice with xlsx, json, csv extensions.

## Prerequisites
What things you need to install the software.

- NPM.

## Install

```
$ npm install obj3ext
```
Create the "result_data" directory in the root of your project.

## Usage
```
const Writer = require('obj3ext')

const array = [
  {
    name: 'Helga',
    age: 42,
    nationality: 'german'
  },
  {
    name: 'Oleksii',
    age: 27,
    nationality: 'ukrainian'
  },
  {
    name: 'Valto',
    age: 33,
    nationality: 'finn'
  }
]
const file = new Writer(array, file_name)
file.write(file_extension)

```
**Supported Parameters**

| Name            | Type        | Description                      |
| --------------- | ----------- | -------------------------------  |
| array           | array       | Array to write to file           |
| file_name       | string      | The name of the file to write    |
| file_extension  | string      | File extension (xlsx, json, csv) |  


You will receive the resulting file in the "resalt_data" folder.
