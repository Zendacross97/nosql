const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, // removes extra spaces
    },
    price: {
      type: Number,
      required: true,
      min: 0, // basic validation
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model('Product', productSchema);

// ### 🔎 Why `new mongodb.ObjectId(prodId)` is needed
// - In MongoDB, the default `_id` field is not a plain string.  
// - It’s stored as a special **ObjectId type** (a 12‑byte value that encodes timestamp + machine ID + process ID + counter).  
// - When you insert a document without specifying `_id`, MongoDB automatically generates an `ObjectId`.  

// So if you query with:
// ```js
// { _id: prodId }
// ```
// where `prodId` is just a string like `"69fca81d5c9a5d59eb845972"`, MongoDB won’t match it — because the stored `_id` is of type `ObjectId`, not string.

// Instead, you must convert the string into an `ObjectId` instance:
// ```js
// { _id: new mongodb.ObjectId(prodId) }
// ```
// This ensures the type matches exactly, and the query succeeds.

// ---

// ### ⚡ Example
// Suppose your document looks like:
// ```json
// {
//   "_id": ObjectId("69fca81d5c9a5d59eb845972"),
//   "title": "apple"
// }
// ```

// - Query with string:
//   ```js
//   db.products.find({ _id: "69fca81d5c9a5d59eb845972" })
//   ```
//   → ❌ No match (wrong type).

// - Query with ObjectId:
//   ```js
//   db.products.find({ _id: new ObjectId("69fca81d5c9a5d59eb845972") })
//   ```
//   → ✅ Returns the document.

// ---

// ### 🧠 Rule of thumb
// - If your `_id` is the default MongoDB one → always wrap it with `new ObjectId(...)` when querying.  
// - If you manually set `_id` to a string (e.g., `"abc123"`), then you can query with the plain string.

// ---

// 👉 In my case, since you’re letting MongoDB auto‑generate `_id`, you must use `new mongodb.ObjectId(prodId)` in your `findById`.



// ### 🔎 Why `.next()` is used after `.find()`
// - `db.collection('products').find({...})` returns a **cursor**, not the actual document(s).
// - A cursor is like a pointer to the result set — it can potentially hold multiple documents.
// - If I want just **one document**, you need to advance the cursor to the first result. That’s what `.next()` does: it moves the cursor forward and returns the document at that position.

// So in my original code:
// ```js
// db.collection('products').find({_id: new mongodb.ObjectId(prodId)}).next()
// ```
// - `.find()` → returns a cursor (could hold multiple docs, though here it’s only one because `_id` is unique).
// - `.next()` → retrieves the first document from that cursor.

// ---

// ### ✅ Cleaner alternative
// Instead of `.find(...).next()`, I can use `.findOne(...)`:
// ```js
// db.collection('products').findOne({ _id: new mongodb.ObjectId(prodId) })
// ```
// - This directly returns the single document (or `null` if not found).
// - It’s simpler and more idiomatic when querying by `_id`.

// ---

// ### ⚡ Rule of thumb
// - Use `.find()` when you expect **multiple documents** and want to iterate through them.
// - Use `.findOne()` when you expect **exactly one document** (like with `_id`).

// ---

// 👉 In your case, since `_id` is unique, `.findOne()` is the right choice. That’s why I suggested replacing `.find(...).next()` with `.findOne(...)` earlier — it avoids confusion and makes the intent clear.
