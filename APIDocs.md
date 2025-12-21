# API Documentation

This document provides detailed information about the available API endpoints for the File Upload, List Query, and Tree Menu management system.

## Base URL

`http://localhost:3000`

---

## 1. Tree Menu API

Manage a hierarchical tree structure with persistence.

### 1.1 Get Tree Structure

Fetch the entire tree or a specific sub-tree.

- **URL**: `/tree`
- **Method**: `GET`
- **Query Params**:
  - `id` (optional): The ID of the node to fetch as the root of the sub-tree.
- **Response**: `Array<Node>` or `Node`
- **Success Example (GET /tree)**:

```json
[
  {
    "id": 1,
    "name": "Root Node",
    "parentId": 0,
    "children": [
      {
        "id": 3,
        "name": "Child Level 1",
        "parentId": 1,
        "children": [],
        "isLeaf": true
      }
    ],
    "isLeaf": false
  }
]
```

### 1.2 Add Node

Add a new node to the tree.

- **URL**: `/tree`
- **Method**: `POST`
- **Payload**:

```json
{
  "name": "string (required)",
  "parentId": "number (default: 0)"
}
```

- **Response**: The newly created node object.

### 1.3 Update Node

Modify an existing node's information.

- **URL**: `/tree/:id`
- **Method**: `PUT`
- **Payload**:

```json
{
  "name": "string (required)"
}
```

- **Response**: The updated node object.

### 1.4 Delete Node

Remove a node and all of its descendants recursively.

- **URL**: `/tree/:id`
- **Method**: `DELETE`
- **Response**:

```json
{
  "message": "删除成功",
  "deletedIds": [2, 4, 5]
}
```

---

## 2. List Query API

Query a mock dataset of 100 records with pagination, filtering, and sorting.

- **URL**: `/list`
- **Method**: `GET`
- **Query Params**:
  - `pageNum`: Page number (default: 1)
  - `size`: Items per page (default: 10)
  - `name`: Fuzzy name filter
  - `status`: Exact status filter (`active` | `inactive`)
  - `sortBy`: Field to sort by (default: `id`)
  - `order`: Sort direction (`asc` | `desc`)
- **Response**:

```json
{
  "total": 100,
  "pageNum": 1,
  "pageSize": 10,
  "data": [...]
}
```

---

## 3. File Upload API

Upload single files to the server.

- **URL**: `/upload`
- **Method**: `POST`
- **Payload**: `multipart/form-data`
  - Key: `file`
- **Response**:

```json
{
  "file": {
    "filename": "file-173477123.jpg",
    "url": "/uploads/file-173477123.jpg"
  }
}
```

---

## Error Handling

All endpoints return standard HTTP status codes:

- `200/201`: Success
- `400`: Parameter validation failed
- `404`: Resource not found
- `500`: Internal server error

Error response body:

```json
{
  "error": "Detailed error message"
}
```
