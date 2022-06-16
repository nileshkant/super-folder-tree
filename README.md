# Add, remove and update elements in a array tree with multiple root node tree using JavaScript

It's not so easy to work with complex tree structures in JavaScript, but it is possible when working with JSON. If you want to avoid dependencies, you should always use plain JavaScript.

I have create a simple approach to work with JSON and create a tree in JavaScript.

In this approach, I have created a tree with multiple root node and try to add, update and remove elements from it.

```json
[
  {
    "id": "0",
    "name": "root",
    "type": "folder",
    "files": [
      {
        "id": "0-0",
        "name": "child1",
        "type": "folder",
        "files": [
          {
            "id": "0-0-0",
            "name": "child1-1",
            "type": "file"
          },
          {
            "id": "0-0-1",
            "name": "child1-2",
            "type": "folder",
            "files": []
          }
        ]
      }
    ]
  },
  {
    "id": "1",
    "name": "root1",
    "type": "folder",
    "files": [
      {
        "id": "1-0",
        "name": "child1",
        "type": "folder",
        "files": [
          {
            "id": "1-0-0",
            "name": "child1-1",
            "type": "file"
          }
        ]
      }
    ]
  }
]
```

Fork to contribute to this project
