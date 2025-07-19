import frappe
from frappe.model.document import Document

class CustomerOrder(Document):
    def validate(self):
        if not self.items:
            frappe.throw("You must add at least one item.")
        for row in self.items:
            if row.qty <= 0:
                frappe.throw(f"Invalid quantity for item {row.product}")

@frappe.whitelist()
def get_customer_orders(customer):
    customer_doc = frappe.get_doc("Customer", customer)
    customer_email = frappe.db.get_value("Customer", customer, "email")

    orders = frappe.get_all(
        "Customer Order",
        filters={"customer": customer},
        fields=["name", "order_date"]
    )

    return {
        "orders": orders,
        "customer_name": customer_doc.full_name,
        "customer_email": customer_email
    }
