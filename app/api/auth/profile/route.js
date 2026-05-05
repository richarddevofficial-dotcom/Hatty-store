import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Simple in-memory storage
let orders = [];

export async function POST(request) {
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

    const body = await request.json();
    const { items, totalAmount, cartCount } = body;

    if (!items || !items.length) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const order = {
      id: Date.now().toString(),
      orderNumber: `HATTY-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      userId: decoded.userId,
      userEmail: decoded.email,
      items,
      totalAmount,
      itemCount: cartCount || items.length,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    orders.push(order);
    console.log("Order created:", order.orderNumber);

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
    console.error("Order error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 },
    );
  }
}

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
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "hatty-store-secret-key-2024",
    );

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
