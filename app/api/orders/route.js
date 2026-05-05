import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Temporary in-memory storage (works without MongoDB)
let orders = [];

export async function POST(request) {
  try {
    // Get token from header
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authentication required. Please sign in." },
        { status: 401 },
      );
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "hatty-store-secret-key-2024",
      );
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid or expired token. Please sign in again." },
        { status: 401 },
      );
    }

    // Parse request body
    const body = await request.json();
    const { items, totalAmount, cartCount } = body;

    // Validate inputs
    if (!items || !items.length) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    if (!totalAmount) {
      return NextResponse.json(
        { error: "Total amount is required" },
        { status: 400 },
      );
    }

    // Create order
    const order = {
      id: Date.now().toString(),
      orderNumber: `HATTY-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      userId: decoded.userId,
      userEmail: decoded.email,
      items: items,
      totalAmount: totalAmount,
      itemCount: cartCount || items.length,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    // Save to in-memory storage
    orders.push(order);

    console.log("✅ Order created:", order.orderNumber);

    // Return success response
    return NextResponse.json(
      {
        message: "Order created successfully",
        order: {
          orderNumber: order.orderNumber,
          status: order.status,
          totalAmount: order.totalAmount,
          itemCount: order.itemCount,
          createdAt: order.createdAt,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("❌ Order creation error:", error);

    return NextResponse.json(
      { error: "Failed to create order. Please try again." },
      { status: 500 },
    );
  }
}

// Get user's orders
export async function GET(request) {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "hatty-store-secret-key-2024",
      );
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 },
      );
    }

    // Get user's orders
    const userOrders = orders.filter(
      (order) => order.userId === decoded.userId,
    );

    return NextResponse.json({ orders: userOrders.reverse() }, { status: 200 });
  } catch (error) {
    console.error("Fetch orders error:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 },
    );
  }
}
