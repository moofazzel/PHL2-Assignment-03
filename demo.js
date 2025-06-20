const axios = require("axios");

const BASE_URL = "http://localhost:3000/api";

// Demo function to showcase the API
async function runDemo() {
  console.log("🚀 Library Management API Demo\n");

  try {
    // 1. Create a book
    console.log("1. Creating a book...");
    const bookData = {
      title: "The Theory of Everything",
      author: "Stephen Hawking",
      genre: "SCIENCE",
      isbn: "9780553380163",
      description: "An overview of cosmology and black holes.",
      copies: 5,
      available: true,
    };

    const createResponse = await axios.post(`${BASE_URL}/books`, bookData);
    const bookId = createResponse.data.data._id;
    console.log("✅ Book created:", createResponse.data.message);
    console.log("   Book ID:", bookId);

    // 2. Get all books
    console.log("\n2. Getting all books...");
    const getAllResponse = await axios.get(`${BASE_URL}/books`);
    console.log("✅ Books retrieved:", getAllResponse.data.message);
    console.log("   Total books:", getAllResponse.data.data.length);

    // 3. Get books with filtering
    console.log("\n3. Getting books with filtering (SCIENCE genre)...");
    const filterResponse = await axios.get(
      `${BASE_URL}/books?filter=SCIENCE&sortBy=createdAt&sort=desc&limit=5`
    );
    console.log("✅ Filtered books retrieved:", filterResponse.data.message);
    console.log("   Science books found:", filterResponse.data.data.length);

    // 4. Get book by ID
    console.log("\n4. Getting book by ID...");
    const getByIdResponse = await axios.get(`${BASE_URL}/books/${bookId}`);
    console.log("✅ Book retrieved:", getByIdResponse.data.message);
    console.log("   Book title:", getByIdResponse.data.data.title);

    // 5. Update book
    console.log("\n5. Updating book copies...");
    const updateResponse = await axios.put(`${BASE_URL}/books/${bookId}`, {
      copies: 10,
    });
    console.log("✅ Book updated:", updateResponse.data.message);
    console.log("   New copies:", updateResponse.data.data.copies);

    // 6. Borrow a book
    console.log("\n6. Borrowing a book...");
    const borrowData = {
      book: bookId,
      quantity: 2,
      dueDate: "2025-07-18T00:00:00.000Z",
    };
    const borrowResponse = await axios.post(`${BASE_URL}/borrow`, borrowData);
    console.log("✅ Book borrowed:", borrowResponse.data.message);
    console.log("   Quantity borrowed:", borrowResponse.data.data.quantity);

    // 7. Get borrowed books summary
    console.log("\n7. Getting borrowed books summary...");
    const summaryResponse = await axios.get(`${BASE_URL}/borrow`);
    console.log(
      "✅ Borrowed books summary retrieved:",
      summaryResponse.data.message
    );
    console.log(
      "   Summary data:",
      JSON.stringify(summaryResponse.data.data, null, 2)
    );

    // 8. Try to borrow more than available (should fail)
    console.log("\n8. Trying to borrow more than available copies...");
    try {
      const invalidBorrowData = {
        book: bookId,
        quantity: 10, // More than available
        dueDate: "2025-07-18T00:00:00.000Z",
      };
      await axios.post(`${BASE_URL}/borrow`, invalidBorrowData);
    } catch (error) {
      console.log("✅ Expected error caught:", error.response.data.message);
    }

    // 9. Delete the book
    console.log("\n9. Deleting the book...");
    const deleteResponse = await axios.delete(`${BASE_URL}/books/${bookId}`);
    console.log("✅ Book deleted:", deleteResponse.data.message);

    console.log("\n🎉 Demo completed successfully!");
  } catch (error) {
    console.error("❌ Demo failed:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
    }
  }
}

// Check if server is running
async function checkServer() {
  try {
    await axios.get("http://localhost:3000/health");
    console.log("✅ Server is running!");
    return true;
  } catch (error) {
    console.log("❌ Server is not running. Please start the server first:");
    console.log("   npm run dev");
    return false;
  }
}

// Run the demo
async function main() {
  const serverRunning = await checkServer();
  if (serverRunning) {
    await runDemo();
  }
}

main();
